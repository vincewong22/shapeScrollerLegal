<html>
<head>
    <link rel="stylesheet" type="text/css" href="css/leaderboardStyle.css">
</head>
<body>

Welcome <?php echo $_POST["name"]; ?><br>
Your email address is: <?php echo $_POST["email"]; ?><br>
Your level achieved: <?php echo $_POST["level"]; ?><br>
Your award1 achieved: <?php echo $_POST["award1"]; ?><br>
Your award2 achieved: <?php echo $_POST["award2"]; ?><br>
Your award3 achieved: <?php echo $_POST["award3"]; ?><br>
<h1>LEADERBOARD</h1>
<?php

/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'gofiuawo_vince';

/*** mysql password ***/
$password = '101010';

$dbname = "gofiuawo_leaderboard";
// Create connection
$conn = new mysqli($hostname, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//create leaderboard_table
$sql = "CREATE TABLE IF NOT EXISTS LeaderBoard2 (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
level VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP,
award1 BOOL,
award2 BOOL,
award3 BOOL
)";


//leaderboard_table
if ($conn->query($sql) === TRUE) {
    echo "Connected to LeaderBoard Successfully..... <br>";
} else {
    echo "Error creating table: " . $conn->error;
}


$sql = "INSERT INTO LeaderBoard2 (firstname, lastname,email,level,award1,award2,award3)
VALUES ('" . $_POST['name'] . "', 'Doe', '" . $_POST['email'] . "','" . $_POST['level'] . "','" . $_POST['award1'] . "','" . $_POST['award2'] . "','" . $_POST['award3'] . "');";


if ($conn->query($sql) === TRUE) {
    echo "New record created successfully..... <br>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$sql = "SELECT id, firstname, email,reg_date,level,award1,award2,award3 
		FROM LeaderBoard2
		ORDER BY level DESC, reg_date DESC
		";
$result = $conn->query($sql);
$rank = 1;

if ($result->num_rows > 0) {
    // output data of each row
    echo '<div id="leaderboard">';
    echo '<table>';
    echo '<tr>';
    echo '<th>Rank</th>';
    echo '<th>Name</th>';
    echo '<th>Level</th>';
    echo '<th>Email</th>';
	echo '<th>Date</th>';
	echo '<th>award1</th>';
	echo '<th>award2</th>';
	echo '<th>award3</th>';
    echo '</tr><br>';
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        //echo "Record No:  " . $row["id"]. " - Name:  " . $row["firstname"]. "- Email:  " . $row["email"]."-Registration Date:  " . $row["reg_date"]. "<br>";
        echo "<td>" . "{$rank}" . "</td>";
        echo "<td>" . $row["firstname"] . "</td>";
        echo "<td>" . $row["level"] . "</td>";
        echo "<td>" . $row["email"] . "</td>";
        echo "<td>" . $row["reg_date"] . "</td>";
		if($row["award1"] ==1)
			echo "<td><img src='images/award1.jpg'></td>";
		else
			echo "<td><img src='images/award1_locked.jpg'></td>";
		
		if($row["award2"] ==1)
			echo "<td><img src='images/award2.jpg'></td>";
		else
			echo "<td><img src='images/award2_locked.jpg'></td>";
		
		if($row["award3"] ==1)
			echo "<td><img src='images/award3.jpg'></td>";
		else
			echo "<td><img src='images/award3_locked.jpg'></td>";
        echo "</tr>";
        $rank++;
    }
    echo '</table>';
    echo '</div>';
} else {
    echo "0 results";
}

$conn->close();
?>


</body>
</html>