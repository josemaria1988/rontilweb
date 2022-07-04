// MENU RESPONSIVE CON JAVASCRIPT Y CSS
const botonMenu = document.querySelector('.botonMenu');
const enlaces = document.querySelector('.enlaces-menu');
const barras = document.querySelectorAll('.botonMenu span');

botonMenu.addEventListener('click', () => {
    enlaces.classList.toggle('activado');
    barras.forEach(child => { child.classList.toggle('animado') });
});

//PEDIMOS AL USUARIO SU NOMBRE POR PROMPT
let usuario1 = prompt("Por favor ingresa tu nombre");

//SELECCIONAMOS EL ID PARA MOSTRAR MENSAJE DE BIENVENIDA CON EL NOMBRE DEL USUARIO
function saludar_usuario() {
    let bienvenido = document.getElementById("bienvenido");
    let h1 = document.createElement("h1");
    h1.innerHTML = "BIENVENIDO " + usuario1 + " A MI SIMULADOR INTERACTIVO";
    bienvenido.appendChild(h1);
}

//EJECUTAMOS LA FUNCIONA SALUDAR
saludar_usuario();

//VARIABLES

let array_carrito = [];


//ARRAY DE PRODUCTOS

const producto = [
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

//MOSTRAMOS LOS PRODUCTOS EN PANTALLA:

const card_productos = document.getElementById('card_productos');

producto.forEach(producto => {
    let div = document.createElement('div');
    div.className = 'col'
    div.innerHTML += `<div class="card " style="width: 18rem;">
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


card_productos.appendChild(div);

let btn_agregar = document.getElementById(`boton${producto.id}`);

btn_agregar.addEventListener('click', () => {
    array_carrito.push(producto.id);
    console.log(array_carrito);
    descuento_especial();
    venta_total();
    console.log(venta_total)
    mostrar_carrito();
});

});
    //<------------------FUNCIONES-------------------->

    //Aplicamos descuentos por cantidad
    function descuento_especial(precio, cantidad) {
        let total = precio * cantidad;
        if (cantidad >= 10) {
            return total * 0.85
        } else if (cantidad >= 5) {
            return total * 0.90
        } else if (cantidad >= 1) {
            return total
        }
    };

    //Calculamos el precio total de productos en el array carrito

    function venta_total() {
        let total = 0;
        array_carrito.forEach(producto => {
            total = + producto.precio * producto.cantidad
        }
        )
        return total

    };



// MOSTRAMOS CARRITO DE COMPRAS CON LO ELEGIDO POR EL USUARIO:

const mostrar_carrito = (productoId) => {
    let articulo = array_carrito.find(producto => producto.id == productoId);
    array_carrito.push(articulo);
    let contenedor_carrito = document.getElementById("carrito");
    let article = document.createElement('article');
    article.classList.add('container')
    article.innerHTML += `
                    <ul class="list-group mb-3">
                      <li class="list-group-item d-flex justify-content-between lh-sm">
                                  <div class="row rounded">
                                  <img src=${producto.img} class="rounded float-start w-50">
                                    <p class="my-0">${producto.nombre}</p>
                                    <small class="text-muted">${producto.descrip}</small>
                                  </div>
                                <span class="text-bold">${producto.precio}</span>
                      <button id="eliminar${producto.id}" class="btn-danger">Quitar</button>
                      </li>`;

    contenedor_carrito.appendChild(article);
  };