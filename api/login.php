<?php
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require 'config.php';

$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) { echo json_encode(["error" => "No data received."]); exit(); }
if (empty($data['email']) || empty($data['password'])) {
    echo json_encode(["error" => "All fields are required."]); exit();
}

$email  = $conn->real_escape_string($data['email']);
$result = $conn->query("SELECT * FROM users WHERE email='$email'");
$user   = $result->fetch_assoc();

if ($user && password_verify($data['password'], $user['password'])) {
    echo json_encode(["success" => true, "name" => $user['name'], "email" => $user['email']]);
} else {
    echo json_encode(["error" => "Invalid email or password."]);
}
?>