<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body>
	welcome to websever

<?php
include "db_connector.php";

// include "db-select.php";
// include "db_searching.php";
?>
<div>
//searching
<form class="form-horizontal" action="db_searching.php">
<fieldset>
<!-- Form Name -->
<legend>Search data in DB</legend>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="Keyword">Search Input</label>  
  <div class="col-md-5">
  <input id="Keyword" name="keyword" type="text" placeholder="e.g handsome" class="form-control input-md" required="">
  <span class="help-block">Enter a word</span>  
  </div>
</div>

<!-- Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for="Submit">Single Button</label>
  <div class="col-md-4">
    <button id="Submit" name="Submit" class="btn btn-primary">Search</button>
  </div>
</div>

</fieldset>
</form>

<br>

//new joke
<form class="form-horizontal" action="add_data.php">
<fieldset>

<!-- Form Name -->
<legend>Add data</legend>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="New Joke">Text Input</label>  
  <div class="col-md-4">
  <input id="New Joke" name="newjoke" type="text" placeholder="New joke" class="form-control input-md">
  <span class="help-block">Input new question</span>  
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="New answer">Text Input</label>  
  <div class="col-md-4">
  <input id="New answer" name="newanswer" type="text" placeholder="New answer" class="form-control input-md">
  <span class="help-block">Input punchline for this question</span>  
  </div>
</div>

<!-- Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for="singlebutton">Submit</label>
  <div class="col-md-4">
    <button id="singlebutton" name="singlebutton" class="btn btn-primary">Add a new joke</button>
  </div>
</div>

</fieldset>
</form>
</div>



<?php
// Close the connection when done

$conn->close();
?>


</body>
</html>

<!-- Note:
Chi de y den phan php thoi phan html de do de xay dung trang web demo
-->