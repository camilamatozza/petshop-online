// Clase Producto
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  calcularSubtotal(cantidad) {
    return this.precio * cantidad;
  }
}

// Clase Carrito
class Carrito {
  constructor() {
    this.productos = [];
  }

  agregarProducto(producto, cantidad) {
    const subtotal = producto.calcularSubtotal(cantidad);
    this.productos.push({
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
      subtotal
    });
  }

  calcularTotal() {
    return this.productos.reduce((acc, item) => acc + item.subtotal, 0);
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

// Lista de productos disponibles
const listaProductos = [
  new Producto("Alimento para perro", 3500),
  new Producto("Juguete de goma", 1200),
  new Producto("Rascador para gatos", 4200),
  new Producto("Collar con luz", 2800)
];

// Mostrar productos al usuario
function mostrarCatalogo() {
  let mensaje = "Productos disponibles:\n";
  listaProductos.forEach((p, i) => {
    mensaje += `${i + 1}. ${p.nombre} - $${p.precio}\n`;
  });
  alert(mensaje);
}

// Simulador de compra
function simuladorDeCompra() {
  const carrito = new Carrito();
  let seguir = true;

  alert("Bienvenido al simulador de PetShop Online 🐾");

  while (seguir) {
    mostrarCatalogo();
    const opcion = parseInt(prompt("Ingresá el número del producto que querés agregar:"));

    if (opcion >= 1 && opcion <= listaProductos.length) {
      const productoSeleccionado = listaProductos[opcion - 1];
      const cantidad = parseInt(prompt(`¿Cuántas unidades de "${productoSeleccionado.nombre}" querés?`));

      if (!isNaN(cantidad) && cantidad > 0) {
        carrito.agregarProducto(productoSeleccionado, cantidad);
      } else {
        alert("⚠️ Cantidad inválida.");
      }
    } else {
      alert("⚠️ Producto no válido.");
    }

    seguir = confirm("¿Querés agregar otro producto?");
  }

  if (carrito.productos.length > 0) {
    carrito.mostrarResumen();
  } else {
    alert("No se agregó ningún producto.");
  }

  console.log("Detalle del carrito:", carrito.productos);
}
