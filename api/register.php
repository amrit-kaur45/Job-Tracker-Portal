<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require 'config.php';

$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    echo json_encode(["error" => "No data received."]);
    exit();
}

if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
    echo json_encode(["error" => "All fields are required."]);
    exit();
}

$name     = $conn->real_escape_string($data['name']);
$email    = $conn->real_escape_string($data['email']);
$password = password_hash($data['password'], PASSWORD_BCRYPT);

$check = $conn->query("SELECT id FROM users WHERE email='$email'");
if ($check->num_rows > 0) {
    echo json_encode(["error" => "Email already registered."]);
    exit();
}

$insert = $conn->query("INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')");

if ($insert) {
    echo json_encode(["success" => "Account created successfully."]);
} else {
    echo json_encode(["error" => "DB insert failed: " . $conn->error]);
}
?>