class Usuario{
    constructor(nombre, apellido, email, pass1){

        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
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

    if (pass1.value != pass2.value) {
        swal("La contraseña y su confirmación no coinciden")
    }else if (usuario.includes(email)){
        swal({
            icon: ' error',
            title: 'Oops..',
            text: "El email ya está en uso"
        });
    }else if((nombre.value ="") || (apellido.value ="") || (nickname.value ="") || (email.value ="")) {
        swal({
            icon:'error',
            text: "Debes ingresar todos los datos"
        });
    }else {
        usuario.push(new Usuario(nombre.value, apellido.value, nickname.value, email.value, pass1.value));
        localStorage.setItem('usuario', JSON.stringify(usuario));
        swal({
            position: 'top-end',
            icon: 'success',
            title: 'Bienvenido!',
            text: 'Código de descuento de Usuario 123987',
            button: "Ok"
          })
    }
}


