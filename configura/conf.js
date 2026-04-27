// ========== JavaScript UNIFICADO PARA TODAS LAS PÁGINAS ==========
// Panadería - Funciones globales

// ========== VARIABLES GLOBALES ==========
let productosFiltrados = [];

// ========== BASE DE DATOS DE PRODUCTOS ==========
const productosData = [
    {
        id: 1,
        nombre: "Pan Francés",
        precio: 2.50,
        categoria: "panes",
        imagen: "https://via.placeholder.com/150?text=Pan+Francés",
        descripcion: "Delicioso pan francés crujiente por fuera y suave por dentro"
    },
    {
        id: 2,
        nombre: "Croissant",
        precio: 3.00,
        categoria: "pasteles",
        imagen: "https://via.placeholder.com/150?text=Croissant",
        descripcion: "Croissant de mantequilla, hojaldrado y dorado"
    },
    {
        id: 3,
        nombre: "Pan Integral",
        precio: 3.50,
        categoria: "panes",
        imagen: "https://via.placeholder.com/150?text=Pan+Integral",
        descripcion: "Pan 100% integral, rico en fibra"
    },
    {
        id: 4,
        nombre: "Pastel de Chocolate",
        precio: 15.00,
        categoria: "pasteles",
        imagen: "https://via.placeholder.com/150?text=Pastel+Chocolate",
        descripcion: "Jugoso pastel de chocolate con cobertura"
    },
    {
        id: 5,
        nombre: "Galletas de Avena",
        precio: 5.00,
        categoria: "galletas",
        imagen: "https://via.placeholder.com/150?text=Galletas+Avena",
        descripcion: "Galletas saludables de avena y miel"
    },
    {
        id: 6,
        nombre: "Empanada de Carne",
        precio: 4.00,
        categoria: "salados",
        imagen: "https://via.placeholder.com/150?text=Empanada+Carne",
        descripcion: "Empanada horneada rellena de carne jugosa"
    },
    {
        id: 7,
        nombre: "Pan de Muerto",
        precio: 8.00,
        categoria: "panes",
        imagen: "https://via.placeholder.com/150?text=Pan+Muerto",
        descripcion: "Pan tradicional con azúcar y naranja"
    },
    {
        id: 8,
        nombre: "Tarta de Fresa",
        precio: 18.00,
        categoria: "pasteles",
        imagen: "https://via.placeholder.com/150?text=Tarta+Fresa",
        descripcion: "Tarta fresca con crema pastelera y fresas naturales"
    }
];

