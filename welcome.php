<html>
<head>
<link rel="stylesheet" type="text/css" href="css/leaderboardStyle.css">
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="css/myStyle.css">
</head>
<body>

<!-- Checking name, email,level -->
Welcome <?php echo $_POST["name"]; ?><br>
Your email address is: <?php echo $_POST["email"]; ?><br>
Your level achieved: <?php echo $_POST["level"]; ?><br>

<!--STARTING PHP TAG -->
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
$sql = "CREATE TABLE IF NOT EXISTS LeaderBoard (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
level VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP
)";




//leaderboard_table check
if ($conn->query($sql) === TRUE) {
    echo "Connected to LeaderBoard Successfully..... <br>";
} else {
    echo "Error creating table: " . $conn->error;
}
$datetime = $_POST['date'] . ' ' . $_POST['time'] . ':00';

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
	echo'<div class="container table-responsive">';
	echo'<div class="row">';
	echo'<h1>LEADERBOARD</h1>';
	echo'<table class="table table-bordered">';
	echo'<thead>';
	echo'<tr>';
	echo'<th>Rank</th>';
	echo'<th>Name</th>';
	echo'<th>Level</th>';
	echo'<th>Email</th>';
	echo'<th>Date</th>';
	echo '<th>award1</th>';
	echo '<th>award2</th>';
	echo '<th>award3</th>';
	echo'</tr><br>';
	echo'</thead>';
	echo '<tbody>';
	// output data of each row
    while($row = $result->fetch_assoc()) {
		echo "<tr>";
		echo "<td>"."{$rank}"."</td>";
		echo "<td>".$row["firstname"]."</td>";
		echo "<td>".$row["level"]."</td>";
		echo "<td>".$row["email"]."</td>";
		echo "<td>".$row["reg_date"]."</td>";
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
		echo "</tr>";
		$rank++;
	}
	echo'</tbody>';
	echo'</table>';
	echo'</div>';
	echo'</div>';
} else {
    echo "0 results"; // called if no information in the database.
}

$conn->close(); //end connection
?>
<!--ENDING PHP TAG-->

<div id="buttons">
<button type="button" class="buttons" onclick="window.location.href='start.html'">Main Menu</button>
</div>

</body>
</html>