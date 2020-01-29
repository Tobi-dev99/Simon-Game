// Assign Variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasStarted = false;
var level = 0;
// Funtions
function nextSequence() {

    userClickedPattern = [];
    var randomNumber = Math.floor((Math.random() * 4));

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // Animate Sequence
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    // Play Sound
    playSound(randomChosenColor);

    // Level Increase
    level++;
    $("h1").text("Level " + level);
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    // Play Sound
    playSound(userChosenColour);
    // Animate click
    animatePress(userChosenColour);
});

function playSound(name) {
    var btnSound = new Audio("sounds/" + name + ".mp3");
    btnSound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("right");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }else{
        console.log("wrong");
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    hasStarted = false;
}

$(document).keypress(function () {
    if (hasStarted === false) {
        nextSequence();
        hasStarted = true;
    }
});

