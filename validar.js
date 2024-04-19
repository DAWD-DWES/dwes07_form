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
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error en la red o en el servidor: ' + textStatus + ', ' + errorThrown);
            }
        });
    });
});
