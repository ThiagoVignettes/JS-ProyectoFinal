const botonCarrito = document.querySelector('.container-cart-icon');
const contenedorProductosCarrito = document.querySelector('.container-cart-products');
const infoProductoCarrito = document.querySelector('.cart-product');
const filaProducto = document.querySelector('.row-product');
const listaProductos = document.querySelector('.container-items');
const totalValor = document.querySelector('.total-pagar');
const contadorProductos = document.querySelector('#contador-productos');
const carritoVacio = document.querySelector('.cart-empty');
const carritoTotal = document.querySelector('.cart-total');

let productosCarrito = [];

botonCarrito.addEventListener('click', () => {
    contenedorProductosCarrito.classList.toggle('hidden-cart');
});

listaProductos.addEventListener('click', manejarAgregarAlCarrito);

filaProducto.addEventListener('click', manejarEliminarDelCarrito);

function manejarAgregarAlCarrito(e) {
    if (e.target.classList.contains('btn-add-cart')) {
        const producto = e.target.parentElement;
        const infoProducto = {
            titulo: producto.querySelector('h2').textContent,
            precio: parseFloat(producto.querySelector('p').textContent.slice(1)),
        };
        actualizarCarrito(infoProducto);
    }
}

function manejarEliminarDelCarrito(e) {
    if (e.target.classList.contains('icon-close')) {
        const producto = e.target.parentElement;
        const titulo = producto.querySelector('.titulo-producto-carrito').textContent;
        const productoEliminado = productosCarrito.find(producto => producto.titulo === titulo);

        if (productoEliminado) {
            productoEliminado.cantidad--;

            if (productoEliminado.cantidad === 0) {
                productosCarrito = productosCarrito.filter(producto => producto.titulo !== titulo);
            }
        }

        actualizarCarrito();
    }
}

function actualizarCarrito(nuevoProducto) {
    if (nuevoProducto) {
        const productoExistente = productosCarrito.find(producto => producto.titulo === nuevoProducto.titulo);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            nuevoProducto.cantidad = 1;
            productosCarrito.push(nuevoProducto);
        }
    }

    mostrarHTML();
}

function mostrarHTML() {
    filaProducto.innerHTML = '';

    let total = 0;
    let totalDeProductos = 0;

    productosCarrito.forEach(producto => {
        const contenedorProducto = document.createElement('div');
        contenedorProducto.classList.add('cart-product');

        contenedorProducto.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${producto.cantidad}</span>
                <p class="titulo-producto-carrito">${producto.titulo}</p>
                <span class="precio-producto-carrito">$${(producto.precio * producto.cantidad).toFixed(2)}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        filaProducto.append(contenedorProducto);

        total += producto.precio * producto.cantidad;
        totalDeProductos += producto.cantidad;
    });

    totalValor.innerText = `$${total.toFixed(2)}`;
    contadorProductos.innerText = totalDeProductos;

    if (!productosCarrito.length) {
        carritoVacio.classList.remove('hidden');
        filaProducto.classList.add('hidden');
        carritoTotal.classList.add('hidden');
    } else {
        carritoVacio.classList.add('hidden');
        filaProducto.classList.remove('hidden');
        carritoTotal.classList.remove('hidden');
    }
}

// Inicialización inicial
mostrarHTML();
