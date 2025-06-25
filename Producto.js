class Producto {
  constructor(id, nombre, precio, imagen) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
    this.imagen = imagen;
  }

  calcularSubtotal(cantidad) {
    return this.precio * cantidad;
  }
}
export default Producto;