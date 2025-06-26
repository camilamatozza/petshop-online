import Producto from './Producto.js';

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
<<<<<<< HEAD
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
=======
      producto.calcularSubtotal(cantidad);
      this.productos.push(producto);
    }
    this.guardar();
  }

  eliminarProducto(id) {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      this.guardar();
>>>>>>> 8c686a73b625e93639d31e8719e0026051ae092e
    }
  }

  calcularTotal() {
    return this.productos.reduce((acc, p) => acc + p.subtotal, 0);
  }

<<<<<<< HEAD
  obtenerResumenHTML() {
    if (this.productos.length === 0) return "<p>El carrito está vacío.</p>";

    let html = "<ul class='list-group'>";
    this.productos.forEach(p => {
      html += `<li class='list-group-item'>${p.nombre} x${p.cantidad} = $${p.subtotal}</li>`;
    });
    html += `</ul><p class='mt-3'><strong>Total: $${this.calcularTotal()}</strong></p>`;
    return html;
=======
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
      const cargados = JSON.parse(guardado);
      this.productos = cargados.map(p => {
        const producto = new Producto(p.id, p.nombre, p.precio, p.imagen);
        producto.calcularSubtotal(p.cantidad);
        return producto;
      });
    }
>>>>>>> 8c686a73b625e93639d31e8719e0026051ae092e
  }
}

export default Carrito;
