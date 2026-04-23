<?php
require 'config.php';

$users        = $conn->query("SELECT COUNT(*) as count FROM users")->fetch_assoc()['count'];
$jobs         = $conn->query("SELECT COUNT(*) as count FROM jobs")->fetch_assoc()['count'];
$applications = $conn->query("SELECT COUNT(*) as count FROM applications")->fetch_assoc()['count'];
$contacts     = $conn->query("SELECT COUNT(*) as count FROM contacts")->fetch_assoc()['count'];

echo json_encode([
    "users"        => $users,
    "jobs"         => $jobs,
    "applications" => $applications,
    "contacts"     => $contacts
]);
?>