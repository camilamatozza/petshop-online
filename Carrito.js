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
      const subtotal = producto.precio * cantidad;
      this.productos.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad,
        subtotal
      });
    }
  }

eliminarProducto(id) {
  const index = this.productos.findIndex(p => p.id === id);
  if (index !== -1) {
    this.productos.splice(index, 1);
  }
}


  calcularTotal() {
    return this.productos.reduce((acc, p) => acc + p.subtotal, 0);
  }

  tieneProductos() {
    return this.productos.length > 0;
  }

  listarProductos() {
    if (!this.tieneProductos()) return "El carrito está vacío.";
    return this.productos.map(p =>
      `${p.nombre} x${p.cantidad} = $${p.subtotal}`
    ).join("\n");
  }

  obtenerResumen() {
    return {
      productos: this.productos.map(p => ({
        nombre: p.nombre,
        cantidad: p.cantidad,
        subtotal: p.subtotal
      })),
      total: this.calcularTotal()
    };
  }

  vaciarCarrito() {
    this.productos = [];
  }
}

export default Carrito;
