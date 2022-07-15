//VARIABLES GLOBALES:
const contenedor_productos = document.getElementById('contenedor-productos');
const carrito_compras = document.getElementById('carrito-compras');
const precio_total = document.getElementById('precio-total');
const contador_total = document.getElementById('contador-total');
let array_carrito = [];
let carrito_json = [];

// MENU RESPONSIVE CON JAVASCRIPT Y CSS
const botonMenu = document.querySelector('.botonMenu');
const enlaces = document.querySelector('.enlaces-menu');
const barras = document.querySelectorAll('.botonMenu span');

botonMenu.addEventListener('click', () => {
    enlaces.classList.toggle('activado');
    barras.forEach(child => { child.classList.toggle('animado') });
});

//HEADER BACKGROUND AL HACER SCROLL DOWN
jQuery(window).on('scroll', function() {
    if(jQuery(window).scrollTop() > 300) {
        jQuery('#header_frame').css('background-color', '#FFFFFF');
    } else {
       jQuery('#header_frame').css('background-color', '#ddab46');
    }
});

//ARRAY DE PRODUCTOS

const stock_productos = [
    { id: 1, nombre: "Contenedor 120 Lts", img: 'imagenes/contenedor120.jpg', precio: 3100, cantidad: 1, stock: 15, tipo: "contenedores", descrip: "Contenedor de residuos de 120 Lts marca SULO" },

    { id: 2, nombre: "Contenedor 240 Lts", img: 'imagenes/contenedor240.jpg', precio: 4200, cantidad: 1, stock: 15, tipo: "contenedores", descrip: "Contenedor de residuos de 240 Lts marca SULO" },

    { id: 3, nombre: "Contenedor 360 Lts", img: 'imagenes/contenedor360.jpg', precio: 6300, cantidad: 1, stock: 15, tipo: "contenedores", descrip: "Contenedor de residuos de 360 Lts marca SULO" },

    { id: 4, nombre: "Contenedor 770 Lts", img: 'imagenes/contenedor770.jpg', precio: 16800, cantidad: 1, stock: 15, tipo: "contenedores", descrip: "Contenedor de residuos de 770 Lts marca SULO" },

    { id: 5, nombre: "Contenedor 1100 Lts", img: 'imagenes/contenedor1100.jpg', precio: 20100, cantidad: 1, stock: 15, tipo: "contenedores", descrip: "Contenedor de residuos de 1100 Lts marca SULO" },

    { id: 6, nombre: "Papelera Prima Línea 50 Lts", img: 'imagenes/primalinea1.jpg', precio: 7390, cantidad: 1, stock: 15, tipo: "papeleras", descrip: "Papelera para la via urbana de 50 Lts de capacidad" },

    { id: 7, nombre: "Papelera Clásica 50 Lts", img: 'imagenes/papeleraclasica.jpg', precio: 2500, cantidad: 1, stock: 15, tipo: "papeleras", descrip: "Papelera clásica boca de sapo de 50 lts de capacidad" },

    { id: 8, nombre: "Compostador Bulbeo 360 Lts", img: 'imagenes/compostador360.jpg', precio: 6500, cantidad: 1, stock: 15, tipo: "compostadores", descrip: "Compostador Bulbeo de 360 Lts" },

    { id: 9, nombre: "Compostador Bulb eo 700 Lts", img: 'imagenes/compostador700.jpg', precio: 8700, cantidad: 1, stock: 15, tipo: "compostadores", descrip: "Compostador Bulbeo de 700 Lts" },

    { id: 10, nombre: "Tapa Contenedor 120 Lts", img: 'imagenes/tapa120.jpg', precio: 650, cantidad: 1, stock: 15, tipo: "repuestos", descrip: "Tapa para contenedor de 120 Lts" },

    { id: 11, nombre: "Rueda de contenedores", img: 'imagenes/ruedacontenedor.jpg', precio: 400, cantidad: 1, stock: 15, tipo: "repuestos", descrip: "Rueda para contenedores de 120 a 360 Lts" }
];

