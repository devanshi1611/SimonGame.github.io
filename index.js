var buttoncolors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".square").click(function () {
    var userChosencolor = $(this).attr("id");
    userClickedPattern.push(userChosencolor);

    playSound(userChosencolor);
    animatePress(userChosencolor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosencolor = buttoncolors[randomNumber];
    gamePattern.push(randomChosencolor);

    $("#" + randomChosencolor).fadeIn(100).fageOut(100).fadeIn(100);
    playSound(randomChosencolor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        
        $("body").addClass("remove-class");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("remove-class");
        }, 200);

        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}