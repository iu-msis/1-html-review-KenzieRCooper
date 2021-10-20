<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM books';
$vars = [];

if (isset($_GET['author'])) {
//   // This is an example of a parameterized query: basically change this too books and authors probably
 $sql = 'SELECT * FROM books WHERE authorId = ?';
  $vars = [ $_GET['author'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$books = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($books, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;

//copy and paste it back for books and then change offers to books 