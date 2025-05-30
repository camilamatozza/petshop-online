class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
  }

  calcularSubtotal(cantidad) {
    return this.precio * cantidad;
  }
}

export default Producto;
