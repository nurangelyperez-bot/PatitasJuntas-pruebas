// ===================================================================
// SCRIPT: CORRER LAS PRUEBAS CON REPORTE HISTORICO
// -------------------------------------------------------------------
// Corre 'playwright test' y guarda el reporte HTML en una carpeta
// con la FECHA y HORA, dentro de 'reportes/'. Asi cada corrida queda
// guardada por separado y no se sobreescribe la anterior.
//
// Uso:  npm test
//       npm test -- tests/portada      (para correr solo una carpeta)
// ===================================================================

const { spawnSync } = require('child_process')

// Armamos una marca local con fecha y hora: 2026-10-14_12-36-58
const p = (n) => String(n).padStart(2, '0')
const ahora = new Date()
const marca =
  `${ahora.getFullYear()}-${p(ahora.getMonth() + 1)}-${p(ahora.getDate())}` +
  `_${p(ahora.getHours())}-${p(ahora.getMinutes())}-${p(ahora.getSeconds())}`

const carpeta = `reportes/${marca}`
console.log(`Este reporte se guardara en: ${carpeta}`)

// Corremos Playwright y le decimos (via variable de entorno) donde guardar el HTML.
const resultado = spawnSync(
  'npx',
  ['playwright', 'test', ...process.argv.slice(2)],
  {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, PLAYWRIGHT_HTML_OUTPUT_DIR: carpeta },
  }
)

process.exit(resultado.status ?? 1)
