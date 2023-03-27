const formRegistro = document.getElementById('registro');
formRegistro.addEventListener('submit', validaForm);

function validaForm(e) {
    const form = e.target;
    form.usuario.setCustomValidity("");
    form.password1.setCustomValidity("");
    form.email.setCustomValidity("");
    const errPassword = form.password1.value !== form.password2.value;
    if (!form.usuario.validity.valid) {
        form.usuario.setCustomValidity("Debe tener más de tres caracteres.");
        form.usuario.reportValidity();
    }
    if (errPassword) {
        form.password1.setCustomValidity("Deben tener más de 5 caracteres o ser iguales.");
        form.password1.reportValidity();
    }
    if (form.email.validity.valueMissing || form.email.validity.typeMismatch) {
        form.email.setCustomValidity("La dirección de email NO es válida.");
        form.email.reportValidity();
    }
    if (!form.checkValidity() || errPassword) {
        // form es invalido - cancela submit
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}
