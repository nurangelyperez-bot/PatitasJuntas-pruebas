// ===================================================================
// PRUEBAS DE LA PANTALLA "PORTADA"
// -------------------------------------------------------------------
// Aqui van TODOS los casos de prueba de la portada.
// Las pruebas NO escriben selectores: usan la ficha PortadaPage.
//
// BUENA PRACTICA: con test.beforeEach ya no repetimos "crear la ficha
// y abrir la pagina" en cada caso. Se hace UNA vez, antes de cada prueba.
// EVIDENCIA: capturar(...) toma una foto con RECUADRO ROJO de lo verificado.
// ===================================================================

const { test, expect } = require('@playwright/test')
const { PortadaPage } = require('../../pages/PortadaPage')
const { capturar } = require('../../helpers/capturas')

test.describe('Portada de Patitas Juntas', () => {
  let portada

  // Se ejecuta ANTES de cada prueba del grupo.
  test.beforeEach(async ({ page }) => {
    portada = new PortadaPage(page)
    await portada.abrir()
  })

  test('la portada carga y muestra el titulo en la pestana', async ({ page }) => {
    await test.step('COMPROBAR: el titulo de la pestana', async () => {
      await expect(page).toHaveTitle(portada.tituloPestana)
      await capturar(page, portada.tituloPrincipal, 'Portada OK: el titulo grande de la portada se ve')
    })
  })

  test('el boton principal "Buscar cuidador" es visible', async ({ page }) => {
    await test.step('COMPROBAR: el boton principal se ve', async () => {
      await expect(portada.botonBuscar).toBeVisible()
      await capturar(page, portada.botonBuscar, 'Portada OK: el boton "Buscar cuidador" esta visible')
    })
  })

  test('el aviso legal de intermediaria esta visible', async ({ page }) => {
    await test.step('COMPROBAR: el aviso legal', async () => {
      await expect(portada.avisoLegal).toBeVisible()
      await capturar(page, portada.avisoLegal, 'Portada OK: el aviso legal esta visible')
    })
  })

  test('se muestran cuidadores destacados en la portada', async ({ page }) => {
    await test.step('COMPROBAR: la primera tarjeta de cuidador', async () => {
      await expect(portada.tarjetasDestacadas.first()).toBeVisible()
      await capturar(page, portada.tarjetasDestacadas.first(), 'Portada OK: hay cuidadores destacados')
    })
  })

})
