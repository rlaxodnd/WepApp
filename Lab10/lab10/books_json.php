<?php
$BOOKS_FILE = "books.txt";

function filter_chars($str) {
	return preg_replace("/[^A-Za-z0-9_]*/", "", $str);
}

if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] != "GET") {
	header("HTTP/1.1 400 Invalid Request");
	die("ERROR 400: Invalid request - This service accepts only GET requests.");
}

$category = "";
$delay = 0;

if (isset($_REQUEST["category"])) {
	$category = filter_chars($_REQUEST["category"]);
}
if (isset($_REQUEST["delay"])) {
	$delay = max(0, min(60, (int) filter_chars($_REQUEST["delay"])));
}

if ($delay > 0) {
	sleep($delay);
}

if (!file_exists($BOOKS_FILE)) {
	header("HTTP/1.1 500 Server Error");
	die("ERROR 500: Server error - Unable to read input file: $BOOKS_FILE");
}

header("Content-type: application/json");



$lines = file($BOOKS_FILE, FILE_IGNORE_NEW_LINES);
$datas = array();

for($i = 0; $i < count($lines); $i++){
	$book_title; $book_author; $book_category; $book_year; $book_price;
	list($book_title, $book_author, $book_category, $book_year, $book_price) = explode("|", $lines[$i]);

	if($book_category === $category)
	{
		$data = array();
		$data["category"] = $book_category;
		$data["title"] = $book_title;
		$data["author"] = $book_author;
		$data["year"] = $book_year;
		$data["price"] = $book_price;
		
		$datas["books"][] = $data;
	}
}

print json_encode($datas);

?>