// ===================================================================
// REPORTER "RESUMEN": tu respaldo en texto con FECHA y HORA
// -------------------------------------------------------------------
// Playwright avisa a este archivo cuando termina cada prueba (onTestEnd)
// y cuando termina TODA la corrida (onEnd).
// Escribimos un archivo RESUMEN-EJECUCION.txt que se puede abrir con
// cualquier editor (o el Bloc de notas) para dejar constancia.
// Cada corrida AGREGA un bloque nuevo (queda el historial).
// ===================================================================

const fs = require('fs');
const path = require('path');

class ResumenReporter {
  constructor(options = {}) {
    this.outputFile = options.outputFile || 'reportes/resumen.txt';
    this.passed = 0;
    this.failed = 0;
    this.skipped = 0;
    this.detalle = [];
  }

  // Se ejecuta cuando TERMINA cada prueba.
  onTestEnd(test, result) {
    if (result.status === 'passed') this.passed++;
    else if (result.status === 'skipped') this.skipped++;
    else this.failed++;

    const marca = result.status === 'passed' ? 'PASO' : 'FALLO';
    this.detalle.push(`   [${marca}] ${test.title}`);
  }

  // Se ejecuta UNA vez, cuando termina TODA la corrida.
  onEnd(result) {
    const ahora = new Date();
    const ok = result.status === 'passed';
    const lineas = [
      '============================================================',
      'RESUMEN DE EJECUCION - PATITAS JUNTAS',
      '============================================================',
      `Fecha y hora de termino : ${ahora.toLocaleString('es-CL')}`,
      `Estado general          : ${ok ? 'TODO OK' : 'CON FALLAS'}`,
      `Duracion total          : ${(result.duration / 1000).toFixed(1)} segundos`,
      `Resultados              : ${this.passed} PASARON, ${this.failed} FALLARON, ${this.skipped} OMITIDAS`,
      '',
      'Detalle por prueba:',
      ...this.detalle,
      '',
      'Reporte visual (con capturas):',
      '  Abre el mas reciente con el comando:  npm run reporte',
      '  (o abre la carpeta reportes/ mas nueva y su index.html)',
      '============================================================',
      '',
    ].join('\n');

    // Nos aseguramos de que la carpeta exista antes de escribir.
    const ruta = path.resolve(this.outputFile);
    fs.mkdirSync(path.dirname(ruta), { recursive: true });

    // 'appendFileSync' agrega al final sin borrar lo anterior (historial).
    fs.appendFileSync(ruta, lineas, 'utf8');
  }
}

module.exports = ResumenReporter;
