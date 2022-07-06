//VARIABLES GLOBALES:
const contenedor_productos = document.getElementById('contenedor-productos');
const carrito_compras = document.getElementById('carrito-compras');
const precio_total = document.getElementById('precio-total');
const contador_total = document.getElementById('contador-total');
let array_carrito = [];

// MENU RESPONSIVE CON JAVASCRIPT Y CSS
const botonMenu = document.querySelector('.botonMenu');
const enlaces = document.querySelector('.enlaces-menu');
const barras = document.querySelectorAll('.botonMenu span');

botonMenu.addEventListener('click', () => {
    enlaces.classList.toggle('activado');
    barras.forEach(child => { child.classList.toggle('animado') });
});

//ARRAY DE PRODUCTOS

const stock_productos = [
    {
        id: 1,
        nombre: "Contenedor 120 Lts",
        img: 'imagenes/contenedor120.jpg',
        precio: 3100,
        cantidad: 1,
        stock: 15,
        descrip: "Contenedor de residuos de 120 Lts marca SULO",
    },

    {
        id: 2,
        nombre: "Contenedor 240 Lts",
        img: 'imagenes/contenedor240.jpg',
        precio: 4200,
        cantidad: 1,
        stock: 15,
        descrip: "Contenedor de residuos de 240 Lts marca SULO",
    },

    {
        id: 3,
        nombre: "Contenedor 360 Lts",
        img: 'imagenes/contenedor360.jpg',
        precio: 6300,
        cantidad: 1,
        stock: 15,
        descrip: "Contenedor de residuos de 360 Lts marca SULO"
    },

    {
        id: 4,
        nombre: "Contenedor 770 Lts",
        img: 'imagenes/contenedor770.jpg',
        precio: 16800,
        cantidad: 1,
        stock: 15,
        descrip: "Contenedor de residuos de 770 Lts marca SULO"
    },

    {
        id: 5,
        nombre: "Contenedor 1100 Lts",
        img: 'imagenes/contenedor1100.jpg',
        precio: 20100,
        cantidad: 1,
        stock: 15,
        descrip: "Contenedor de residuos de 1100 Lts marca SULO"
    }
];

//Llamamos a la funcion que imprime los productos en pantalla
mostrar_productos(stock_productos);

//<------------------FUNCIONES-------------------->

//Funcion para imprimir los productos en el html:
function mostrar_productos(array) {

    array.forEach(producto => {

        let div = document.createElement('div');
        div.className = 'col'
        div.innerHTML = `<div class="card " style="width: 18rem;">
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
            agregar_carrito(producto.id);
        })

    });
};






function agregar_carrito(id) {

    let agregar_producto = stock_productos.find(item => item.id == id)
    array_carrito.push(agregar_producto);
    actualizar_carrito();

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
                   <button class="btn btn-danger ml-5">Eliminar</button>
                   </li>
                `
    carrito_compras.appendChild(li);
}

function actualizar_carrito() {

    contador_total.innerText = array_carrito.length
    
    let total = array_carrito.reduce((acumulador, producto) => {
        acumulador + (producto.precio * producto.cantidad)
        return acumulador
    });
    precio_total.innerText = total;
}