import { useEffect, useMemo, useState } from 'react';
import { BUILT_IN_RULES } from './engine/builtinRules.ts';
import { deriveFacts, FACT_BY_KEY } from './engine/facts.ts';
import { buildMemo } from './engine/memo.ts';
import { breakEvenEscalation, breakEvenStrike, runModel } from './engine/model.ts';
import { fingerprint, openFindings, reviewStatus, reviewedInputs, type ReviewStatus } from './engine/review.ts';
import { activeRules, effectiveRules, newRuleId, runPreflight, SEVERITY_RANK } from './engine/rules.ts';
import { EXAMPLE_SCENARIO, BENCHMARK_SCENARIO } from './engine/scenarios.ts';
import { buildSecondLookPrompt, type Suggestion } from './engine/secondLook.ts';
import { sensitivity } from './engine/sensitivity.ts';
import type { Category, Decision, Inputs, PlaybookState, ReviewState, Rule, Severity } from './engine/types.ts';
import { load, save } from './storage.ts';
import { AnnualTable } from './components/AnnualTable.tsx';
import { AssumptionsForm } from './components/AssumptionsForm.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { Playbook } from './components/Playbook.tsx';
import { Preflight } from './components/Preflight.tsx';
import { ResultCard } from './components/ResultCard.tsx';
import { RuleEditor } from './components/RuleEditor.tsx';
import { SecondLook } from './components/SecondLook.tsx';
import { SettlementChart } from './components/SettlementChart.tsx';
import { SignOff } from './components/SignOff.tsx';
import { Tornado } from './components/Tornado.tsx';

type View = 'analysis' | 'playbook' | 'how';
const VIEWS: { id: View; label: string }[] = [
  { id: 'analysis', label: 'Analysis' },
  { id: 'playbook', label: 'Playbook' },
  { id: 'how', label: 'How it works' },
];

const EMPTY_PLAYBOOK: PlaybookState = { custom: [], edits: {}, disabled: [] };
const EMPTY_REVIEW: ReviewState = { decisions: {} };

function loadInputs(): Inputs {
  const saved = load<Partial<Inputs>>('inputs', {});
  return { ...EXAMPLE_SCENARIO, ...saved, diligence: { ...EXAMPLE_SCENARIO.diligence, ...saved.diligence } };
}

function viewFromHash(): View {
  const h = typeof location === 'undefined' ? '' : location.hash.slice(1);
  return VIEWS.some((v) => v.id === h) ? (h as View) : 'analysis';
}

const STATUS_TEXT: Record<ReviewStatus, (open: number) => string> = {
  'needs-review': (open) => `Draft · ${open} open`,
  ready: () => 'Ready to sign',
  signed: () => '✓ Signed off',
  stale: () => 'Changed since sign-off',
};

function categoryFor(fact: string): Category {
  if (/^(strike|term|transaction|settlement|basis|negativePrice)/.test(fact)) return 'Contract terms';
  if (/^(capacity|degradation|coverage|year1Generation)/.test(fact)) return 'Project output';
  if (/^(hub|wholesale|capture|market|technology|finalYear|escalationMinus|year1S)/.test(fact)) return 'Market prices';
  if (/^(rec|discount|annualLoad)/.test(fact)) return 'Finance & RECs';
  if (/Reviewed$|Confirmed$|Considered$/.test(fact)) return 'Claims & accounting';
  return 'Result robustness';
}

function blankRule(id: string, by: string): Rule {
  return {
    id,
    title: '',
    category: 'Market prices',
    severity: 'warning',
    when: [{ fact: 'strikeEscalation', op: '>', value: 0.02 }],
    message: '',
    why: '',
    ask: '',
    source: 'Reviewer judgment',
    origin: 'team',
    addedBy: by,
  };
}

