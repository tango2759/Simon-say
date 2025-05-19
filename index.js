var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern= [];
var level = 0;
var started = false;

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence(){
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    
    
    playSound(randomChosenColour);
}
$('.btn').on('click', function() {
    var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour)

    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

function animatePress(currentColour){
     $("#"+currentColour).addClass("pressed");
     setTimeout(function() {
     $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function checkAnswer(currentLevel){
 if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      
      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        $("h1").text("Game Over, Press Any Key to Restart")
      $("body").addClass("game-over")
        setTimeout(function() {
     $("body" ).removeClass("game-over");
    }, 200);
    startOver();
        
    }
}

function startOver(){
    level = 0;
    gamePattern =[];
    started = false
    userClickedPattern = [];
}