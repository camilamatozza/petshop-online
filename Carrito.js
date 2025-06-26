class Carrito {
  constructor() {
    this.productos = [];
  }
agregarProducto(producto, cantidad) {
  const existente = this.productos.find(p => p.id === producto.id);
  if (existente) {
    existente.cantidad += cantidad;
    existente.calcularSubtotal(existente.cantidad);
  } else {
    producto.calcularSubtotal(cantidad);
    this.productos.push(producto);
    this.guardar();
    }
  }
 
  eliminarProducto(id) {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      this.guardar();
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
    this.guardar();
  }

  guardar() {
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }

  cargar() {
    const guardado = localStorage.getItem('carrito');
    if (guardado) {
      this.productos = JSON.parse(guardado);
    }
  }
}

export default Carrito;
