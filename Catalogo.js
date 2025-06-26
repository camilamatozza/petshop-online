import Producto from "./Producto.js";

class Catalogo {
  constructor(productos = []) {
    this.productos = productos;
  }

  buscarPorNombre(nombre) {
    return this.productos.find(p => p.nombre === nombre.toUpperCase());
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

  renderizarEnContenedor(idContenedor, callback) {
    const contenedor = document.getElementById(idContenedor);
    contenedor.innerHTML = "";

    this.productos.forEach(producto => {
      const col = document.createElement("div");
      col.className = "col";

      col.innerHTML = `
        <div class="card h-100 text-center">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text text-danger fw-bold">$${producto.precio}</p>
            <input type="number" min="1" value="1" class="form-control mb-2 cantidad-input">
            <button class="btn btn-danger w-100">Añadir</button>
          </div>
        </div>
      `;

      const btn = col.querySelector("button");
      const input = col.querySelector("input");

      btn.addEventListener("click", () => {
        const cantidad = parseInt(input.value);
        callback(producto, cantidad);
      });

      contenedor.appendChild(col);
    });
  }
}

export default Catalogo;