//Llamamos a la funcion que imprime los productos en pantalla
mostrar_productos(stock_productos);

//<------------------FUNCIONES-------------------->

//Comprobamos si hay elementos en localStorage:
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        array_carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizar_carrito()
    }
})

//Funcion para imprimir los productos en el html:
function mostrar_productos(array) {

    array.forEach(producto => {

        let div = document.createElement('div');
        div.className = 'col'
        div.innerHTML = `<div class="card h-200">
        <img class="img-fluid" src=${producto.img}>
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <ul>
                <li>${producto.descrip}</li>
                <li>$ ${producto.precio}</li>
            </ul>
            <button id="boton${producto.id}" class="btn btn-primary">Comprar</button>
        </div>
    </div>`

        contenedor_productos.appendChild(div);
        //Agregamos el boton comprar y el evento dentro del forEach para que al recorrer el array tambien se identifique al boton por el id de producto
        let btn_agregar = document.getElementById(`boton${producto.id}`)

        btn_agregar.addEventListener('click', () => {
            agregar_carrito(producto.id);//-> Llamamos a la función agregar_carrito y le pasamos el parámetro producto.id

            // TOASTIFY
            Toastify({
                text: "Producto agregado al carrito",
                duration: 3000,
                avatar: 'https://cdn-icons-png.flaticon.com/512/70/70021.png',
                style: {
                    background: "green"
                }
            }).showToast();
        })
    });
};

//Definimos función agregar_carrito encargada de agregar productos al array carrito sin que se repitan
function agregar_carrito(id) {

    let agregar_producto = stock_productos.find(item => item.id == id)
    let existe = array_carrito.some(prod => prod.id === id)

    existe == true ? agregar_producto.cantidad++ : array_carrito.push(agregar_producto); //reducimos un if a la nomenclatura de operador ternario

    actualizar_carrito(agregar_producto);
    localStorage.setItem('carrito', JSON.stringify(array_carrito));

};

//Actualizamos el carrito con los totales e imprimimos los productos en el carrito.
function actualizar_carrito(agregar_producto) {

    contador_total.innerText = array_carrito.length;
    precio_total.innerText = array_carrito.reduce((acc, info) => acc + info.cantidad * info.precio, 0);


    carrito_compras.innerHTML = ""
    array_carrito.forEach(agregar_producto => {
        let li = document.createElement('li')
        li.className = 'carrito-compras'
        li.innerHTML = `
                <li class="list-group-item d-flex justify-content-between">
                 <h6 class="my-0">${agregar_producto.nombre}</h6>
                  <small class="text-muted">${agregar_producto.descrip}</small>
                  <li class="list-group-item d-flex justify-content-between">
                  <span class="text-muted">Cantidad: ${agregar_producto.cantidad}</span>
                   <span class="text-muted">$${agregar_producto.precio}</span>
                   
                   </li>
                   <button id="btn_eliminar${agregar_producto.id}" class="btn btn-danger ml-0">Eliminar</button>
                   </li>
                `
        carrito_compras.appendChild(li);

        let btn_eliminar = document.getElementById(`btn_eliminar${agregar_producto.id}`)

        btn_eliminar.addEventListener('click', () => {
            btn_eliminar.parentElement.remove();
            array_carrito = array_carrito.filter(elemento => elemento.id != agregar_producto.id)
            localStorage.setItem('carrito', JSON.stringify(array_carrito));
            precio_total.innerText = array_carrito.reduce((acc, info) => acc + info.cantidad * info.precio, 0);
        })

    })

}

$(".btn-danger").click(function(){
    $(".btn-danger").hide()
})

let DateTime = luxon.DateTime;

let hoy = DateTime.now()
console.log(hoy);
console.log(hoy.year);
console.log(hoy.month);
console.log(hoy.day);