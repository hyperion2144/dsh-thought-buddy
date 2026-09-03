/**
 * Client-bundle build (tsdown) — the standard DSH client pipeline:
 * plain-ESM source (src/client/index.ts + generated src/client/data.ts)
 * bundled to CJS and wrapped in the __ModuleLoader__.load({ id, factory })
 * shell the web profile requires.
 *
 * The client is fully self-contained (no runtime dependencies — the avatar
 * is plain SVG + rAF and the dshLoaderUi service arrives via cordis inject),
 * so nothing is externalized and everything inlines.
 */
import { fileURLToPath } from 'node:url'

export default {
  entry: { client: fileURLToPath(new URL('./src/client/index.ts', import.meta.url)) },
  outDir: fileURLToPath(new URL('./lib', import.meta.url)),
  format: 'cjs',
  platform: 'browser',
  dts: false,
  sourcemap: true,
  clean: false,
  inputOptions: {
    resolve: {
      conditionNames: ['browser', 'import', 'require', 'default'],
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
  },
  outputOptions: {
    entryFileNames: 'client.js',
    banner: 'window.__ModuleLoader__.load({ id: "@dsh-plugin/dsh-thought-buddy", factory: (require) => {',
    footer: 'return module.exports; } });',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
    codeSplitting: false,
  },
}
