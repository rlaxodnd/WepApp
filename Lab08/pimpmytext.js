"use strict";

window.onload = function() {
    document.getElementById("pimpin").onclick = biggerCover;
    document.getElementById("checkBox").onchange = bling;
    document.getElementById("snoopify").onclick = snoopify;
    document.getElementById("igpay").onclick = igpay;
    document.getElementById("malkovitch").onclick = malkovitch;
};

function biggerCover(){
    setInterval(bigger, 500);
}

function bigger(){
    var textArea = document.getElementById("textArea");

    var size = parseInt(textArea.style.fontSize);

    if(isNaN(size))
    {
        textArea.style.fontSize = "12pt";
    }
    else
    {
        size += 2;
        textArea.style.fontSize = size + "pt";
    }
}

function bling(){
    var checkBox = document.getElementById("checkBox");
    var textArea = document.getElementById("textArea");

    if(checkBox.checked)
    {
        textArea.style.fontWeight = "bold";
        textArea.style.color = "green";
        textArea.style.textDecoration = "underline";
        document.body.style.backgroundImage = "url('http://selab.hanyang.ac.kr/courses/cse326/2017/labs/images/8/hundred.jpg')";    
    }
    else
    {
        textArea.style.fontWeight = "normal";
        textArea.style.color = "initial";
        textArea.style.textDecoration = "initial";
        document.body.style.backgroundImage = "initial";  
    }
}

function snoopify(){
    var textArea = document.getElementById("textArea");

    var upper = textArea.value.toUpperCase();
    var sentences = upper.split(".");
    var izzledSentences = sentences.join("-izzle.");

    textArea.value = izzledSentences;
}

function igpay() {
    var textArea = document.getElementById("textArea");

    var words = textArea.value.split(" ");
    var changed = [];

    for(var i = 0; i < words.length; i++)
    {
        changed.push(igpayWord(words[i]));
    }

    textArea.value = changed.join(" ");
}

function igpayWord(word){
    var changedWord = word;
    if(checkCon(word.charAt(0)))
    {
        for(var i = 0; i < changedWord.length; i++)
        {
            if( checkCon(changedWord.charAt(0)) )
            {
                changedWord = changedWord.substring(1, changedWord.length) + changedWord.charAt(0);         
            }
            else
            {
                break;                
            }
        }
        changedWord += "ay";
    }
    else
    {
        changedWord = word + "ay";
    }

    return changedWord;
}

function checkCon(ch){
    if(ch == "a" || ch == "e" || ch == "i" || ch == "o" || ch == "u" ||
        ch == "A" || ch == "E" || ch == "I" || ch == "O" || ch == "U" )
    {
        return false;
    }
    else
    {
        return true;
    }
}

function malkovitch() {
    var textArea = document.getElementById("textArea");

    textArea.value = malkovitchWord(textArea.value);
}

function malkovitchWord(word){
    if(word.length >= 5)
    {
        return "Malkovitch";        
    }
    else
    {
        return word;        
    }
}