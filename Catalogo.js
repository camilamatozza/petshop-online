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

<<<<<<< HEAD
  buscarProductoPorId(id) {
    return this.productos.find(p => p.id === id);
  }
=======
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

    const card = document.createElement("div");
    card.className = "card h-100 text-center";

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;
    img.className = "card-img-top";

    const body = document.createElement("div");
    body.className = "card-body";

    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.className = "card-text text-danger fw-bold";
    precio.textContent = `$${producto.precio}`;

    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.value = "1";
    input.className = "form-control mb-2 cantidad-input";

    const boton = document.createElement("button");
    boton.className = "btn btn-danger w-100";
    boton.textContent = "Añadir";

    boton.addEventListener("click", () => {
      const cantidad = parseInt(input.value);
      callback(producto, cantidad);
    });

    body.appendChild(h5);
    body.appendChild(precio);
    body.appendChild(input);
    body.appendChild(boton);

    card.appendChild(img);
    card.appendChild(body);
    col.appendChild(card);
    contenedor.appendChild(col);
  });
>>>>>>> 8c686a73b625e93639d31e8719e0026051ae092e
}
} 
export default Catalogo;