// ========== UTILIDADES GENERALES ==========
// Función para mostrar alertas
function showAlert(message, type, containerSelector = '.container') {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // Eliminar alerta existente
    const existingAlert = container.querySelector('.alert');
    if (existingAlert) existingAlert.remove();
    
    // Crear nueva alerta
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">✖</button>
    `;
    
    // Estilos para el botón cerrar
    const closeBtn = alert.querySelector('.alert-close');
    if (closeBtn) {
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 1rem;
            float: right;
        `;
    }
    
    alert.style.cssText = `
        padding: 1rem;
        border-radius: 0.75rem;
        margin-bottom: 1rem;
        animation: slideDown 0.3s ease;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    if (type === 'success') {
        alert.style.background = '#d4edda';
        alert.style.color = '#155724';
        alert.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        alert.style.background = '#f8d7da';
        alert.style.color = '#721c24';
        alert.style.border = '1px solid #f5c6cb';
    }
    
    // Insertar al inicio del container
    container.insertBefore(alert, container.firstChild);
    
    // Auto-eliminar después de 4 segundos
    setTimeout(() => {
        if (alert && alert.remove) alert.remove();
    }, 4000);
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== FUNCIONES DEL CARRITO ==========
// Obtener carrito
function getCarrito() {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
}

// Guardar carrito
function saveCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar al carrito
function agregarAlCarrito(productoId) {
    const producto = productosData.find(p => p.id === productoId);
    if (!producto) return;
    
    let carrito = getCarrito();
    const existingItem = carrito.find(item => item.id === productoId);
    
    if (existingItem) {
        existingItem.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
            imagen: producto.imagen
        });
    }
    
    saveCarrito(carrito);
    showNotification(`${producto.nombre} agregado al carrito ✅`, 'success');
}

// Mostrar notificación flotante
function showNotification(mensaje, tipo = 'success') {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <span>${mensaje}</span>
        <a href="carrito.html" class="notification-link">Ver carrito</a>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#d87d3a' : '#ff6b6b'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 999px;
        display: flex;
        gap: 1rem;
        align-items: center;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    const link = notification.querySelector('.notification-link');
    if (link) {
        link.style.cssText = `
            color: white;
            text-decoration: underline;
            margin-left: 0.5rem;
        `;
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Actualizar carrito (página carrito.html)
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    const carrito = getCarrito();
    
    if (carrito.length === 0) {
        cartItems.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 3rem;">
                    <p>🛒 Tu carrito está vacío</p>
                    <a href="productos.html" class="btn-seguir-comprando" style="display: inline-block; margin-top: 1rem; background: #d87d3a; color: white; padding: 0.75rem 1.5rem; border-radius: 999px; text-decoration: none;">Seguir comprando</a>
                </td>
            </tr>
        `;
        updateCartTotals();
        return;
    }
    
    cartItems.innerHTML = carrito.map(item => `
        <tr data-id="${item.id}">
            <td>${item.nombre}</td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.cantidad}" min="1" class="cart-quantity" data-id="${item.id}">
            </td>
            <td class="subtotal-${item.id}">$${(item.precio * item.cantidad).toFixed(2)}</td>
            <td>
                <button class="btn-delete" data-id="${item.id}">Eliminar</button>
            </td>
        </tr>
    `).join('');
    
    // Agregar event listeners
    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', (e) => {
            updateCartQuantity(parseInt(e.target.dataset.id), parseInt(e.target.value));
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            removeFromCart(parseInt(e.target.dataset.id));
        });
    });
    
    updateCartTotals();
}

// Actualizar cantidad
function updateCartQuantity(productoId, cantidad) {
    let carrito = getCarrito();
    const item = carrito.find(i => i.id === productoId);
    if (item) {
        item.cantidad = cantidad;
        saveCarrito(carrito);
        updateCartDisplay();
    }
}

// Eliminar del carrito
function removeFromCart(productoId) {
    let carrito = getCarrito();
    carrito = carrito.filter(i => i.id !== productoId);
    saveCarrito(carrito);
    updateCartDisplay();
    showNotification('Producto eliminado del carrito', 'success');
}

// Actualizar totales
function updateCartTotals() {
    const carrito = getCarrito();
    let subtotal = 0;
    
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });
    
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Finalizar compra
function finalizarCompra() {
    const carrito = getCarrito();
    if (carrito.length === 0) {
        showAlert('No hay productos en el carrito', 'error');
        return;
    }
    
    alert('🎉 ¡Gracias por tu compra! Pronto recibirás tu pedido.');
    localStorage.removeItem('carrito');
    updateCartDisplay();
}

// ========== FUNCIONES DE PRODUCTOS ==========
// Renderizar productos
function renderProductos() {
    const productList = document.getElementById('product-list');
    if (!productList) return;
    
    const productos = productosFiltrados.length > 0 ? productosFiltrados : productosData;
    
    if (productos.length === 0) {
        productList.innerHTML = `
            <div class="no-results">
                <p>😢 No encontramos productos que coincidan con tu búsqueda</p>
                <button class="btn-primary" onclick="resetFilters()">Ver todos los productos</button>
            </div>
        `;
        return;
    }
    
    productList.innerHTML = productos.map(producto => `
        <div class="product-card" data-id="${producto.id}">
            <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
            <span class="category">${getCategoriaNombre(producto.categoria)}</span>
            <h3>${producto.nombre}</h3>
            <p class="description">${producto.descripcion}</p>
            <p class="price">$${producto.precio.toFixed(2)}</p>
            <button class="btn-add" onclick="agregarAlCarrito(${producto.id})">
                🛒 Agregar al carrito
            </button>
        </div>
    `).join('');
    
    updateProductCount(productos.length);
}

