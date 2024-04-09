document.addEventListener("DOMContentLoaded", function () {
    const formRegistro = document.getElementById('registro');
    formRegistro.addEventListener('submit', validaForm);

    // Agregar validación en tiempo real para cada campo de entrada
    Array.from(formRegistro.elements).forEach(input => {
        if (['email', 'usuario', 'password1', 'password2'].includes(input.name)) {
            input.addEventListener('input', function (e) {
                // Limpiar validación personalizada previa
                input.setCustomValidity("");
                input.reportValidity();
                // Realizar validación específica del campo
               //  validaCampo(input);
                // Puedes optar por llamar a reportValidity aquí si quieres mostrar mensajes de error inmediatamente
                // input.reportValidity();
            });
        }
    });
});

function validaForm(e) {
    const form = e.target;
    form.email.setCustomValidity("");
    form.usuario.setCustomValidity("");
    form.password1.setCustomValidity("");
    form.password2.setCustomValidity("");

    if (!form.usuario.validity.valid) {
        form.usuario.setCustomValidity("El nombre de estar formado por al menos 3 caracteres de palabra");
    }
    if (!form.email.validity.valid) {
        form.email.setCustomValidity("El correo debe tener un formato correcto");
    }
    let errPasswordNoRepetido = form.password1.value !== form.password2.value;
    if (errPasswordNoRepetido) {
        form.password1.setCustomValidity("Los passwords introducidos deben de ser iguales");
    } else {
        if (!form.password2.validity.valid) {
            form.password2.setCustomValidity("El password debe tener una minúscula, mayúscula, digito y caracter espercial");
        }
        if (!form.password1.validity.valid) {
            form.password1.setCustomValidity("El password debe tener una minúscula, mayúscula, digito y caracter espercial");
        }
    }
    if (!form.checkValidity()) {
        form.reportValidity();
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}
