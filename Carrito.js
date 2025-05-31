class Carrito {
  constructor() {
    this.productos = [];
  }

  agregarProducto(producto, cantidad) {
    const existente = this.productos.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += cantidad;
      existente.subtotal = existente.precio * existente.cantidad;
    } else {
      const subtotal = producto.calcularSubtotal
        ? producto.calcularSubtotal(cantidad)
        : producto.precio * cantidad;

      this.productos.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad,
        subtotal
      });
    }
  }

  calcularTotal() {
    return this.productos.reduce((acc, p) => acc + p.subtotal, 0);
  }

  obtenerResumenHTML() {
    if (this.productos.length === 0) return "<p>El carrito está vacío.</p>";

    let html = "<ul class='list-group'>";
    this.productos.forEach(p => {
      html += `<li class='list-group-item'>${p.nombre} x${p.cantidad} = $${p.subtotal}</li>`;
    });
    html += `</ul><p class='mt-3'><strong>Total: $${this.calcularTotal()}</strong></p>`;
    return html;
  }
}

export default Carrito;
