const formRegistro = document.getElementById('registro');
formRegistro.addEventListener('submit', validaForm);

function validaForm(e) {
    const form = e.target;
    const password1 = form.querySelector('#password1');
    const password2 = form.querySelector('#password2');
    const errorPassword2 = form.querySelector('#password2 ~ .invalid-feedback');

    // Limpiar estado de validación previo
    password2.classList.remove('is-invalid');

    const errPassword = password1.value !== password2.value;
    if (errPassword) {
        // Establece el mensaje de error y evita el envío del formulario
        password2.setCustomValidity("Los passwords introducidos deben de ser iguales");
        password2.classList.add('is-invalid');
        errorPassword2.textContent = password2.validationMessage; // Asegúrate de que el mensaje sea el personalizado
        e.preventDefault();
        e.stopImmediatePropagation();
    } else {
        password2.setCustomValidity("");
    }

    if (!form.checkValidity()) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
    form.classList.add('was-validated');
}

