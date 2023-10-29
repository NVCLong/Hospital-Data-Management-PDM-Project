
<?php
//
include "db_connector.php";
// get keyword input
$new_question = $_GET["newjoke"];
$new_answer = $_GET["newanswer"];

$new_question = addslashes($new_question);
$new_answer = addslashes($new_answer);

  echo"<h2> New Joke: ". $new_question ."</h2>";
  echo"<h2> New answer: ". $new_answer ."</h2>";
  // Select data from a table
  $sql = "INSERT INTO test.jokes_table (JokeID, Joke_quest, Joke_answer) VALUES (NULL, '.$new_question.','.$new_answer.')"; 
  // You can change the table name and the columns you want to select
  $result = $conn->query($sql)
  or
  die("Error description: " . mysqli_error($conn))
  ;
  
  include "db-select.php";

?>

<body>
<form class="form-horizontal" action="index.php">
<fieldset>

<!-- Form Name -->
<legend>Return</legend>

<!-- Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for="Return">Return Main Page</label>
  <div class="col-md-4">
    <button id="Return" name="Return" class="btn btn-primary">Return</button>
  </div>
</div>

</fieldset>
</form>

<!-- <a href="index.php"> Return to main page </a> -->
</body>