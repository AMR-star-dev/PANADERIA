const productos = [
    { id: 1, nombre: 'Baguette', categoria: 'panes', precio: 1.50, descripcion: 'Pan francés crujiente por fuera y suave por dentro.', img: 'img/baguettes.jpg' },
    { id: 2, nombre: 'Pan integral', categoria: 'panes', precio: 2.20, descripcion: 'Hecho con harina integral.', img: 'img/integral.jpg' },
    { id: 3, nombre: 'Croissant', categoria: 'pasteles', precio: 1.80, descripcion: 'Mantequilla y hojaldre.', img: 'img/croissant.jpg' },
    { id: 4, nombre: 'Tarta de manzana', categoria: 'pasteles', precio: 12.00, descripcion: 'Tarta casera.', img: 'img/manzana.jpg' },
    { id: 5, nombre: 'Galletas de chocolate', categoria: 'galletas', precio: 0.90, descripcion: 'Con trozos de chocolate.', img: 'img/chocolate.jpg' },
    { id: 6, nombre: 'Galleta de avena', categoria: 'galletas', precio: 0.95, descripcion: 'Con avena y miel.', img: 'img/avena.jpg' }
];

const carrito = [];
const gridProductos = document.getElementById('grid-productos');
const contadorCarrito = document.getElementById('contador-carrito');
const modalCarrito = document.getElementById('modal-carrito');
const contenidoCarrito = document.getElementById('contenido-carrito');
const totalSpan = document.getElementById('total');

function cargarProductos(productosAMostrar = productos) {
    gridProductos.innerHTML = '';
    productosAMostrar.forEach(producto => {
        const card = document.createElement('article');
        card.className = 'producto-card';
        card.innerHTML = `
            <img src="${producto.img}" class="producto-img" alt="${producto.nombre}">
            <div>
                <h3>${producto.nombre}</h3>
                <span class="producto-categoria">${producto.categoria}</span>
                <p>${producto.descripcion}</p>
            </div>
            <div>
                <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
                <button class="btn-primario" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
        gridProductos.appendChild(card);
    });
}

function filtrarProductos(categoria) {
    const botones = document.querySelectorAll('.filtro-btn');
    botones.forEach(btn => btn.classList.remove('activo'));
    const botonActivo = Array.from(botones).find(btn => btn.textContent.toLowerCase() === categoria || (categoria === 'todos' && btn.textContent.toLowerCase() === 'todos'));
    if (botonActivo) botonActivo.classList.add('activo');

    if (categoria === 'todos') {
        cargarProductos();
        return;
    }
    const filtrado = productos.filter(producto => producto.categoria === categoria);
    cargarProductos(filtrado);
}

function agregarAlCarrito(productoId) {
    const producto = productos.find(item => item.id === productoId);
    if (!producto) return;

    const itemExistente = carrito.find(item => item.id === productoId);
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    contadorCarrito.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contenidoCarrito.innerHTML = '';

    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        totalSpan.textContent = '0.00';
        return;
    }

    carrito.forEach(item => {
        const productoCarrito = document.createElement('div');
        productoCarrito.className = 'producto-card';
        productoCarrito.innerHTML = `
            <div>
                <h3>${item.nombre}</h3>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Precio unitario: $${item.precio.toFixed(2)}</p>
            </div>
            <div>
                <p class="producto-precio">$${(item.cantidad * item.precio).toFixed(2)}</p>
                <button class="btn-secundario" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            </div>
        `;
        contenidoCarrito.appendChild(productoCarrito);
    });

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    totalSpan.textContent = total.toFixed(2);
}

function eliminarDelCarrito(productoId) {
    const indice = carrito.findIndex(item => item.id === productoId);
    if (indice > -1) {
        carrito.splice(indice, 1);
        actualizarCarrito();
    }
}

function abrirCarrito() {
    modalCarrito.classList.add('activo');
    actualizarCarrito();
}

function cerrarCarrito() {
    modalCarrito.classList.remove('activo');
}

function procesarPedido() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega productos primero.');
        return;
    }
    carrito.length = 0;
    actualizarCarrito();
    cerrarCarrito();
    alert('Pedido procesado con éxito. ¡Gracias por tu compra!');
}

function enviarContacto(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !mensaje) {
        alert('Por favor completa todos los campos.');
        return;
    }

    event.target.reset();
    alert(`Gracias, ${nombre}. Hemos recibido tu mensaje y te contactaremos pronto.`);
}

cargarProductos();