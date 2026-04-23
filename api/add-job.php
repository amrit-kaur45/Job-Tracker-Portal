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

if (empty($data['title']) || empty($data['company']) || empty($data['location']) || empty($data['description'])) {
    echo json_encode(["error" => "Required fields are missing."]);
    exit();
}

$title       = $conn->real_escape_string($data['title']);
$company     = $conn->real_escape_string($data['company']);
$location    = $conn->real_escape_string($data['location']);
$rate        = $conn->real_escape_string($data['rate'] ?? '');
$hours       = $conn->real_escape_string($data['hours'] ?? '');
$vacancy     = $conn->real_escape_string($data['vacancy'] ?? '1');
$workplace   = $conn->real_escape_string($data['workplace'] ?? '');
$education   = $conn->real_escape_string($data['education'] ?? '');
$experience  = $conn->real_escape_string($data['experience'] ?? '');
$description = $conn->real_escape_string($data['description']);

$insert = $conn->query("INSERT INTO jobs 
    (title, company, location, rate, hours, vacancy, workplace, education, experience, description)
    VALUES 
    ('$title','$company','$location','$rate','$hours','$vacancy','$workplace','$education','$experience','$description')");

if ($insert) {
    echo json_encode(["success" => "Job added successfully."]);
} else {
    echo json_encode(["error" => "Failed: " . $conn->error]);
}
?>