<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require 'config.php';

$name   = $conn->real_escape_string($_POST['name'] ?? '');
$email  = $conn->real_escape_string($_POST['email'] ?? '');
$phone  = $conn->real_escape_string($_POST['phone'] ?? '');
$job_id = $conn->real_escape_string($_POST['job_id'] ?? '0');
$resume = '';

if (empty($name) || empty($email) || empty($phone)) {
    echo json_encode(["error" => "All fields are required."]);
    exit();
}

if (!empty($_FILES['resume']['name'])) {
    $uploadDir = '../uploads/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
    $filename = time() . '_' . basename($_FILES['resume']['name']);
    move_uploaded_file($_FILES['resume']['tmp_name'], $uploadDir . $filename);
    $resume = $filename;
}

$insert = $conn->query("INSERT INTO applications (job_id, name, email, phone, resume)
                        VALUES ('$job_id','$name','$email','$phone','$resume')");

if ($insert) {
    echo json_encode(["success" => "Application submitted successfully."]);
} else {
    echo json_encode(["error" => "Failed: " . $conn->error]);
}
?>