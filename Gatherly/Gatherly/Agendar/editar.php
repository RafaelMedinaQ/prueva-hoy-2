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

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['id'], $data['nombre'], $data['apellido'], $data['tipo_evento'], $data['fecha'], $data['hora'])) {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE citas SET nombre = :nombre, apellido = :apellido, tipo_evento = :tipo_evento, fecha = :fecha, hora = :hora WHERE id = :id");
    $stmt->execute([
        ':nombre' => $data['nombre'],
        ':apellido' => $data['apellido'],
        ':tipo_evento' => $data['tipo_evento'],
        ':fecha' => $data['fecha'],
        ':hora' => $data['hora'],
        ':id' => $data['id']
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar la cita']);
}
?>