// Obtener nombre de categoría
function getCategoriaNombre(categoria) {
    const categorias = {
        'panes': '🥖 Panes',
        'pasteles': '🎂 Pasteles',
        'galletas': '🍪 Galletas',
        'salados': '🥐 Salados'
    };
    return categorias[categoria] || categoria;
}

// Filtrar productos
function filterProductos() {
    const searchTerm = document.getElementById('search')?.value.toLowerCase() || '';
    const category = document.getElementById('category')?.value || '';
    
    productosFiltrados = productosData.filter(producto => {
        const matchSearch = producto.nombre.toLowerCase().includes(searchTerm) ||
                           producto.descripcion.toLowerCase().includes(searchTerm);
        const matchCategory = !category || producto.categoria === category;
        return matchSearch && matchCategory;
    });
    
    renderProductos();
}

// Resetear filtros
function resetFilters() {
    if (document.getElementById('search')) {
        document.getElementById('search').value = '';
    }
    if (document.getElementById('category')) {
        document.getElementById('category').value = '';
    }
    productosFiltrados = [];
    renderProductos();
}

// Actualizar contador de productos
function updateProductCount(count) {
    let countElement = document.querySelector('.product-count');
    if (!countElement) {
        countElement = document.createElement('div');
        countElement.className = 'product-count';
        const productGrid = document.getElementById('product-list');
        if (productGrid && productGrid.parentNode) {
            productGrid.parentNode.insertBefore(countElement, productGrid);
        }
    }
    countElement.textContent = `📦 Mostrando ${count} producto${count !== 1 ? 's' : ''}`;
}

