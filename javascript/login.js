class Usuario{
    constructor(nombre, apellido, email, nickname, pass1){

        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.nickname = nickname;
        this.password = pass1;
    }
};

let usuario = [];

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
    e.preventDefault(e);
    registrarse(e);
})

function registrarse() {

    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let nickname = document.getElementById("username");
    let email = document.getElementById("email");
    let pass1 = document.getElementById("pass1");
    let pass2 = document.getElementById("pass2");

    if ( pass1.value.length == 0 || pass1.value != pass2.value ) {
        Swal.fire({
            icon: 'error',
            text: "La contraseña y su confirmación no coinciden"})
    }else if (usuario.includes(email)){
        Swal.fire({
            icon: ' error',
            title: 'Oops..',
            text: "El email ya está en uso"
        });
    }else if((nombre.value.length ==0) || (apellido.value.length ==0) || (nickname.value.length ==0) || (email.value.length ==0)) {
        Swal.fire({
            icon:'error',
            text: "Debes ingresar todos los datos"
        });
    }else {
        usuario.push(new Usuario(nombre.value, apellido.value, email.value, nickname.value, pass1.value));
        localStorage.setItem('usuario', JSON.stringify(usuario));
        Swal.fire({
            icon: 'success',
            title: '<strong><u>Bienvenido!</u></strong>',
            html: 'Ve a usar tu código y obtén <b>UN GRAN DESCUENTO</b>, ' +
                  '<a href="index.html">Volver a Inicio</a>' +
                  'CODIGO 494595'
            
          })
    }
}

// REALIZAMOS EL LOGIN DE USUARIO.

let btn_ingreso = document.getElementById("ingresoDeUsuario");
btn_ingreso.addEventListener("click", ingresoDeUsuario);


function ingresoDeUsuario() {
    let userLogin = document.getElementById("user").value;
    let passLogin = document.getElementById("pass").value;
    usuario = JSON.parse(localStorage.getItem('usuario'))

    for(let i=0; i < usuario.length; i++) {
        if (userLogin == usuario[i].nickname && passLogin == usuario[i].pass1) {
            console.log("bienvenido nuevamente " + usuario[i].nombre)
            Swal.fire(
                'Bienvenido!',
                'Nos encanta tenerte de nuevo!',
                'success'
              )
        }
    }Swal.fire(
        'Usuario incorrecto',
        'error'
    )
}