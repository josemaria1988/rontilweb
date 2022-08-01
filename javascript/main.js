//VARIABLES GLOBALES:
const contenedor_productos = document.getElementById('contenedor-productos');
const carrito_compras = document.getElementById('carrito-compras');
const precio_total = document.getElementById('precio-total');
const contador_total = document.getElementById('contador-total');
const activar_carrito = document.getElementById('boton-carrito');
const buscador = document.getElementById('input-buscador');
const btn_buscador = document.getElementById('btn-buscador');
let carrito_json = [];
let carrito = [];
let productosBuscados = [];
let DateTime = luxon.DateTime;

// MENU RESPONSIVE CON JAVASCRIPT Y CSS
const botonMenu = document.querySelector('.botonMenu');
const enlaces = document.querySelector('.enlaces-menu');
const barras = document.querySelectorAll('.botonMenu span');

//CARGA PAGINA CON PRODUCTOS DEL FETCH------------------
window.addEventListener('DOMContentLoaded', async () => {
    const data = await cargarProductos()
    productosBuscados = data
    mostrar_productos(productosBuscados)

})
//EVENTOS DEL BUSCADOR----------------------------
buscador.addEventListener('keyup', e => {
    const nuevoProducto = productosBuscados.filter(producto => producto.nombre.toLowerCase().includes(buscador.value))
    mostrar_productos(nuevoProducto);
});

//Llamamos a los productos en el json con un fetch en async
async function cargarProductos() {
    const response = await fetch("productos/productos.json")
    return await response.json()
}


//LIBRERIA LUXON--------------------
const pegaHora = () => {
    let hoy = DateTime.now()
    let horaCompra = hoy.toFormat('dd/LL/yyyy HH:mm:ss')
    return horaCompra
}



//Creamos una clase constructora para los productos traídos del json.
class ProductoCarrito {
    constructor(nombre, descripcion, precio, imagen, cantidad, id, hora) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = cantidad
        this.id = id;
        this.hora = hora;

    }
}


activar_carrito.addEventListener('click', () => {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    actualizar_carrito(carrito)
})

botonMenu.addEventListener('click', () => {
    enlaces.classList.toggle('activado');
    barras.forEach(child => { child.classList.toggle('animado') });
});

//HEADER BACKGROUND AL HACER SCROLL DOWN
jQuery(window).on('scroll', function () {
    if (jQuery(window).scrollTop() > 300) {
        jQuery('#header_frame').css('background-color', '#FFFFFF');
    } else {
        jQuery('#header_frame').css('background-color', '#ddab46');
    }
});

//<------------------FUNCIONES-------------------->

//Comprobamos si hay elementos en localStorage:
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizar_carrito(carrito)
    }
})

//Funcion para imprimir los productos en el html:
function mostrar_productos(productos) {

    contenedor_productos.innerHTML = "";


    productos.forEach(producto => {
        let div = document.createElement('div');
        div.className = 'col'
        div.innerHTML = `<div class="card h-200">
        <img class="card-img-top" src=${producto.img} alt = ${producto.id} >
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <ul class="list-group">
                <li class="list-group-item">${producto.descrip}</li>
                <li class="list-group-item">${producto.precio}</li>
            </ul>
            <button id="boton${producto.id}" class="btn btn-lg btn-block btn-outline-primary mt-auto anadirAlCarrito">Comprar</button>
        </div>
    </div>`

        contenedor_productos.appendChild(div);
    })


    let botones = document.querySelectorAll(".anadirAlCarrito")
    botones.forEach(boton => {
        boton.addEventListener("click", agregar_carrito)
    })
}


//Definimos función agregar_carrito encargada de agregar productos al array carrito sin que se repitan
function agregar_carrito(e) {

    let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'))
    if (carritoLocalStorage) {
        carrito = carritoLocalStorage
    }

    let id = e.target.parentNode.parentNode.children[0].alt;
    let index = carrito.findIndex(producto => producto.id == id)
    let nombre = e.target.parentNode.children[0].textContent;
    let descripcion = e.target.parentNode.children[1].children[0].innerHTML;
    let precio = e.target.parentNode.children[1].children[1].innerHTML;
    let imagen = e.target.parentNode.parentNode.children[0].src;
    let hora = pegaHora()
    let cantidad = 1;

    if (index == -1) {
        const producto = new ProductoCarrito(nombre, descripcion, precio, imagen, cantidad, id, hora)
        carrito.push(producto)
    } else {
        carrito[index].cantidad++;
        carrito[index].hora = pegaHora();
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))

    Toastify({
        duration: 1000,
        text: "Producto añadido al carrito",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

//Actualizamos el carrito con los totales e imprimimos los productos en el carrito.
function actualizar_carrito(arrayCarrito) {
    contador_total.innerText = carrito.length;
    carrito_compras.innerHTML = ""

    for (let agregar_producto of arrayCarrito) {
        let li = document.createElement('li')
        li.className = 'carrito-compras'
        li.innerHTML = `
                <li class="list-group-item justify-content-between">
                    <h6 class="my-0">${agregar_producto.nombre}</h6>
                    <p class="text-muted">${agregar_producto.descripcion}</p>
                    <p class="text-muted" style="background: yellow"> Añadido el ${agregar_producto.hora}</p>
                    <li class="list-group-item d-flex justify-content-between">
                    <span class="text-muted">Cantidad: ${agregar_producto.cantidad}</span>
                    <span class="text-muted">$${agregar_producto.precio}</span>
                    
                    </li>
                    <button id="btn_eliminar${agregar_producto.id}" class="btn btn-danger ml-0 eliminarProducto">Eliminar</button>
                    </li>
                    `
        carrito_compras.appendChild(li);
    }
    precio_total.innerText = carrito.reduce((acc, info) => acc + info.cantidad * info.precio, 0);

    let botonesEliminar = document.querySelectorAll(".eliminarProducto")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProducto)
    })
}


//Eliminar Productos del Carrito-------------------------
const eliminarProducto = (e) => {
    let id = e.target.id
    let index = carrito.findIndex(producto => producto.id == id)
    carrito.splice(index, 1)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizar_carrito(carrito)
}

//Usamos API de Clima------------------------------------
let clima = document.getElementById('clima');

fetch("https://api.openweathermap.org/data/2.5/weather?q=Montevideo&units=metric&appid=841fc363a6457c859cd8bb7432f75fab")
    .then(response => response.json())
    .then(data => {

        let div = document.createElement('div')
        div.className = 'row justify-content-md-center'
        div.innerHTML = `
                        <div class="col">
                        <h1>EL CLIMA EN MONTEVIDEO</h1>
                        </div>
                        <div class="col">
                             <p> Temperatura Actual: <mark>${data.main.temp}</mark></p>
                        </div>
                        <div class="col">
                             <p>Humedad: <mark>${data.main.humidity}</mark></p>
                        </div>
                        <div class="col">
                            <p> Sensación Térmica: <mark>${data.main.feels_like}</mark</p>
                        </div>
                        </div>  `
        clima.appendChild(div)
    })


