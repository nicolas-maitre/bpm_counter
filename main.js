"use strict";
Math.sum = function(){
    var total = 0;
    for(var ind = 0; ind < arguments.length; ind++){
        total += arguments[ind];
    }
    return total;
}
Math.avg = function(){
    var total = Math.sum(...arguments);
    return total/arguments.length;
}

document.addEventListener("DOMContentLoaded", boot);
function boot(){
    document.body.addEventListener("keydown", function(evt){
        if(evt.key == "b") keyDown(evt);
    });
    resetBtn.addEventListener("click", reset);
    
    reset();
}

var lastStamp = false;
var timeArray = [];
function keyDown(evt){
    //start
    if(!lastStamp){
        lastStamp = evt.timeStamp;
        resetBtn.classList.remove("none");
        bpmDisplay.innerText = "0 bpm";
        console.log("start", lastStamp);
        return;
    }
    //new time
    timeArray.push(evt.timeStamp - lastStamp);
    lastStamp = evt.timeStamp;
    //average
    var avg = Math.avg(...timeArray);
    var bpm = (1000/avg) * 60;
    bpmDisplay.innerText = Math.round(bpm) + " bpm";
    bpmDisplayPrecise.innerText = bpm;
}

function reset(evt){
    lastStamp = false;
    timeArray = [];
    bpmDisplay.innerText = "Press b to start counting.";
    bpmDisplayPrecise.innerText = 0;
    resetBtn.classList.add("none");
}