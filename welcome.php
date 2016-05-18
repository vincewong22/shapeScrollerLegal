<html>
<body>

Welcome <?php echo $_POST["name"]; ?><br>
Your email address is: <?php echo $_POST["email"]; ?>

<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'gofiuawo_vince';

/*** mysql password ***/
$password = '101010';

$dbname = "gofiuawo_leaderboard";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// sql to create table
/* $sql = "CREATE TABLE IF NOT EXISTS MyGuests (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP
)"; */

//create leaderboard_table
$sql = "CREATE TABLE IF NOT EXISTS LeaderBoard (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
level VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP
)";

/* if ($conn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}
 $sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('" . $_POST['name'] . "', 'Doe', '" . $_POST['email'] . "');";


if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
} 

$sql = "SELECT id, firstname, lastname FROM MyGuests";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    }
} else {
    echo "0 results";
} */

//leaderboard_table
if ($conn->query($sql) === TRUE) {
    echo "Table LeaderBoard created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}
$datetime = $_POST['date'] . ' ' . $_POST['time'] . ':00';

 $sql = "INSERT INTO LeaderBoard (firstname, lastname,email)
VALUES ('" . $_POST['name'] . "', 'Doe', '" . $_POST['email'] . "');";


if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
} 

$sql = "SELECT id, firstname, email FROM LeaderBoard";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["email"]. "<br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?>



</body>
</html>