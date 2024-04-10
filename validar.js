document.addEventListener("DOMContentLoaded", function () {
    const formRegistro = document.getElementById('registro');
    formRegistro.addEventListener("submit", (event) => {
        const allValid = formRegistro.checkValidity();
        if (!allValid) {
            event.preventDefault();
        }
    });
    const fields = Array.from(formRegistro.elements);
    fields.forEach((field) => {
        field.addEventListener("invalid", () => {
            console.log(field.validity);
        });
    });
    fields.forEach((field) => {
        const errorBox = document.getElementById(field.id + "Error");

        field.addEventListener("invalid", (event) => {
            let message = "";
            if (field.id === "usuario" && (field.validity.valueMissing || field.validity.patternMismatch)) {
                message = "El nombre debe estar formado por al menos 3 caracteres de palabra.";
            } else if (field.type === 'password' && (field.validity.valueMissing || field.validity.patternMismatch)) {
                message = "El password debe tener una minúscula, mayúscula, digito y caracter especial";
            } else if (field.id === "email" && (field.validity.valueMissing || field.validity.patternMismatch)) {
                message = "El correo debe tener un formato correcto";
            }
            field.setCustomValidity(message);
            errorBox.textContent = message; // Mostrar el mensaje de error personalizado
        });

        field.addEventListener("input", () => {
            field.setCustomValidity(""); // Limpiar el mensaje de error personalizado
            errorBox.textContent = ""; // Limpiar el texto del error
        });
    });
});