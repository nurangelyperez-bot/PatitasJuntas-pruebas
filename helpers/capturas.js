// ===================================================================
// AYUDANTE: CAPTURAS CON RECUADRO (evidencia visual)
// -------------------------------------------------------------------
// Esta funcion hace TRES cosas:
//   1. Pinta un RECUADRO ROJO alrededor de lo que se esta verificando.
//   2. Toma la captura de pantalla.
//   3. La ADJUNTA al reporte HTML con un nombre claro.
//
// Asi, en el reporte, la persona ve la captura Y el recuadro marcando
// exactamente que era lo que se queria comprobar. Queda como evidencia.
// ===================================================================

const { test } = require('@playwright/test')

async function capturar(page, locator, nombre) {
  // Nos aseguramos de que el elemento este a la vista.
  await locator.scrollIntoViewIfNeeded()

  // Guardamos como estaba el elemento (para dejarlo igual despues).
  const estiloPrevio = await locator.evaluate((el) => el.style.outline)

  // Pintamos el recuadro rojo.
  await locator.evaluate((el) => {
    el.style.outline = '4px solid #e11d48'
    el.style.outlineOffset = '3px'
  })

  // Tomamos la captura de la pantalla completa (con el recuadro visible).
  const imagen = await page.screenshot()

  // Devolvemos el elemento a su estado original (no ensuciamos la app).
  await locator.evaluate((el, previo) => {
    el.style.outline = previo
    el.style.outlineOffset = ''
  }, estiloPrevio)

  // Adjuntamos la captura al reporte HTML con el nombre que le dimos.
  await test.info().attach(nombre, { body: imagen, contentType: 'image/png' })
}

module.exports = { capturar }
