// ===================================================================
// FICHA DE LA PANTALLA "PORTADA" (Page Object)
// -------------------------------------------------------------------
// Aqui viven las DIRECCIONES (selectores) y las ACCIONES de la portada.
// Las pruebas NO saben donde esta cada cosa: se lo preguntan a esta ficha.
// Si un boton cambia, se arregla SOLO aqui (no en cada prueba).
// ===================================================================

class PortadaPage {
  constructor(page) {
    // Guardamos la "pagina" del navegador para usarla en las acciones.
    this.page = page

    // --- DIRECCIONES (selectores) de la portada ---
    // Cada linea es la "direccion" de un elemento de esta pantalla.
    this.tituloPrincipal = page.getByRole('heading', { level: 1 })  // titulo grande de la portada
    this.botonBuscar = page.getByTestId('buscar-cuidador')         // boton principal "Buscar cuidador"
    this.enlaceExplorar = page.getByTestId('explorar-cuidadores')  // enlace del menu "Explorar cuidadores"
    this.tarjetasDestacadas = page.getByTestId('cuidador-card')    // tarjetas de cuidadores destacados
    this.avisoLegal = page.getByText(/solo un punto de encuentro/) // texto del aviso legal (pie)

    // Texto que aparece en la pestana del navegador.
    this.tituloPestana = 'Patitas Juntas | Cuidado que se siente como hogar'
  }

  // --- ACCIONES de la portada ---
  // "abrir" lleva el navegador a la portada.
  // Como el baseURL ya esta configurado, basta con '/' (el inicio).
  async abrir() {
    await this.page.goto('/')
  }
}

// Se exporta para que las pruebas puedan usar esta ficha.
module.exports = { PortadaPage }
