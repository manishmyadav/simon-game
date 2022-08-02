var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0; //Initial Level

var started = false;

$("h1").text("Let's Challenge Your Memory!");

let t1 = setTimeout(function(){
  $("h1").text("Press Any Key to Start...");
  clearTimeout(t1);
}, 2000);

$("html").keydown(function(){
  //Listen to key presses only before the game starts i.e. to start the game
  if (!started){
      updateLevel();
      setTimeout(function(){
        nextSequence();
      }, 2000); //To wait for 2 seconds after the game starts to blink the first pattern

      started = true;
  }
});

 function nextSequence(){
   level++;

   userClickedPattern = [];

   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);

   var randomChosenColorID = "#" + randomChosenColor;
   $(randomChosenColorID).fadeOut(100).fadeIn(100);

   var randomChosenColorSoundName = "sounds/" + randomChosenColor + ".mp3";
   playSound(randomChosenColorSoundName);
 }

var currentColorIndex = 0;

 $(".btn").click(function() {
   //Listen to button clicks only when game is started
   if (started){
     var userChosenColor = this.getAttribute("id");
     userClickedPattern.push(userChosenColor);

     console.log("Current Color Index",currentColorIndex);

     checkAnswer(currentColorIndex);

     console.log("Current Color Index",currentColorIndex);

     console.log(userClickedPattern);
     var userChosenColorSoundName = "sounds/" + userChosenColor + ".mp3";
     playSound(userChosenColorSoundName);
     animatePress(userChosenColor);
   }
 });

 function playSound(name){
   var audio = new Audio(name);
   audio.play();
 }

 function animatePress(currentColor){
  var currentColorID = "#" + currentColor;
  $(currentColorID).addClass("pressed");
  setTimeout(function(){
    $(currentColorID).removeClass("pressed");
  }, 100);
 }

function updateLevel(){
  if (level == 0){
    $("#level-title").text("Replicate the Pattern");
  }
  else{
    $("#level-title").text("Level " + level);
  }
}

function checkAnswer(currentLevel){
  console.log("User Clicked Pattern", userClickedPattern);
  console.log("Game Pattern", gamePattern);
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("Success to match present indexed color");
    currentColorIndex ++;
    if (currentLevel == (gamePattern.length - 1)){
      console.log("Successfully Completed the Pattern");
      currentColorIndex = 0;
      $("#level-title").text("Pattern " + (level-1) + " Completed");
      setTimeout(updateLevel, 2000);
      setTimeout(function(){
        nextSequence();
      }, 3000);
    }

  }
  else{
    console.log("Failed to complete the pattern");
    var wrongSoundName = "sounds/wrong.mp3";
    playSound(wrongSoundName);
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 100);
    startOver();
  }
}

function startOver(){
  currentColorIndex = 0;
  gamePattern = [];
  userClickedPattern = [];
  level = 0; //Initial Level
  $("#level-title").text("Game Over! Press Any Key To Restart...");
  started = false;
}
