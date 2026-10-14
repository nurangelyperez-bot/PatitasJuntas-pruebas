// ===================================================================
// FICHA DE LA PANTALLA "EXPLORAR CUIDADORES" (Page Object)
// -------------------------------------------------------------------
// Reune las DIRECCIONES y ACCIONES del catalogo de cuidadores.
// ===================================================================

class ExplorarPage {
  constructor(page) {
    this.page = page

    // --- DIRECCIONES (selectores) del catalogo ---
    this.campoBuscar = page.getByPlaceholder('Buscar por nombre o comuna') // cuadro de busqueda
    this.tarjetasCuidador = page.getByTestId('cuidador-card')              // tarjetas del catalogo
    this.enlacesVerPerfil = page.getByTestId('ver-perfil')                 // "Ver perfil" de cada tarjeta
  }

  // --- ACCIONES del catalogo ---
  // Ir directo al catalogo.
  async abrir() {
    await this.page.goto('/explorar')
  }

  // Escribir un texto en el buscador (por nombre o comuna).
  async buscar(texto) {
    await this.campoBuscar.fill(texto)
  }
}

module.exports = { ExplorarPage }
