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

header("Content-type: application/xml");


$xmldoc = new DOMDocument();
$books_tag = $xmldoc->createElement("books");
$xmldoc->appendChild($books_tag);

$lines = file($BOOKS_FILE);

for ($i = 0; $i < count($lines); $i++) {
	list($title, $author, $book_category, $year, $price) = explode("|", trim($lines[$i]));

	if ($book_category == $category) {

		$book_tag = $xmldoc->createElement("book");
		$book_tag->setAttribute("category", $book_category);

		$title_tag = $xmldoc->createElement("title");
		$title_tag->appendChild($xmldoc->createTextNode($title));
	
		$author_tag = $xmldoc->createElement("author");
		$author_tag->appendChild($xmldoc->createTextNode($author));

		$year_tag = $xmldoc->createElement("year");
		$year_tag->appendChild($xmldoc->createTextNode($year));

		$price_tag = $xmldoc->createElement("price");
		$price_tag->appendChild($xmldoc->createTextNode($price));
		
		$book_tag->appendChild($title_tag);
		$book_tag->appendChild($author_tag);
		$book_tag->appendChild($year_tag);
		$book_tag->appendChild($price_tag);
		
		$books_tag->appendChild($book_tag);
	}
}

print $xmldoc->saveXML();
?>
