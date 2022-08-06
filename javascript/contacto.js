const imagenContacto1 = document.getElementById('imagen-contacto1');
const imagenContacto2 = document.getElementById('imagen-contacto2');
const imagenContacto3 = document.getElementById('imagen-contacto3');
const imagenContacto4 = document.getElementById('imagen-contacto4');
const opcion1 = document.getElementById('opcion1');
const opcion2 = document.getElementById('opcion2');
const opcion3 = document.getElementById('opcion3');
const opcion4 = document.getElementById('opcion4');

window.addEventListener('DOMContentLoaded', () => {
    imagenContacto1.className = "imagen-contacto";
    imagenContacto2.className = "imagen-contacto-none";
    imagenContacto3.className = "imagen-contacto-none";
    imagenContacto4.className = "imagen-contacto-none";
})

function cambiarImagen(){
    let seleccion = document.getElementById('exampleFormControlSelect1');
    if (seleccion.options[seleccion.selectedIndex].value == opcion1.value) {

        imagenContacto1.className = "imagen-contacto-none";
        imagenContacto2.className = "imagen-contacto";
        imagenContacto3.className = "imagen-contacto-none";
        imagenContacto4.className = "imagen-contacto-none";

    }else if (seleccion.options[seleccion.selectedIndex].value == opcion2.value) {

        imagenContacto1.className = "imagen-contacto-none";
        imagenContacto2.className = "imagen-contacto-none";
        imagenContacto3.className = "imagen-contacto";
        imagenContacto4.className = "imagen-contacto-none";

    }else if (seleccion.options[seleccion.selectedIndex].value == opcion3.value) {

        imagenContacto1.className = "imagen-contacto-none";
        imagenContacto2.className = "imagen-contacto-none";
        imagenContacto3.className = "imagen-contacto-none";
        imagenContacto4.className = "imagen-contacto";

    }else {

        imagenContacto1.className = "imagen-contacto";
        imagenContacto2.className = "imagen-contacto-none";
        imagenContacto3.className = "imagen-contacto-none";
        imagenContacto4.className = "imagen-contacto-none";
    };
}

//Envío de mensaje.

const btn_enviar = document.getElementById('boton-enviar');
btn_enviar.addEventListener('click', () => {
    let mensaje = document.getElementById('exampleFormControlTextarea1');
    if (mensaje.value != 0) {
    Swal.fire('Mensaje enviado!')
    mensaje.value = "";
    }else {
        Toastify({
            duration: 1000,
            text: "ERROR. Escribe un mensaje",
            style: {
            background: "red",
            }
        }).showToast();
    }
    
})



