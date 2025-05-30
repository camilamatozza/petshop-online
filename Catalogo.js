class Catalogo {
  constructor(productos) {
    this.productos = productos;
  }

  generarCatalogoTexto() {
    return this.productos.map((p, i) => `${i + 1}. ${p.nombre} - $${p.precio}`).join("\n");
  }

  mostrarCatalogo() {
    alert("Productos disponibles:\n" + this.generarCatalogoTexto());
  }

  obtenerProductoPorIndice(indice) {
    return this.productos[indice];
  }
}

export default Catalogo;
