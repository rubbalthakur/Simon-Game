var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];


var started = false;
var level = 0;

$(document).keypress(function (){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})

//adding eventListener for button clicks
$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

//function to check whether user is following correct sequence
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){nextSequence();},1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function (){$("body").removeClass("game-over")}, 200);
        startOver();
    }
}

//function to increase level and add a press in gamePattern
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

//function to play sounds
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//function to animate pressed buttons
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed")}, 100)
}

//resetting values after game is over
function startOver(){
    gamePattern=[];
    level=0;
    started= false;
}