<head>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

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

<body>
<?php
//
include "db_connector.php";

// get keyword input
  // Select data from a table
  $sql = "SELECT * FROM jokes_table"; // You can change the table name and the columns you want to select
  $result = $conn->query($sql);
  ?>
<div id="accordion">
<?php
  // Check if there are any rows returned

  if ($result->num_rows > 0) {
    // Loop through the result set and display the data
    while($row = $result->fetch_assoc()) {
      echo"<h2>Joke ID".$row["JokeID"]."</h2>";
      echo"<h3>Joke question: " . $row["Joke_quest"]." </h3>";
      echo "<div><p> Joke answer: " . $row["Joke_answer"] . "</p></div>";
    }
  } else {
    echo "No results found";
  }


//
?>
</div>

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

<form class="form-horizontal" action="index_update.php">
<fieldset>

<!-- Form Name -->
<legend>Do you want to edit your joke?</legend>

<!-- Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for="Update Infomation">Confirm</label>
  <div class="col-md-4">
    <button id="Update Infomation" name="Update Infomation" class="btn btn-primary">Update</button>
  </div>
</div>

</fieldset>
</form>
</body>