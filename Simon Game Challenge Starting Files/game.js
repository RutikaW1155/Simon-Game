// ori
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0 ;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    palySound(userChosenColour);
    animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
    
    if(userClickedPattern.length === gamePattern.length){

        setTimeout(function(){
            nextSequence();
        },1000);
    }
    }else{

        palySound("wrong");
        $("body").addClass("game-over");

            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
    }

}


function nextSequence(){
     
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
   //$(this).text(randomNumber);
  // return randomNumber;
var randomChosenColour = buttonColours[randomNumber];
//console.log(randomChosenColour);
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
palySound(randomChosenColour);

}

function palySound(name){ 
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour){
     //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().

    $("#"+currentColour).addClass("pressed");
     //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startover(){
     gamePattern = [];    
     started = false;   
    level = 0 ;
}