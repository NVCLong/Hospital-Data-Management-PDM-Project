<head>
<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="/resources/demos/style.css">
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  <script>
  $( function() {
    $( "#accordion" ).accordion();
  } );
  </script>
  <style>
    *{
      font-family: Arial,
      Helvetica,
      sans-serrif;
    }
  </style>
</head>

<?php
//
include "db_connector.php";

// get keyword input
$formKeyword = $_GET["keyword"];
  echo"<h2> Show result of ". $formKeyword ."</h2>";
  // Select data from a table
  $sql = "SELECT JokeID, Joke_quest, Joke_answer FROM jokes_table WHERE Joke_quest LIKE '%". $formKeyword ."%'"; // You can change the table name and the columns you want to select
  $result = $conn->query($sql);
  ?>

<div id="accordion">
<?php
  // Check if there are any rows returned
  if ($result->num_rows > 0) {
	// Loop through the result set and display the data
	while($row = $result->fetch_assoc()) {
    echo"<h3>Joke question: " . $row["Joke_quest"]." </h3>";
    echo "<div><p> Joke answer: " . $row["Joke_answer"] . "</p></div>";
	}
  } else {
	echo "No results found";
  }


//
?>
</div>