import Producto from "./Producto.js";

class Catalogo {
  constructor(productos = []) {
    this.productos = productos;
  }

  agregarProducto(nombre, precio, imagen) {
    const id = this.productos.length + 1;
    const nuevoProducto = new Producto(id, nombre, precio, imagen);
    this.productos.push(nuevoProducto);
  }

  listarProductos() {
    if (!this.tieneProductos()) return "El catálogo está vacío.";
    return this.productos.map(p =>
      `${p.id}. ${p.nombre} - $${p.precio}`
    ).join("\n");
  }

  buscarProductoPorId(id) {
    return this.productos.find(p => p.id === id);
  }

  filtrarPorNombre(nombre) {
    const encontrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    if (encontrados.length === 0) return "No se encontraron productos.";
    return encontrados.map(p =>
      `${p.id}. ${p.nombre} - $${p.precio}`
    ).join("\n");
  }

  ordenarPorPrecio(ascendente = true) {
    this.productos.sort((a, b) =>
      ascendente ? a.precio - b.precio : b.precio - a.precio
    );
    return this.listarProductos();
  }

  tieneProductos() {
    return this.productos.length > 0;
  }

  renderizarEnContenedor(idContenedor, callbackAgregar) {
    const contenedor = document.getElementById(idContenedor);
    contenedor.innerHTML = '';

    this.productos.forEach(producto => {
      const col = document.createElement('div');
      col.className = 'col';

      col.innerHTML = `
        <div class="producto text-center p-3 border rounded h-100 d-flex flex-column justify-content-between">
          <img src="assets/${producto.imagen}" alt="${producto.nombre}" class="img-fluid mb-2">
          <p class="product-name">${producto.nombre}</p>
          <p class="text-danger fw-bold">$${producto.precio}</p>
          <div class="input-group">
            <input type="number" min="1" value="1" class="form-control cantidad-input">
            <button class="btn btn-danger btn-sm">Añadir</button>
          </div>
        </div>
      `;

      const btn = col.querySelector('button');
      const inputCantidad = col.querySelector('.cantidad-input');

      btn.addEventListener('click', () => {
        const cantidad = parseInt(inputCantidad.value);
        if (cantidad > 0 && !isNaN(cantidad)) {
          callbackAgregar(producto, cantidad);
        } else {
          alert("Ingresá una cantidad válida.");
        }
      });

      contenedor.appendChild(col);
    });
  }
}

export default Catalogo;
