$(document).ready(function () {
    $("#registro").submit(validaForm);
});

function validaForm(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const form = e.target;
    $('#mensaje').addClass("d-none");
    $.ajax({
        type: "POST",
        url: 'index.php',
        data: $(this).serialize(),
        context: form,
        dataType: "json",
        success: function (response)
        {
            this.usuario.setCustomValidity("");
            this.password1.setCustomValidity("");
            this.password2.setCustomValidity("");
            this.email.setCustomValidity("");
            if (!(response.errorUsuario || response.errorPassword || response.errorEmail)) {
                $("#mensaje").removeClass("d-none");
            } else {

                if (response.errorUsuario) {
                    this.usuario.setCustomValidity("error");
                }
                if (response.errorPassword) {
                    this.password1.setCustomValidity("error");
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
