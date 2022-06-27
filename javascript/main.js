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

//LOS PRODUCTOS EN PANTALLA

class Producto {
    constructor(id, nombre, precio, cantidad, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.stock = stock;
        this.total = precio * cantidad;
    }

    get_datos() {
        console.log("ID", this.id);
        console.log("Producto", this.nombre);
        console.log("Precio:", this.precio);
        console.log("Cantidad:", this.cantidad);
        console.log("Cantidad:", this.stock);
    }

    get_stock() {
        if (this.stock <= 10) {
            console.log("QUEDA POCO STOCK")
        }
        return this.stock
    }

    venta_stock(cantidad) {
        if (this.stock > this.cantidad) {
            this.stock = this.stock - cantidad;
        } else if (this.stock <= 0) {
            console.log("Producto no disponible");
        }
    }
}

//CREAMOS PRODUCTOS Y ARRAY CARRITO 
let array_carrito = [];
let contenedor120 = new Producto(1, "Contenedor 120 Lts", 3100, 1, 15);
let contenedor240 = new Producto(2, "Contenedor 240 Lts", 4200, 1, 10);
let contenedor360 = new Producto(3, "Contenedor 360 Lts", 6300, 1, 6);



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

//Esto no funciona-------------------------------------------
function calcular_total_120(acu, precio) {
    precio = contenedor120.total
    acu = acu + precio
    return acu
}
function calcular_total_240(acu, precio) {
    precio = contenedor240.total
    acu = acu + precio
    return acu
}
function calcular_total_360(acu, precio) {
    precio = contenedor360.total
    acu = acu + precio
    return acu
}

let venta_total_120 = () => array_carrito.reduce(calcular_total_120, 0);
let venta_total_240 = () => array_carrito.reduce(calcular_total_240, 0);
let venta_total_360 = () => array_carrito.reduce(calcular_total_360, 0);
function venta_total() {
    let resultado = calcular_total_120() + calcular_total_240() + calcular_total_360();
    return resultado
};

//Borrar duplicados en array carrito:

function borrar_duplicado(Producto) {
    let actual = {
        nombre: Producto.nombre,
        cantidad: Producto.cantidad++
    }
    return actual
};

//Agregamos el producto elegido por el usuario al array_carrito
let comprar120 = boton1.addEventListener("click", () => {
    array_carrito.push(contenedor120);
    if (array_carrito.includes(contenedor120)) {
        let nuevo_arreglo = array_carrito.map(borrar_duplicado);
        console.log(nuevo_arreglo);
    }
    console.log(contenedor120.get_datos());
    console.log("el total es de ", venta_total_120());
});

//Agregamos el producto elegido por el usuario al array_carrito
let comprar240 = boton2.addEventListener("click", () => {
    array_carrito.push(contenedor240);
    if (array_carrito.includes(contenedor120)) {
        let nuevo_arreglo = array_carrito.map(borrar_duplicado);
        console.log(nuevo_arreglo);
    }
    console.log(contenedor240.get_datos());
    console.log("el total es de ", venta_total_240());
    console.log(array_carrito);
});

//Agregamos el producto elegido por el usuario al array_carrito
let comprar360 = boton3.addEventListener("click", () => {
    array_carrito.push(contenedor360);
    if (array_carrito.includes(contenedor120)) {
        let nuevo_arreglo = array_carrito.map(borrar_duplicado);
        console.log(nuevo_arreglo);
    }
    console.log(contenedor360.get_datos());
    console.log("el total es de ", venta_total_360());
});

let finalizar_compra = finalizar.addEventListener("click", () => {

    console.log("Productos actualmente en carrito", array_carrito);
    console.log("El total a pagar es de", venta_total()); //ESTO NO FUNCIONA
});

let cancelar_compra = cancelar.addEventListener("click", () => {
    array_carrito = [];
    console.log("Hemos cancelado tu compra.")
});