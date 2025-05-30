import Producto from './Producto.js';
import Catalogo from './Catalogo.js';
import Carrito from './Carrito.js';

const listaProductos = [
  new Producto(1, "Alimento para perro", 3500),
  new Producto(2, "Juguete de goma", 1200),
  new Producto(3, "Rascador para gatos", 4200),
  new Producto(4, "Collar con luz", 2800)
];

const catalogo = new Catalogo(listaProductos);

function solicitarProductoIndex(productos) {
  const input = prompt("Ingresá el número del producto que querés agregar:");
  if (input === null) return null;
  const index = parseInt(input);
  if (isNaN(index) || index < 1 || index > productos.length) return -1;
  return index - 1;
}

function solicitarCantidadProducto(nombreProducto) {
  const input = prompt(`¿Cuántas unidades de "${nombreProducto}" querés?`);
  if (input === null) return null;
  const cantidad = parseInt(input);
  if (isNaN(cantidad) || cantidad <= 0) return -1;
  return cantidad;
}

function simuladorDeCompra() {
  const carrito = new Carrito();
  let seguir = true;

  alert("Bienvenido al simulador de PetShop Online 🐾");

  while (seguir) {
    catalogo.mostrarCatalogo();
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

  console.log("Detalle del carrito:", carrito.productos);
}

simuladorDeCompra();
