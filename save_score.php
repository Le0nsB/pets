<?php
// save_score.php

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "spele";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name']; // Get the user's name
    $time = $_POST['time']; // Get the user's time

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO rekords (name, time) VALUES (?, ?)");
    $stmt->bind_param("si", $name, $time); // "si" means string and integer

    // Execute the query
    if ($stmt->execute()) {
        echo "New record created successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
