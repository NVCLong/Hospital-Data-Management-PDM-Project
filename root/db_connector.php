
<?php
// Define the connection parameters
$servername = "localhost";
$username = "root";
$password = "usbw";
$database = "test";

// Create a new connection object
$conn = new mysqli($servername, $username, $password, $database);

// Check if the connection is successful
if ($conn->connect_error) {
  // If not, print the error message and exit
  die("Connection failed: " . $conn->connect_error);
}

// If yes, print a success message
echo "Connected successfully" . "<br>";
?>