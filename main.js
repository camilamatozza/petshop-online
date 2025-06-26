import Producto from './Producto.js';
import Catalogo from './Catalogo.js';
import Carrito from './Carrito.js';

const catalogo = new Catalogo([
  new Producto(1, "Alimento para perro", 3500, "assets/alimento-perro.png"),
  new Producto(2, "Juguete de goma", 1200, "assets/juguete-goma.png"),
  new Producto(3, "Rascador para gatos", 4200, "assets/rascador-gatos.png"),
  new Producto(4, "Collar con luz", 2800, "assets/collar-luz.png")
]);

const carrito = new Carrito();
carrito.cargar();

document.addEventListener('DOMContentLoaded', () => {
  const resultado = document.getElementById('resultado');

  // Render dinámico de productos
  catalogo.renderizarEnContenedor('contenedor-productos', (producto, cantidad) => {
    if (!producto || cantidad <= 0 || isNaN(cantidad)) {
      resultado.innerHTML = `<p class="text-danger">Seleccioná una cantidad válida.</p>`;
      return;
    }

    carrito.agregarProducto(producto, cantidad);
    actualizarVistaCarrito();
  });

  // Productos estáticos del carrusel
  document.querySelectorAll('.producto .add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.producto');
      const nombre = card.querySelector('.product-name').textContent.trim();
      const precio = parseFloat(card.querySelector('.price').textContent.replace('$', '').trim());
      const imagen = card.querySelector('img').getAttribute('src');

      let productoExistente = catalogo.buscarPorNombre(nombre);
      if (!productoExistente) {
        const nuevoId = catalogo.productos.length + 1;
        productoExistente = new Producto(nuevoId, nombre, precio, imagen);
        catalogo.productos.push(productoExistente);
      }

      carrito.agregarProducto(productoExistente, 1);
      actualizarVistaCarrito();
    });
  });

  actualizarVistaCarrito();
});

function actualizarVistaCarrito() {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';

  if (!carrito.tieneProductos()) {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'El carrito está vacío.';
    resultado.appendChild(mensaje);
    return;
  }

  carrito.productos.forEach(p => p.calcularSubtotal(p.cantidad));

  const ul = document.createElement('ul');
  ul.className = 'list-group';

  carrito.productos.forEach(p => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const span = document.createElement('span');
    span.textContent = `${p.nombre} x${p.cantidad} = $${p.subtotal}`;

    const boton = document.createElement('button');
    boton.className = 'btn btn-sm btn-danger';
    boton.textContent = '🗑';
    boton.addEventListener('click', () => {
      carrito.eliminarProducto(p.id);
      actualizarVistaCarrito();
    });

    li.appendChild(span);
    li.appendChild(boton);
    ul.appendChild(li);
  });

  const total = document.createElement('p');
  total.innerHTML = `<strong>Total: $${carrito.calcularTotal()}</strong>`;

  resultado.appendChild(ul);
  resultado.appendChild(total);
}
