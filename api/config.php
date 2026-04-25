<?php
$conn = new mysqli("localhost", "root", "", "job_portal");
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>