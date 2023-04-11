<?php

// El campo nombre debe tener más de 3 caracteres
function esValidoNombre(string $nombre): bool {
    return (strlen($nombre) > 3);
}

// El campo correo debe tener el formato adecuado
function esValidoEmail(string $email): bool {
    return preg_match("/^[a-z0-9]+([_\\.-][a-z0-9]+)*@([a-z0-9]+([\.-][a-z0-9]+)*)+\\.[a-z]{2,}$/i", $email);
}

// Las contraseñas deben de  coincidir
function esValidoPasswords(string $pass1, string $pass2): bool {
    return ($pass1 == $pass2) && (strlen($pass1) > 5);
}

if (!empty($_POST)) {
    $usuario = filter_input(INPUT_POST, 'usuario', FILTER_UNSAFE_RAW);
    $errorUsuario = !esValidoNombre($usuario);
    $password1 = filter_input(INPUT_POST, 'password1', FILTER_UNSAFE_RAW);
    $password2 = filter_input(INPUT_POST, 'password2', FILTER_UNSAFE_RAW);
    $errorPasswords = !esValidoPasswords($password1, $password2);
    $email = filter_input(INPUT_POST, 'email', FILTER_UNSAFE_RAW);
    $errorEmail = !esValidoEmail($email);
}
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Bootstrap CDN -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <!-- Bootstrap Font Icon CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
        <title>Registro</title>
    </head>
    <body class="bg-info">
        <div class="container mt-5">
            <div class="alert alert-success d-none" id="mensaje" role="alert">
                Registro realizado con éxito
            </div>
            <div class="d-flex justify-content-center h-100">
                <div class="card w-50">
                    <div class="card-header">
                        <h3><i class="bi bi-gear p-2"></i>Registro</h3>
                    </div>
                    <div class="card-body">
                        <form id="registro" name="registro" action="index.php" method="POST" novalidate>
                            <div class="input-group my-2">
                                <span class="input-group-text"><i class="bi bi-person"></i></span>
                                <input type="text" class="form-control <?= isset($errorUsuario) ? ($errorUsuario ? "is-invalid" : "is-valid") : "" ?>"  placeholder="usuario" 
                                       id="usuario" name="usuario" value="<?= $usuario ?? '' ?>" autofocus>
                                <div class="invalid-feedback">
                                    Debe tener más de tres caracteres.
                                </div>
                            </div>
                            <div class="input-group my-2">
                                <span class="input-group-text"><i class="bi bi-key"></i></span>
                                <input type="password" class="form-control" placeholder="contraseña" id="password1" name="password1">
                            </div>
                            <div class="input-group my-2">
                                <span class="input-group-text"><i class="bi bi-key"></i></span>
                                <input type="password" class="form-control <?= isset($errorPasswords) ? ($errorPasswords ? "is-invalid" : "is-valid") : "" ?>"  
                                       placeholder="Repita la contraseña" id="password2" name="password2">
                                <div class="invalid-feedback">
                                    Deben tener más de 5 caracteres o ser iguales.
                                </div>
                            </div>
                            <div class="input-group my-2">
                                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                                <input type="email" class="form-control <?= isset($errorEmail) ? ($errorEmail ? "is-invalid" : "is-valid") : "" ?>" 
                                       placeholder="e-Mail" name="email" id="email" value="<?= $email ?? '' ?>"> 
                                <div class="invalid-feedback">
                                    La dirección de email NO es válida.
                                </div>
                            </div>
                            <div class="text-end">
                                <input type="submit" value="Registrar" class="btn btn-info" name="enviar">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </body>
</html>