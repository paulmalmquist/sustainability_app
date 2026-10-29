import { useRef, useState, type ReactNode } from 'react';
import { BUILT_IN_RULES } from '../engine/builtinRules.ts';
import { describeCondition } from '../engine/format.ts';
import { effectiveRules, ruleFires } from '../engine/rules.ts';
import { renderSkill } from '../engine/skill.ts';
import { CATEGORIES, type Facts, type PlaybookState, type Rule } from '../engine/types.ts';
import { ExportButtons, SeverityChip } from './ui.tsx';

interface Props {
  playbook: PlaybookState;
  facts: Facts;
  onEdit: (rule: Rule) => void;
  onAdd: () => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onReset: (id: string) => void;
  onImport: (rules: Rule[]) => string;
  editor: ReactNode;
}

export function Playbook({ playbook, facts, onEdit, onAdd, onToggle, onDelete, onReset, onImport, editor }: Props) {
  const rules = effectiveRules(playbook);
  const disabled = new Set(playbook.disabled);
  const team = rules.filter((r) => r.origin === 'team');
  const edited = Object.keys(playbook.edits).length;
  const firing = rules.filter((r) => !disabled.has(r.id) && ruleFires(r, facts)).length;
  const fileRef = useRef<HTMLInputElement>(null);
  const [importNote, setImportNote] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);
  const enabledRules = rules.filter((r) => !disabled.has(r.id));
  const skill = () => renderSkill(enabledRules, { generatedOn: today });
  const json = () => JSON.stringify({ app: 'ppa-preflight', version: 1, exportedOn: today, rules: team }, null, 2);

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        const list = Array.isArray(data) ? data : data.rules;
        if (!Array.isArray(list)) throw new Error('no rules');
        setImportNote(onImport(list));
      } catch {
        setImportNote('That file isn’t a PPA Preflight playbook export.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="col">
      <section className="panel" aria-labelledby="playbook-title">
        <div className="panel-head">
          <h2 id="playbook-title">Playbook</h2>
          <span className="sub">every check runs on every analysis, before the result is shown</span>
        </div>
        <div className="panel-body">
          <div className="playbook-stats">
            <div className="stat">
              <span className="stat-value">{rules.length - disabled.size}</span>
              <span className="stat-label">active checks</span>
            </div>
            <div className="stat">
              <span className="stat-value">{team.length}</span>
              <span className="stat-label">added by reviewers</span>
            </div>
            <div className="stat">
              <span className="stat-value">{edited}</span>
              <span className="stat-label">built-ins recalibrated</span>
            </div>
            <div className="stat">
              <span className="stat-value">{firing}</span>
              <span className="stat-label">firing on this scenario</span>
            </div>
          </div>
          <p className="lede">
            When a review catches something no check covers, add it here. From then on it runs automatically, on every
            scenario, for everyone you share the playbook with. Export it as a Claude skill and Claude applies the same
            checks, before it presents an analysis.
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={onAdd}>
              Add a check
            </button>
          </div>
          <div className="grid-2">
            <div className="field">
              <span className="field-label">Claude skill (SKILL.md)</span>
              <ExportButtons text={skill} filename="SKILL.md" copyLabel="Copy skill" />
              <span className="field-help">Put it in a folder named vppa-rec-assumption-review and add it to Claude as a skill.</span>
            </div>
            <div className="field">
              <span className="field-label">Share with colleagues</span>
              <ExportButtons text={json} filename="ppa-preflight-checks.json" copyLabel="Copy JSON">
                <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
                  Import JSON
                </button>
              </ExportButtons>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) readFile(f);
                  e.target.value = '';
                }}
              />
              <span className="field-help">{importNote || 'Exports the checks your team added. Import merges by ID.'}</span>
            </div>
          </div>
        </div>
      </section>

      {editor}

      <section className="panel" aria-label="All checks">
        <div className="panel-body" style={{ paddingTop: 0 }}>
          {CATEGORIES.map((cat) => {
            const list = rules.filter((r) => r.category === cat);
            if (!list.length) return null;
            return (
              <div key={cat}>
                <div className="category-head">{cat}</div>
                <ul className="rule-list">
                  {list.map((r) => {
                    const off = disabled.has(r.id);
                    const isEdited = r.origin === 'built-in' && playbook.edits[r.id] !== undefined;
                    return (
                      <li className="rule-row" key={r.id} data-disabled={off}>
                        <div className="rule-main">
                          <div className="rule-line">
                            <SeverityChip severity={r.severity} />
                            <span className="rule-title">{r.title}</span>
                            <span className="rule-id">{r.id}</span>
                            {r.origin === 'team' ? (
                              <span className="badge" data-kind="team">
                                Added by {r.addedBy || 'a reviewer'}
                                {r.addedOn ? ` · ${r.addedOn}` : ''}
                              </span>
                            ) : null}
                            {isEdited ? <span className="badge">Recalibrated</span> : null}
                            {!off && ruleFires(r, facts) ? (
                              <span className="badge" data-kind="fires">
                                Firing now
                              </span>
                            ) : null}
                            {off ? <span className="badge">Off</span> : null}
                          </div>
                          <span className="rule-meta">Fires when {r.when.map(describeCondition).join(' and ')}.</span>
                          {r.benchmark ? <span className="rule-meta">Benchmark: {r.benchmark.label}</span> : null}
                          {r.source ? <span className="rule-meta muted">Source: {r.source}</span> : null}
                          {r.lesson ? <span className="lesson">{r.lesson}</span> : null}
                        </div>
                        <div className="rule-actions">
                          <button type="button" className="btn btn-quiet" onClick={() => onEdit(r)}>
                            Edit
                          </button>
                          <button type="button" className="btn btn-quiet" onClick={() => onToggle(r.id)}>
                            {off ? 'Turn on' : 'Turn off'}
                          </button>
                          {isEdited ? (
                            <button type="button" className="btn btn-quiet" onClick={() => onReset(r.id)}>
                              Reset
                            </button>
                          ) : null}
                          {r.origin === 'team' ? (
                            confirmDelete === r.id ? (
                              <>
                                <button
                                  type="button"
                                  className="btn"
                                  onClick={() => {
                                    onDelete(r.id);
                                    setConfirmDelete(null);
                                  }}
                                >
                                  Delete for good
                                </button>
                                <button type="button" className="btn btn-quiet" onClick={() => setConfirmDelete(null)}>
                                  Keep
                                </button>
                              </>
                            ) : (
                              <button type="button" className="btn btn-quiet" onClick={() => setConfirmDelete(r.id)}>
                                Delete
                              </button>
                            )
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <p className="small muted" style={{ paddingTop: 14 }}>
            {BUILT_IN_RULES.length} checks ship with the app. Thresholds and benchmarks are defaults with sources; recalibrate
            them when the market moves.
          </p>
        </div>
      </section>
    </div>
  );
}
