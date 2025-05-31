import Producto from './Producto.js';
import Catalogo from './Catalogo.js';
import Carrito from './Carrito.js';

const catalogo = new Catalogo([
  new Producto(1, "Alimento para perro", 3500),
  new Producto(2, "Juguete de goma", 1200),
  new Producto(3, "Rascador para gatos", 4200),
  new Producto(4, "Collar con luz", 2800)
]);

const carrito = new Carrito();

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('producto');
  const cantidad = document.getElementById('cantidad');
  const btn = document.getElementById('btnCalcular');
  const resultado = document.getElementById('resultado');

  btn.addEventListener('click', () => {
    const id = parseInt(select.value);
    const cant = parseInt(cantidad.value);

    const producto = catalogo.buscarProductoPorId(id);
    if (!producto || cant <= 0 || isNaN(cant)) {
      resultado.innerHTML = `<p class="text-danger">Por favor seleccioná un producto y cantidad válida.</p>`;
      return;
    }

    carrito.agregarProducto(producto, cant);

    // Guardar en Storage
    localStorage.setItem('carrito', JSON.stringify(carrito.productos));

    const total = carrito.calcularTotal();

    resultado.innerHTML = `
      <p>Producto: <strong>${producto.nombre}</strong></p>
      <p>Cantidad: <strong>${cant}</strong></p>
      <p>Total acumulado: <strong>$${total}</strong></p>
    `;
  });
});
