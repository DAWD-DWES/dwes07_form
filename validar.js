/* document.addEventListener("DOMContentLoaded", function () {
 const registroForm = document.getElementById('registro');
 registroForm.addEventListener("submit", validaForm);
 }); */

document.getElementById('registro').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = this;

    // Verificar la validez del formulario primero
    /*  if (!form.checkValidity()) {
     form.classList.add('was-validated');
     return; // Detener la función si el formulario no es válido
     } */

    // Preparar datos del formulario para enviar
    const formData = new FormData(form);
    formData.append(form.enviar.name, form.enviar.value);
    const xhr = new XMLHttpRequest();

    // Configurar la solicitud
    xhr.open('POST', 'index.php', true);
    xhr.setRequestHeader('Accept', 'application/json'); // Esperamos JSON de vuelta
    xhr.send(formData);

    // Manejar la respuesta
    xhr.onload = function () {
        form.classList.remove('was-validated');
        const response = JSON.parse(xhr.responseText);

        // Ajustar la validación en cada campo específico
        Array.from(form.elements).forEach(input => {
            if (response.errors[input.name]) {
                const feedback = input.nextElementSibling;
                feedback.textContent = response.errors[input.name];
                feedback.style.display = 'block';
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid'); // Añadir is-valid si no hay errores
                if (input.nextElementSibling) {
                    feedback = input.nextElementSibling;
                    feedback.textContent = "";
                }
            }
        });
        if (response.success) {
            Array.from(form.elements).forEach(input => {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                if (input.nextElementSibling) {
                    feedback = input.nextElementSibling;
                    feedback.textContent = "";
                }
            });
            form.classList.add('was-validated');
            // alert('Registro completado con éxito.');
            form.reset();
            form.classList.remove('was-validated');
            // Remover la clase de validación

        }

    };

    /* xhr.onload = function () {
     if (xhr.status >= 200 && xhr.status < 300) {
     // Procesar la respuesta
     const response = JSON.parse(xhr.responseText);
     if (response.success) {
     form.classList.remove('was-validated');
     alert('Registro completado con éxito.');
     form.reset();
     } else {
     form.usuario.classList.remove('is-invalid');
     form.usuario.classList.add('is-valid');
     form.password2.classList.remove('is-invalid');
     form.email.classList.remove('is-invalid');
     
     // Mostrar errores específicos de cada campo
     Object.keys(response.errors).forEach(key => {
     const input = document.getElementById(key);
     const feedback = input.nextElementSibling;
     feedback.textContent = response.errors[key];
     feedback.style.display = 'block';
     form.classList.remove('was-validated');
     input.classList.add('is-invalid');
     });
     }
     } else {
     console.error('Error al procesar la solicitud:', xhr.statusText);
     }
     }; */

    // Manejar errores de red
    xhr.onerror = function () {
        console.error('Error en la red, no se pudo completar la solicitud.');
    };

    // Enviar la solicitud
    xhr.send(formData);
});


function validaForm(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const form = e.target;
    var data = new FormData(e.target);
    data.append(form.enviar.name, form.enviar.value);
    var objXMLHttpRequest = new XMLHttpRequest();
    objXMLHttpRequest.responseType = 'json';
    objXMLHttpRequest.onreadystatechange = function () {
        if (objXMLHttpRequest.readyState === 4) {
            if (objXMLHttpRequest.status === 200) {
                form.usuario.setCustomValidity("");
                form.password1.setCustomValidity("");
                form.password2.setCustomValidity("");
                form.email.setCustomValidity("");
                const response = objXMLHttpRequest.response;
                if (!(response.errorUsuario || response.errorPassword || response.errorEmail)) {
                    e.target.submit();
                } else {
                    if (response.errorUsuario) {
                        form.usuario.setCustomValidity("error");
                    }
                    if (response.errorPassword1) {
                        form.password1.setCustomValidity("error");
                    }
                    if (response.errorPasswords) {
                        form.password2.setCustomValidity("error");
                    }
                    if (response.errorEmail) {
                        form.email.setCustomValidity("error");
                    }
                }
                form.classList.add('was-validated');
            } else {
                alert('Error Message: ' + objXMLHttpRequest.statusText);
            }
        }
    };
    objXMLHttpRequest.open('POST', 'index.php');
    objXMLHttpRequest.send(data);
}
