$(document).ready(function () {
    $('#registro').on('submit', function (e) {
        e.preventDefault();
        var form = this;

        // Usar el método de jQuery para crear el objeto FormData
        var formData = new FormData(form);
        formData.append($(form).find(':submit').attr('name'), $(form).find(':submit').val());

        // Usar jQuery.ajax() para enviar los datos
        $.ajax({
            url: 'index.php',
            type: 'POST',
            data: formData,
            contentType: false, // importante para enviar datos de tipo FormData
            processData: false, // importante para enviar datos de tipo FormData
            dataType: 'json', // Esperamos JSON de vuelta
            success: function (response) {
                $(form).removeClass('was-validated');

                // Ajustar la validación en cada campo específico
                $.each(form.elements, function () {
                    var input = this;
                    var feedback = $(input).next('.invalid-feedback');
                    if (response.errors[input.name]) {
                        $(feedback).text(response.errors[input.name]);
                        $(feedback).show();
                        $(input).addClass('is-invalid').removeClass('is-valid');
                    } else {
                        $(input).removeClass('is-invalid').addClass('is-valid');
                        $(feedback).text('').hide();
                    }
                });

                if (response.success) {
                    // Si quieres hacer algo al tener éxito, como redireccionar o mostrar un mensaje
                    // alert('Registro completado con éxito.');
                    form.submit(); // O puedes redireccionar usando window.location.href a otra URL
                    setTimeout(() => {
                        form.reset(); // Intenta resetear el formulario después de un breve retraso
                    }, 100);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error en la red o en el servidor: ' + textStatus + ', ' + errorThrown);
            }
        });
    });
});


/* $(document).ready(function () {
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
 } */
