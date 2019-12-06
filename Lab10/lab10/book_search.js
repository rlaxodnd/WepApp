
"use strict";

window.onload = function() {
	Ajax.Responders.register({
		onFailure: ajaxFailed,
		onException: ajaxFailed
	});

    $("b_xml").onclick=function(){
			
			new Ajax.Request("books.php",{
				method: "get",
				parameters: {category: getCheckedRadio($$("#category input"))},
				onSuccess: showBooks_XML
			});
    };
    $("b_json").onclick=function(){
			
			new Ajax.Request("books_json.php",{
				method: "get",
				parameters: {category: getCheckedRadio($$("#category input"))},
				onSuccess: showBooks_JSON
			});
	};
};

function getCheckedRadio(radio_button){
	for (var i = 0; i < radio_button.length; i++) {
		if(radio_button[i].checked){
			return radio_button[i].value;
		}
	}
	return undefined;
}


function showBooks_XML(ajax) {
	
	var searched_books_list = $("books");
	while(searched_books_list.firstChild){
		searched_books_list.removeChild(searched_books_list.firstChild);
	}

	var books = ajax.responseXML.getElementsByTagName("book");

	for(var i = 0; i < books.length; i++){
		var title = books[i].getElementsByTagName("title")[0].firstChild.nodeValue;
		var author = books[i].getElementsByTagName("author")[0].firstChild.nodeValue;
		var year = books[i].getElementsByTagName("year")[0].firstChild.nodeValue;
		
		var searched_book = document.createElement("li");
		searched_book.appendChild(document.createTextNode(title +", by "+ author +" ("+ year +")"));

		searched_books_list.appendChild(searched_book);
	}
}

function showBooks_JSON(ajax) {

	var searched_books_list = $("books");
	while(searched_books_list.firstChild){
		searched_books_list.removeChild(searched_books_list.firstChild);
	}

	var books = JSON.parse(ajax.responseText).books;

	for(var i = 0; i < books.length; i++){
		var title = books[i].title;
		var author = books[i].author;
		var year = books[i].year;
		
		var searched_book = document.createElement("li");
		searched_book.appendChild(document.createTextNode(title +", by "+ author +" ("+ year +")"));

		searched_books_list.appendChild(searched_book);
	}
}

function ajaxFailed(ajax, exception) {
	var errorMessage = "Error making Ajax request:\n\n";
	if (exception) {
		errorMessage += "Exception: " + exception.message;
	} else {
		errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
		                "\n\nServer response text:\n" + ajax.responseText;
	}
	alert(errorMessage);
}