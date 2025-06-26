class Producto {
  constructor(id, nombre, precio, imagen) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
    this.imagen = imagen; 
    this.cantidad = 0;         
    this.subtotal = 0;   
  }
    calcularSubtotal(cantidad) {
    this.cantidad = cantidad;
    this.subtotal = this.precio * cantidad;
  }
}
export default Producto;
