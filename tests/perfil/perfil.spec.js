// ===================================================================
// PRUEBAS DE LA PANTALLA "PERFIL DEL CUIDADOR"
// -------------------------------------------------------------------
// Casos del perfil y su formulario de solicitud de servicio.
// ===================================================================

const { test, expect } = require('@playwright/test')
const { PerfilPage } = require('../../pages/PerfilPage')
const { capturar } = require('../../helpers/capturas')

test.describe('Perfil del cuidador', () => {
  let perfil

  // Abrimos el perfil de Maria antes de cada prueba de este grupo.
  test.beforeEach(async ({ page }) => {
    perfil = new PerfilPage(page)
    await perfil.abrir('maria')
  })

  test('el perfil de Maria muestra el formulario de solicitud', async ({ page }) => {
    await test.step('COMPROBAR: el formulario de solicitud es visible', async () => {
      await expect(perfil.formSolicitud).toBeVisible()
      await expect(page.getByText('Solicitar servicio').first()).toBeVisible()
      await capturar(page, perfil.formSolicitud, 'Perfil OK: el formulario de solicitud es visible')
    })
  })

  test('enviar una solicitud completa muestra confirmacion', async ({ page }) => {
    await test.step('HACER: elegir fechas y enviar la solicitud', async () => {
      await perfil.solicitar('2026-11-10', '2026-11-12')
    })
    await test.step('COMPROBAR: aparece el aviso de exito', async () => {
      const aviso = page.getByText('Solicitud enviada correctamente')
      await expect(aviso).toBeVisible()
      await capturar(page, aviso, 'Solicitud OK: se mostro el aviso de exito')
    })
  })

})
