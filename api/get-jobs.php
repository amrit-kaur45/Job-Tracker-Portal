<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require 'config.php';

$result = $conn->query("SELECT * FROM jobs ORDER BY created_at DESC");
$jobs   = [];

while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
}

echo json_encode($jobs);
?>