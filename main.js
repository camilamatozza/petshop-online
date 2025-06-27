import Producto from './Producto.js';
import Catalogo from './Catalogo.js';
import Carrito from './Carrito.js';

const catalogo = new Catalogo([]);
const carrito = new Carrito();
carrito.cargar();

document.addEventListener('DOMContentLoaded', () => {
  const resultado = document.getElementById('resultado');
  const inputBusqueda = document.getElementById('inputBusqueda');

  // 🔹 Cargar productos desde archivo JSON
  fetch("assets/api/productos.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(prod => {
        catalogo.agregarProducto(prod.nombre, prod.precio, prod.imagen);
      });

      // 🔹 Render dinámico con productos cargados
      catalogo.renderizarEnContenedor('contenedor-productos', (producto, cantidad) => {
        if (!producto || cantidad <= 0 || isNaN(cantidad)) {
          resultado.innerHTML = `<p class="text-danger">Seleccioná una cantidad válida.</p>`;
          return;
        }
        carrito.agregarProducto(producto, cantidad);
        mostrarToast();
        actualizarVistaCarrito();
      });

      // 🔹 Agregar funcionalidad a botones del carrusel estático
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
          mostrarToast();
          actualizarVistaCarrito();
        });
      });

      actualizarVistaCarrito();
    })
    .catch(error => {
      console.error("Error al cargar el JSON:", error);
    });

  // 🔍 Buscador por nombre
  inputBusqueda.addEventListener('input', () => {
    const termino = inputBusqueda.value.toLowerCase();
    const filtrados = catalogo.productos.filter(p => p.nombre.toLowerCase().includes(termino));

    catalogo.renderizarEnContenedor('contenedor-productos', (producto, cantidad) => {
      carrito.agregarProducto(producto, cantidad);
      mostrarToast();
      actualizarVistaCarrito();
    }, filtrados);
  });
});

function actualizarVistaCarrito() {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';

  if (!carrito.tieneProductos()) {
    resultado.innerHTML = '<p>El carrito está vacío.</p>';
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

function mostrarToast() {
  Toastify({
    text: "Producto añadido al carrito 🛒",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "#214a67",
    stopOnFocus: true,
  }).showToast();
}
