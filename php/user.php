<?php
    include 'conn.php';
    $email = $_POST['email'];
    $password = $_POST['pass'];
    $sql = "SELECT * FROM usuarios WHERE email = '$email' AND pass = '$password'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        header('Location: ../html/dashboard.html');
        exit();
    } else {
        session_start();
        $_SESSION['mensaje'] = "Correo o contraseña inconrrecta";
        header('Location: ../index.php');
        exit();
    }
    $conn->close();
?>
