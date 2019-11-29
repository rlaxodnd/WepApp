"use strict";


var loser = null; 
var playing = false;

window.onload = function() {
    var boundaries = $$(".boundary");
    for(var i = 0; i < boundaries.length; i++)
    {
        boundaries[i].observe("mouseover", overBoundary);
    }
    $("end").observe("mouseover", overEnd);
    $("start").observe("click", startClick);
    $("start").observe("mouseout", overBody);        
};

function overBoundary(event) {
    if(playing === false) 
    {
        return;
    }

    if(loser === null)
    {
        loser = true;
        $("status").textContent = "You lose! :(";
        var boundaries = $$("#maze .boundary");
        for(var i = 0; i < boundaries.length; i++)
        {
            boundaries[i].addClassName("youlose");
        }
    }

    playing = false;
}

function startClick() {
    playing = true;

    loser = null;
    var boundaries = $$(".boundary");
    for(var i = 0; i < boundaries.length; i++)
    {
        boundaries[i].removeClassName("youlose");
    }
    $("status").textContent = "Click the \"S\" to begin.";
}

function overEnd() {
    if(playing === false) 
    {
        return;
    }

    if(loser === null)
    {
        loser = false;
        $("status").textContent = "You win! :)";
    }

    playing = false;
}


function overBody(event) {
    if(event.offsetX < 0)
    {
        overBoundary();        
    }
}



