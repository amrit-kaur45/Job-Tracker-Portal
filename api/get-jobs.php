<?php
ini_set('display_errors', 0);
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "job_portal");
if ($conn->connect_error) {
    echo json_encode([]);
    exit();
}

$result = $conn->query("SELECT * FROM jobs ORDER BY created_at DESC");
$jobs = [];
while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

echo json_encode($jobs);
?>