<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "job_portal");
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed."]);
    exit();
}

$name   = isset($_POST['name'])   ? $conn->real_escape_string($_POST['name'])   : '';
$email  = isset($_POST['email'])  ? $conn->real_escape_string($_POST['email'])  : '';
$phone  = isset($_POST['phone'])  ? $conn->real_escape_string($_POST['phone'])  : '';
$job_id = isset($_POST['job_id']) ? $conn->real_escape_string($_POST['job_id']) : '0';

if (empty($name) || empty($email) || empty($phone)) {
    echo json_encode(["error" => "All fields are required."]);
    exit();
}

// Check if job_id exists in jobs table, if not set to NULL
$check = $conn->query("SELECT id FROM jobs WHERE id='$job_id'");
$final_job_id = ($check && $check->num_rows > 0) ? "'$job_id'" : "NULL";

$insert = $conn->query("INSERT INTO applications (job_id, name, email, phone, resume) VALUES ($final_job_id,'$name','$email','$phone','')");
if ($insert) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed: " . $conn->error]);
}
?>