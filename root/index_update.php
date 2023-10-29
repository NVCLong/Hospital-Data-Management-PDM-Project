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
//connect to db
<?php
include "db_connector.php";

// include "db-select.php";
// include "db_searching.php";
?>


//update joke
<form class="form-horizontal" action="">
<fieldset>

<!-- Form Name -->
<legend>Form Name</legend>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="input ID">input ID</label>  
  <div class="col-md-4">
  <input id="input ID" name="input ID" type="text" placeholder="ID" class="form-control input-md">
  <span class="help-block">Joke ID</span>  
  </div>
</div>

</fieldset>
</form>
<form class="form-horizontal">
<fieldset>

<!-- Form Name -->
<legend>Update data</legend>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="New Joke">Text Input</label>  
  <div class="col-md-4">
  <input id="New Joke" name="newjoke" type="text" placeholder="New joke" class="form-control input-md">
  <span class="help-block">Update question</span>  
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="New answer">Text Input</label>  
  <div class="col-md-4">
  <input id="New answer" name="newanswer" type="text" placeholder="New answer" class="form-control input-md">
  <span class="help-block">Update your punchline </span>  
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

<?php
// Close the connection when done

$conn->close();
?>
</body>
</html>