export default function App() {
  const [inputs, setInputs] = useState<Inputs>(loadInputs);
  const [playbook, setPlaybook] = useState<PlaybookState>(() => ({ ...EMPTY_PLAYBOOK, ...load('playbook', EMPTY_PLAYBOOK) }));
  const [review, setReview] = useState<ReviewState>(() => load('review', EMPTY_REVIEW));
  const [reviewer, setReviewer] = useState<string>(() => load('reviewer', ''));
  const [view, setView] = useState<View>(viewFromHash);
  const [editor, setEditor] = useState<{ rule: Rule; isNew: boolean } | null>(null);

  useEffect(() => save('inputs', inputs), [inputs]);
  useEffect(() => save('playbook', playbook), [playbook]);
  useEffect(() => save('review', review), [review]);
  useEffect(() => save('reviewer', reviewer), [reviewer]);

  useEffect(() => {
    const onHash = () => setView(viewFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (v: View) => {
    setView(v);
    try {
      history.replaceState(null, '', `#${v}`);
    } catch {
      // Some hosts don't allow history changes; the view still switches.
    }
    window.scrollTo({ top: 0 });
  };

  const rules = useMemo(() => activeRules(playbook), [playbook]);
  const submitted = useMemo(() => runModel(inputs), [inputs]);
  const facts = useMemo(() => deriveFacts(inputs, submitted), [inputs, submitted]);
  const findings = useMemo(() => runPreflight(inputs, rules, submitted), [inputs, rules, submitted]);
  const revInputs = useMemo(() => reviewedInputs(inputs, findings, review), [inputs, findings, review]);
  const reviewed = useMemo(() => runModel(revInputs), [revInputs]);
  const status = reviewStatus(inputs, findings, review);
  const openCount = openFindings(findings, review).length;
  const swings = useMemo(() => sensitivity(revInputs), [revInputs]);
  const breakEven = useMemo(
    () => ({
      submittedEsc: facts.breakEvenEscalation as number,
      reviewedEsc: breakEvenEscalation(revInputs),
      submittedStrike: facts.breakEvenStrike as number,
      reviewedStrike: breakEvenStrike(revInputs),
    }),
    [facts, revInputs],
  );

  const memo = buildMemo({
    inputs,
    submitted,
    reviewed,
    findings,
    review,
    status,
    breakEvenEscalation: breakEven.submittedEsc,
    reviewer,
  });
  const secondLookPrompt = useMemo(() => buildSecondLookPrompt(facts, submitted, findings, rules), [facts, submitted, findings, rules]);

  // Highest severity per input, so the form can mark flagged fields.
  const flags = useMemo(() => {
    const out: Partial<Record<string, Severity>> = {};
    for (const f of findings) {
      const keys = new Set(f.rule.when.map((c) => c.fact).filter((k) => FACT_BY_KEY[k]?.kind === 'input' && FACT_BY_KEY[k]?.format !== 'text'));
      if (f.rule.benchmark) keys.add(f.rule.benchmark.input);
      for (const k of keys) {
        const cur = out[k];
        if (!cur || SEVERITY_RANK[f.rule.severity] < SEVERITY_RANK[cur]) out[k] = f.rule.severity;
      }
    }
    return out;
  }, [findings]);

  const decide = (ruleId: string, decision: Decision) =>
    setReview((r) => ({ ...r, decisions: { ...r.decisions, [ruleId]: decision } }));

  const loadExample = (which: 'example' | 'benchmark') => {
    setInputs(which === 'example' ? EXAMPLE_SCENARIO : BENCHMARK_SCENARIO);
    setReview(EMPTY_REVIEW);
  };

  const saveRule = (rule: Rule) => {
    setPlaybook((p) => {
      if (rule.origin === 'built-in') return { ...p, edits: { ...p.edits, [rule.id]: rule } };
      const exists = p.custom.some((r) => r.id === rule.id);
      return { ...p, custom: exists ? p.custom.map((r) => (r.id === rule.id ? rule : r)) : [...p.custom, rule] };
    });
    setEditor(null);
  };

  const importRules = (list: unknown[]): string => {
    const valid = list.filter(
      (r): r is Rule =>
        !!r && typeof r === 'object' && typeof (r as Rule).id === 'string' && typeof (r as Rule).title === 'string' && Array.isArray((r as Rule).when),
    );
    if (!valid.length) return 'No checks found in that file.';
    const builtInIds = new Set(BUILT_IN_RULES.map((r) => r.id));
    const incoming = valid.filter((r) => !builtInIds.has(r.id)).map((r) => ({ ...r, origin: 'team' as const }));
    setPlaybook((p) => {
      const byId = new Map(p.custom.map((r) => [r.id, r]));
      for (const r of incoming) byId.set(r.id, r);
      return { ...p, custom: [...byId.values()] };
    });
    return `Imported ${incoming.length} ${incoming.length === 1 ? 'check' : 'checks'}.`;
  };

  const startNewRule = (seed?: Suggestion) => {
    const all = effectiveRules(playbook);
    const base = blankRule(newRuleId(all), reviewer);
    const rule: Rule = seed
      ? {
          ...base,
          title: seed.title,
          severity: seed.severity,
          category: seed.when[0] ? categoryFor(seed.when[0].fact) : 'Result robustness',
          when: seed.when.length ? seed.when : base.when,
          message: seed.title + '.',
          why: seed.why,
          ask: seed.ask,
          benchmark: seed.benchmark,
          source: 'Suggested by Claude; verified by reviewer',
        }
      : base;
    setEditor({ rule: { ...rule, addedOn: new Date().toISOString().slice(0, 10) }, isNew: true });
    go('playbook');
  };

  const editorNode = editor ? (
    <RuleEditor
      key={editor.rule.id}
      initial={editor.rule}
      isNew={editor.isNew}
      facts={facts}
      onSave={saveRule}
      onCancel={() => setEditor(null)}
    />
  ) : null;

  const reviewedDiffers = Math.abs(reviewed.npvAdvantage - submitted.npvAdvantage) >= 1;

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner gutter">
          <div className="brand">
            <span className="brand-mark">PPA Preflight</span>
            <span className="brand-tag">VPPA vs. REC analysis with an assumption check</span>
          </div>
          <nav className="tabs" role="tablist" aria-label="Views">
            {VIEWS.map((v) => (
              <button key={v.id} type="button" role="tab" className="tab" aria-selected={view === v.id} onClick={() => go(v.id)}>
                {v.label}
                {v.id === 'playbook' ? ` (${rules.length})` : ''}
              </button>
            ))}
          </nav>
          <span className="status-pill" data-status={status} title="Review status of the current analysis">
            {STATUS_TEXT[status](openCount)}
          </span>
        </div>
      </header>

      <main className="page gutter">
        {view === 'analysis' ? (
          <>
            <ol className="loop" aria-label="How a result gets signed" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li className="loop-step">
                <span className="loop-num">1</span>
                <span className="loop-title">
                  Model<span className="who">software</span>
                </span>
                <span className="loop-text">Runs on the assumptions as submitted.</span>
              </li>
              <li className="loop-step">
                <span className="loop-num">2</span>
                <span className="loop-title">
                  Preflight<span className="who">software</span>
                </span>
                <span className="loop-text">{rules.length} checks test every assumption and price each problem.</span>
              </li>
              <li className="loop-step" data-who="person">
                <span className="loop-num">3</span>
                <span className="loop-title">
                  Decide & sign<span className="who">reviewer</span>
                </span>
                <span className="loop-text">A named person rules on each flag and owns the result.</span>
              </li>
              <li className="loop-step" data-who="person">
                <span className="loop-num">4</span>
                <span className="loop-title">
                  Teach<span className="who">reviewer</span>
                </span>
                <span className="loop-text">Anything the checks missed becomes a new check.</span>
              </li>
            </ol>

            <div className="desk">
              <AssumptionsForm inputs={inputs} onChange={setInputs} flags={flags} onLoadExample={loadExample} />
              <div className="col">
                <Preflight inputs={inputs} findings={findings} review={review} checksRun={rules.length} onDecide={decide} />
                <ResultCard
                  inputs={inputs}
                  submitted={submitted}
                  reviewed={reviewed}
                  status={status}
                  openCount={openCount}
                  review={review}
                  breakEven={breakEven}
                />
                <section className="panel" aria-label="Charts">
                  <div className="panel-body">
                    <div className="chart-grid">
                      <SettlementChart submitted={submitted} reviewed={reviewed} showReviewed={reviewedDiffers} />
                      <Tornado swings={swings} />
                    </div>
                    <AnnualTable submitted={submitted} reviewed={reviewed} />
                  </div>
                </section>
                <SecondLook prompt={secondLookPrompt} onPromote={startNewRule} />
                <SignOff
                  status={status}
                  openCount={openCount}
                  review={review}
                  reviewer={reviewer}
                  onReviewer={setReviewer}
                  memo={memo}
                  onSign={() =>
                    setReview((r) => ({
                      ...r,
                      signOff: { by: reviewer.trim(), at: new Date().toISOString(), fingerprint: fingerprint(inputs, findings, r) },
                    }))
                  }
                  onUnsign={() => setReview((r) => ({ decisions: r.decisions }))}
                />
              </div>
            </div>
          </>
        ) : view === 'playbook' ? (
          <Playbook
            playbook={playbook}
            facts={facts}
            editor={editorNode}
            onAdd={() => startNewRule()}
            onEdit={(rule) => setEditor({ rule, isNew: false })}
            onToggle={(id) =>
              setPlaybook((p) => ({ ...p, disabled: p.disabled.includes(id) ? p.disabled.filter((d) => d !== id) : [...p.disabled, id] }))
            }
            onDelete={(id) => setPlaybook((p) => ({ ...p, custom: p.custom.filter((r) => r.id !== id), disabled: p.disabled.filter((d) => d !== id) }))}
            onReset={(id) =>
              setPlaybook((p) => {
                const edits = { ...p.edits };
                delete edits[id];
                return { ...p, edits };
              })
            }
            onImport={importRules}
          />
        ) : (
          <HowItWorks checkCount={rules.length} />
        )}
      </main>
    </>
  );
}
