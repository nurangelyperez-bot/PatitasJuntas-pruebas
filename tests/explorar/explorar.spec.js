// ===================================================================
// PRUEBAS DE LA PANTALLA "EXPLORAR CUIDADORES"
// -------------------------------------------------------------------
// Casos del catalogo: llegar desde el menu, ver a Maria con su tarifa
// en pesos, y filtrar por comuna.
//
// BUENA PRACTICA: cada caso sigue el patron PREPARAR -> HACER -> COMPROBAR,
// y cada fase lleva su nombre con test.step para leerlo facil en el reporte.
// ===================================================================

const { test, expect } = require('@playwright/test')
const { PortadaPage } = require('../../pages/PortadaPage')
const { ExplorarPage } = require('../../pages/ExplorarPage')
const { capturar } = require('../../helpers/capturas')

test.describe('Catalogo de cuidadores', () => {
  let portada
  let explorar

  test.beforeEach(async ({ page }) => {
    portada = new PortadaPage(page)
    explorar = new ExplorarPage(page)
  })

  test('desde el menu de la portada se llega al catalogo con Maria y su tarifa', async ({ page }) => {
    await test.step('PREPARAR: abrir la portada', async () => {
      await portada.abrir()
    })
    await test.step('HACER: clic en "Explorar cuidadores"', async () => {
      await portada.enlaceExplorar.click()
    })
    await test.step('COMPROBAR: Maria y su tarifa en pesos', async () => {
      await expect(explorar.tarjetasCuidador.first()).toBeVisible()
      await expect(page.getByText('María', { exact: true })).toBeVisible()
      await expect(page.getByText('$25.000 / día')).toBeVisible()
      await capturar(page, page.getByText('$25.000 / día'), 'Catalogo OK: Maria con su tarifa de $25.000 / día')
    })
  })

  test('el buscador filtra cuidadores por comuna', async ({ page }) => {
    await test.step('PREPARAR: abrir el catalogo', async () => {
      await explorar.abrir()
    })
    await test.step('HACER: buscar "Providencia"', async () => {
      await explorar.buscar('Providencia')
    })
    await test.step('COMPROBAR: queda 1 cuidador', async () => {
      await expect(page.getByText('1 cuidadores encontrados')).toBeVisible()
      await capturar(page, page.getByText('1 cuidadores encontrados'), 'Filtro OK: buscar "Providencia" deja 1 cuidador')
    })
  })

})
