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
      const subtotal = producto.calcularSubtotal(cantidad);
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
    let total = 0;
    for (const item of this.productos) {
      total += item.subtotal;
    }
    return total;
  }

  mostrarResumen() {
    let mensaje = "🛒 RESUMEN DEL PEDIDO 🛒\n\n";
    this.productos.forEach(p => {
      mensaje += `${p.nombre} x${p.cantidad} = $${p.subtotal}\n`;
    });
    mensaje += `\nTOTAL: $${this.calcularTotal()}`;
    alert(mensaje);
  }
}

export default Carrito;