// ========== FUNCIONES DE CONTACTO ==========
function handleContactForm(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const mensaje = document.getElementById('mensaje')?.value.trim();
    
    if (!nombre || !email || !mensaje) {
        showAlert('❌ Por favor, completa todos los campos', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert('❌ Por favor, ingresa un correo electrónico válido', 'error');
        return;
    }
    
    if (mensaje.length < 10) {
        showAlert('❌ El mensaje debe tener al menos 10 caracteres', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        const mensajesGuardados = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        mensajesGuardados.push({
            nombre: nombre,
            email: email,
            mensaje: mensaje,
            fecha: new Date().toISOString()
        });
        localStorage.setItem('contactMessages', JSON.stringify(mensajesGuardados));
        
        showAlert('✅ ¡Mensaje enviado con éxito! Te responderemos pronto.', 'success');
        e.target.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// ========== FUNCIONES DE CONFIGURACIÓN ==========
function loadConfiguracionData() {
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedNotifications = localStorage.getItem('notifications');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedName && document.getElementById('name')) {
        document.getElementById('name').value = savedName;
    }
    if (savedEmail && document.getElementById('email')) {
        document.getElementById('email').value = savedEmail;
    }
    if (savedNotifications === 'true' && document.getElementById('notifications')) {
        document.getElementById('notifications').checked = true;
    }
    if (savedDarkMode === 'true' && document.getElementById('dark-mode')) {
        document.getElementById('dark-mode').checked = true;
        document.body.classList.add('dark-mode');
    }
}

function handleConfiguracionForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    
    if (name) localStorage.setItem('userName', name);
    if (email) localStorage.setItem('userEmail', email);
    if (password) localStorage.setItem('userPassword', password);
    
    showAlert('✅ Cambios guardados correctamente', 'success');
    if (document.getElementById('password')) {
        document.getElementById('password').value = '';
    }
}

function handleNotifications(e) {
    localStorage.setItem('notifications', e.target.checked);
    showAlert(e.target.checked ? '📧 Notificaciones activadas' : '🔕 Notificaciones desactivadas', 'success');
}

function handleDarkMode(e) {
    localStorage.setItem('darkMode', e.target.checked);
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        showAlert('🌙 Modo oscuro activado', 'success');
    } else {
        document.body.classList.remove('dark-mode');
        showAlert('☀️ Modo claro activado', 'success');
    }
}

function handleLogout() {
    if (confirm('¿Seguro que quieres cerrar sesión?')) {
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        showAlert('👋 Sesión cerrada', 'success');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    }
}

function handleDeleteAccount() {
    const confirmDelete = confirm('⚠️ ¿Estás ABSOLUTAMENTE seguro? Esta acción no se puede deshacer.');
    if (confirmDelete) {
        const doubleConfirm = prompt('Escribe "ELIMINAR" para confirmar:');
        if (doubleConfirm === 'ELIMINAR') {
            localStorage.clear();
            showAlert('🗑️ Cuenta eliminada permanentemente', 'error');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        } else {
            showAlert('❌ Confirmación incorrecta', 'error');
        }
    }
}

// ========== INICIALIZACIÓN POR PÁGINA ==========
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    
    // Animaciones CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .dark-mode {
            background: #1a1a1a;
            color: #f0f0f0;
        }
        .dark-mode .product-card,
        .dark-mode .filters,
        .dark-mode .contact-info,
        .dark-mode .contact-form,
        .dark-mode .settings-section {
            background: #2d2d2d;
        }
        .dark-mode .product-card h3,
        .dark-mode .contact-info h2,
        .dark-mode .contact-form h2 {
            color: #f2d1b3;
        }
        .dark-mode input,
        .dark-mode select,
        .dark-mode textarea {
            background: #3d3d3d;
            color: #f0f0f0;
            border-color: #555;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Página de productos
    if (currentPage.includes('productos.html')) {
        productosFiltrados = [];
        renderProductos();
        
        const searchInput = document.getElementById('search');
        const categorySelect = document.getElementById('category');
        
        if (searchInput) searchInput.addEventListener('input', filterProductos);
        if (categorySelect) categorySelect.addEventListener('change', filterProductos);
    }
    
    // Página de carrito
    if (currentPage.includes('carrito.html')) {
        updateCartDisplay();
        
        const checkoutBtn = document.querySelector('.btn-checkout');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', finalizarCompra);
        }
    }
    
    // Página de contacto
    if (currentPage.includes('contactos.html') || currentPage.includes('contacto.html')) {
        const contactForm = document.getElementById('form-contacto');
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactForm);
        }
    }
    
    // Página de configuración
    if (currentPage.includes('configuracion.html')) {
        loadConfiguracionData();
        
        const accountForm = document.getElementById('account-form');
        if (accountForm) {
            accountForm.addEventListener('submit', handleConfiguracionForm);
        }
        
        const notifications = document.getElementById('notifications');
        if (notifications) {
            notifications.addEventListener('change', handleNotifications);
        }
        
        const darkMode = document.getElementById('dark-mode');
        if (darkMode) {
            darkMode.addEventListener('change', handleDarkMode);
        }
        
        const logoutBtn = document.querySelector('.btn-danger');
        if (logoutBtn && logoutBtn.innerText === 'Cerrar sesión') {
            logoutBtn.addEventListener('click', handleLogout);
        }
        
        const deleteAccountBtn = document.querySelector('.btn-warning');
        if (deleteAccountBtn && deleteAccountBtn.innerText === 'Eliminar cuenta') {
            deleteAccountBtn.addEventListener('click', handleDeleteAccount);
        }
    }
});

// Exportar funciones globales
window.agregarAlCarrito = agregarAlCarrito;
window.resetFilters = resetFilters;
window.finalizarCompra = finalizarCompra;