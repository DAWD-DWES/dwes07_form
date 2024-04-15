document.addEventListener("DOMContentLoaded", function () {
    const formRegistro = document.getElementById('registro');
    // Añade el evento submit al formulario
    formRegistro.addEventListener("submit", (event) => {
        // Luego comprueba la validez general del formulario
        const allValid = formRegistro.checkValidity();
        if (!allValid) {
            event.preventDefault();
        }
        const password1 = document.getElementById('password1');
        const password2 = document.getElementById('password2');
        const passwordErrorBox = document.getElementById('password2Error');

        // Limpia cualquier estado de error previo
        password1.setCustomValidity("");
        password2.setCustomValidity("");

        // Verifica si las contraseñas coinciden
        if (password1.value !== password2.value) {
            password2.setCustomValidity("Los passwords introducidos deben de ser iguales");
            passwordErrorBox.textContent = password2.validationMessage;
            event.preventDefault(); // Previene el envío del formulario
        }
    });

    // Evento invalid y input para otros campos
    const fields = Array.from(formRegistro.elements);
    fields.forEach((field) => {
        const errorBox = document.getElementById(field.id + "Error");
        field.addEventListener("invalid", (event) => {
            let message = "";
            if (field.id === "usuario" && (field.validity.valueMissing || field.validity.tooShort || field.validity.patternMismatch)) {
                message = "El nombre debe estar formado por al menos 3 caracteres de palabra.";
            } else if (field.id === 'password2' && (field.validity.valueMissing || field.validity.patternMismatch)) {
                message = "El password debe tener una minúscula, mayúscula, dígito y caracter especial";
            } else if (field.id === "email" && (field.validity.valueMissing || field.validity.patternMismatch)) {
                message = "El correo debe tener un formato correcto";
            }
            field.setCustomValidity(message);
            errorBox.textContent = message;
        });

        field.addEventListener("input", () => {
            field.setCustomValidity(""); // Limpia el mensaje de error personalizado
            errorBox.textContent = ""; // Limpia el texto del error
        });
    });
});
