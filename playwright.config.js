// ===================================================================
// CONFIGURACION DE LAS PRUEBAS DE PATITAS JUNTAS
// -------------------------------------------------------------------
// REGLA DE ORDEN: todo lo que Playwright GENERA (reportes, capturas,
// trazas) vive DENTRO de la carpeta 'reportes/'. Nada suelto en la raiz.
// ===================================================================

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000,

  // Artefactos de pruebas (capturas/trazas): dentro de reportes/.
  outputDir: 'reportes/artefactos',

  // REPORTERS: se pueden tener VARIOS a la vez.
  //  - list    -> lo que ves en la terminal.
  //  - html    -> reporte VISUAL. La ruta real la decide scripts/correr-pruebas.js
  //               (una carpeta por corrida con fecha/hora). Este es el respaldo.
  //  - resumen -> archivo de texto con FECHA y HORA + resultados.
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'reportes/ultima' }],
    ['./reporters/resumen-reporter.js', { outputFile: 'reportes/resumen.txt' }],
  ],

  use: {
    // LA URL de nuestra aplicacion. Por eso los tests solo usan "/".
    baseURL: 'https://v0-patitasjuntas.vercel.app',
    // Nuestras etiquetas son data-test (sin "id"). Se lo decimos aqui.
    testIdAttribute: 'data-test',
    // Captura de pantalla en TODAS las pruebas -> evidencia para el reporte.
    screenshot: 'on',
    // Traza para depurar (se guarda cuando falla y se reintenta).
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chrome',
      // Usa TU Google Chrome instalado (no descarga navegadores).
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
