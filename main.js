import Producto from './Producto.js';
import Catalogo from './Catalogo.js';
import Carrito from './Carrito.js';

const catalogo = new Catalogo([
  new Producto(1, "Alimento para perro", 3500, "alimento-perro.png"),
  new Producto(2, "Juguete de goma", 1200, "juguete-goma.png"),
  new Producto(3, "Rascador para gatos", 4200, "rascador-gatos.png"),
  new Producto(4, "Collar con luz", 2800, "collar-luz.png")
]);


const carrito = new Carrito();

document.addEventListener('DOMContentLoaded', () => {
  const cantidadInput = document.getElementById('cantidad');
  const resultado = document.getElementById('resultado');

 catalogo.renderizarEnContenedor('contenedor-productos', (producto, cantidad) => {
  if (!producto || cantidad <= 0 || isNaN(cantidad)) {
    resultado.innerHTML = `<p class="text-danger">Seleccioná una cantidad válida.</p>`;
    return;
  }

  carrito.agregarProducto(producto, cantidad);

  // Guardar en Storage
  localStorage.setItem('carrito', JSON.stringify(carrito.productos));

  actualizarVistaCarrito();
});


  document.getElementById("btnCalcular").addEventListener("click", () => {
    actualizarVistaCarrito();
  });
});

function actualizarVistaCarrito() {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';

  if (carrito.productos.length === 0) {
    resultado.textContent = 'El carrito está vacío.';
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'list-group';

 carrito.productos.forEach(p => {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.innerHTML = `
    ${p.nombre} x${p.cantidad} = $${p.subtotal}
    <button class="btn btn-sm btn-danger" data-id="${p.id}">🗑</button>
  `;
  ul.appendChild(li);
});
ul.querySelectorAll('button[data-id]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const id = parseInt(e.target.getAttribute('data-id'));
    carrito.eliminarProducto(id);
    localStorage.setItem('carrito', JSON.stringify(carrito.productos));
    actualizarVistaCarrito();
  });
});


  const total = document.createElement('p');
  total.innerHTML = `<strong>Total: $${carrito.calcularTotal()}</strong>`;

  resultado.appendChild(ul);
  resultado.appendChild(total);
}
