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

if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    echo json_encode(["error" => "All fields are required."]);
    exit();
}

$name    = $conn->real_escape_string($data['name']);
$email   = $conn->real_escape_string($data['email']);
$message = $conn->real_escape_string($data['message']);

$insert = $conn->query("INSERT INTO contacts (name, email, message) 
                        VALUES ('$name', '$email', '$message')");

if ($insert) {
    echo json_encode(["success" => "Message sent successfully."]);
} else {
    echo json_encode(["error" => "Failed: " . $conn->error]);
}
?>