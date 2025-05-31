import Producto from './Producto.js';
import Catalogo from './Catalogo.js';
import Carrito from './Carrito.js';

// Lista de productos disponibles
const listaProductos = [
  new Producto(1, "Alimento para perro", 3500),
  new Producto(2, "Juguete de goma", 1200),
  new Producto(3, "Rascador para gatos", 4200),
  new Producto(4, "Collar con luz", 2800)
];

// Instancia del catálogo
const catalogo = new Catalogo(listaProductos);

// Muestra el catálogo y pide el número en el mismo prompt
function solicitarProductoIndex(productos) {
  let mensaje = "📦 Productos disponibles:\n\n";

  productos.forEach((producto, index) => {
    mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
  });

  mensaje += "\nIngresá el número del producto que querés agregar:";
  const input = prompt(mensaje);

  if (input === null) return null;

  const index = parseInt(input);
  if (isNaN(index) || index < 1 || index > productos.length) return -1;
  return index - 1;
}

// Pide cantidad al usuario
function solicitarCantidadProducto(nombreProducto) {
  const input = prompt(`¿Cuántas unidades de "${nombreProducto}" querés?`);
  if (input === null) return null;

  const cantidad = parseInt(input);
  if (isNaN(cantidad) || cantidad <= 0) return -1;
  return cantidad;
}

// Simulador de compra principal
function simuladorDeCompra() {
  const carrito = new Carrito();
  let seguir = true;

  alert("🐾 Bienvenido al simulador de PetShop Online");

  while (seguir) {
    const index = solicitarProductoIndex(listaProductos);

    if (index === null) break;
    if (index === -1) {
      alert("⚠️ Producto no válido.");
      continue;
    }

    const productoSeleccionado = catalogo.obtenerProductoPorIndice(index);
    const cantidad = solicitarCantidadProducto(productoSeleccionado.nombre);

    if (cantidad === null) break;
    if (cantidad === -1) {
      alert("⚠️ Cantidad inválida.");
      continue;
    }

    carrito.agregarProducto(productoSeleccionado, cantidad);
    seguir = confirm("¿Querés agregar otro producto?");
  }

  if (carrito.productos.length > 0) {
    carrito.mostrarResumen();
  } else {
    alert("No se agregó ningún producto.");
  }
}

// Hacemos la función accesible desde el botón en HTML
window.simuladorDeCompra = simuladorDeCompra;
