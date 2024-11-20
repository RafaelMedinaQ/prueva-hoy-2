<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$host = "sunnylite.com.mx"; // Reemplaza con tu servidor MySQL
$dbname = "sunnylit_pruebasSolecito"; // Reemplaza con el nombre de tu base de datos
$username = "sunnylit_Solecito"; // Reemplaza con tu usuario de la base de datos
$password = "Solecito0811!";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id = $_GET['id'] ?? null;

    if (!$id) {
        echo json_encode(['error' => 'ID no proporcionado']);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM citas WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $cita = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($cita) {
        echo json_encode($cita);
    } else {
        echo json_encode(['error' => 'Cita no encontrada']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al conectar con la base de datos']);
}
?>
