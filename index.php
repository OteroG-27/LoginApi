<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/bootstrap/bootstrap.min.css">
    <title>Login</title>
</head>
<body>
    <main class="container-fluid d-flex align-items-center">
        <section class="container mt-5 d-flex justify-content-center loginContainer">
            <form action="./php/user.php" method="POST" class="form-login card-style">
                <h1>Login</h1>
                <div class="mb-3">
                  <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Email" autocomplete="off">
                </div>
                <div class="mb-3">
                  <input type="password" class="form-control" id="exampleInputPassword1" name="pass" placeholder="Password" autocomplete="off">
                </div>
                <?php
                  session_start();
                  if (isset($_SESSION['mensaje'])) {
                      echo "
                      <div class='alert alert-danger' role='alert'>{$_SESSION['mensaje']}</div>";
                      unset($_SESSION['mensaje']);
                  }
                ?>
                <button type="submit" class="btn btn-primary">Iniciar</button>
              </form>
        </section>
    </main>
</body>
<script src="./js/script.js"></script>
<script src="./js/bootstrap/bootstrap.bundle.min.js"></script>
</html>