import { defineConfig } from 'vite';

// Bundles the command-line advisor into one dependency-free file that ships
// inside the Claude skill: npm run build:skill
export default defineConfig({
  build: {
    ssr: 'scripts/preflight-cli.ts',
    outDir: 'skill/vppa-rec-assumption-review/scripts',
    emptyOutDir: false,
    minify: false,
    target: 'node18',
    rollupOptions: {
      output: {
        entryFileNames: 'preflight.mjs',
        format: 'es',
        banner: '// Generated from src/engine by `npm run build:skill`. Do not edit by hand.',
      },
    },
  },
});
