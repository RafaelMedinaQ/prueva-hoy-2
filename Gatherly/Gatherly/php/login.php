<?php
require_once 'conexion.php';

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars(trim($_POST['nombre']));
    $contra = htmlspecialchars(trim($_POST['contra']));

    // Preparar la consulta para obtener el usuario
    if ($stmt = $conn->prepare("SELECT contra FROM usuarios WHERE nombre = ?")) {
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $stmt->store_result();

        // Verificar si se encontró el usuario
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($hashed_password);
            $stmt->fetch();

            // Verificar la contraseña
            if (password_verify($contra, $hashed_password)) {
                echo  "<script>
                location.href = '../Agendar/motrar.html';

            </script>";
            } else {
                echo "Contraseña incorrecta.";
            }
        } else {
            echo "No se encontró el usuario.";
        }

        $stmt->close();
    } else {
        echo "Error al preparar la consulta: " . $conn->error;
    }

    $conn->close();
}
?>
