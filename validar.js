$(document).ready(function () {
    $("#registro").submit(validaForm);
});

function validaForm(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const form = e.target;
    $.ajax({
        type: "POST",
        url: 'index.php',
        data: $(this).serialize() + `&${form.enviar.name}=${form.enviar.value}`,
        context: form,
        dataType: "json",
        success: function (response)
        {
            this.usuario.setCustomValidity("");
            this.password1.setCustomValidity("");
            this.password2.setCustomValidity("");
            this.email.setCustomValidity("");
            if (!(response.errorUsuario || response.errorPassword || response.errorEmail)) {
                this.submit();
            } else {

                if (response.errorUsuario) {
                    this.usuario.setCustomValidity("error");
                }
                if (response.errorPassword1) {
                    this.password1.setCustomValidity("error");
                }
                if (response.errorPasswords) {
                    this.password2.setCustomValidity("error");
                }
                if (response.errorEmail) {
                    this.email.setCustomValidity("error");
                }
            }
            form.classList.add('was-validated');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error Message: ' + thrownError);
        }
    });
}
