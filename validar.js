const formRegistro = document.getElementById('registro');
formRegistro.addEventListener('submit', validaForm);

function validaForm(e) {
    const form = e.target;
    const errPassword = form.password1.value !== form.password2.value;
    if (errPassword) {
        form.password1.setCustomValidity("error");
        form.password2.setCustomValidity("error");
    } else {
        form.password1.setCustomValidity("");
        form.password2.setCustomValidity("");
    }
    if (!form.checkValidity() || errPassword) {
        // form es invalido - cancela submit
        e.preventDefault();
        e.stopImmediatePropagation();
    }
    form.classList.add('was-validated');
}
