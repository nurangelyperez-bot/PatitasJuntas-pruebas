// ===================================================================
// SCRIPT: ABRIR EL REPORTE MAS RECIENTE
// -------------------------------------------------------------------
// Busca la carpeta de reportes mas nueva (por fecha/hora) dentro de
// 'reportes/' y la abre en el navegador.
//
// Solo considera carpetas con formato de fecha: 2026-10-14_12-59-02
// (asi ignora 'artefactos', 'ultima', etc.).
//
// Uso:  npm run reporte
// ===================================================================

const { spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const base = path.resolve('reportes')
const FORMATO_FECHA = /^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/

if (!fs.existsSync(base)) {
  console.log('Todavia no hay reportes. Corre primero:  npm test')
  process.exit(1)
}

// Solo carpetas cuyo nombre sea una fecha/hora valida; ordenadas quedan cronologicas.
const carpetas = fs
  .readdirSync(base)
  .filter((n) => FORMATO_FECHA.test(n))
  .filter((n) => fs.statSync(path.join(base, n)).isDirectory())
  .sort()

if (carpetas.length === 0) {
  console.log('Todavia no hay reportes. Corre primero:  npm test')
  process.exit(1)
}

const masReciente = carpetas[carpetas.length - 1]
console.log(`Abriendo el reporte mas reciente: reportes/${masReciente}`)

spawnSync('npx', ['playwright', 'show-report', `reportes/${masReciente}`], {
  stdio: 'inherit',
  shell: true,
})
