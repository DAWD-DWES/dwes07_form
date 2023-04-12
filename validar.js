document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById('registro');
    registroForm.addEventListener("submit", validaForm);
});

function validaForm(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const form = e.target;
    var data = new FormData(e.target);
    document.getElementById('mensaje').classList.add("d-none");
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
                   // document.getElementById('mensaje').classList.remove("d-none");
                } else {
                    if (response.errorUsuario) {
                        form.usuario.setCustomValidity("error");
                    }
                    if (response.errorPassword) {
                        form.password1.setCustomValidity("error");
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
