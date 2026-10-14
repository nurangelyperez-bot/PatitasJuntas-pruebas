// ===================================================================
// FICHA DE LA PANTALLA "PERFIL DEL CUIDADOR" (Page Object)
// -------------------------------------------------------------------
// Reune las DIRECCIONES y ACCIONES de la pantalla de perfil y su
// formulario de solicitud de servicio.
// ===================================================================

class PerfilPage {
  constructor(page) {
    this.page = page

    // --- DIRECCIONES (selectores) del perfil ---
    // El formulario completo de solicitud (tiene data-test="solicitud-servicio").
    this.formSolicitud = page.getByTestId('solicitud-servicio')

    // Los campos de fecha viven DENTRO del formulario, por eso los buscamos ahi.
    this.fechaInicio = this.formSolicitud.getByLabel('Fecha de inicio')
    this.fechaFin = this.formSolicitud.getByLabel('Fecha de finalización')
    this.botonSolicitar = this.formSolicitud.getByRole('button', { name: 'Solicitar servicio' })
  }

  // --- ACCIONES del perfil ---
  // Abrir el perfil de un cuidador por su id (ej: 'maria').
  async abrir(id) {
    await this.page.goto('/cuidador/' + id)
  }

  // Llenar las fechas y enviar la solicitud.
  async solicitar(inicio, fin) {
    await this.fechaInicio.fill(inicio)
    await this.fechaFin.fill(fin)
    await this.botonSolicitar.click()
  }
}

module.exports = { PerfilPage }
