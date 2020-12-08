let oponent = ["Rock", "Paper", "Scissors"];

let score = 0;

function choiceYourPlayer(obj) {
  console.log(obj.id);
  $(".comparison").css("display", "flex");
  $(".buts").css("display", "none");
  displayCompMove(obj.id);
}

function displayCompMove(player) {
  let comp = oponent[Math.floor(Math.random() * oponent.length)];
  $(`#player-${player}`).css("display", "flex");
  setTimeout(function () {
    $(`#comp-${comp}`).css("display", "flex");
    if (player == comp) {
      $("#wins").html("IT IS DRAW");
    }
    if (player == "Rock" && comp == "Scissors") {
      $("#wins").html("YOU WIN");
      ++score;
    }
    if (player == "Scissors" && comp == "Paper") {
      $("#wins").html("YOU WIN");
      ++score;
    }
    if (player == "Paper" && comp == "Rock") {
      $("#wins").html("YOU WIN");
      ++score;
    }
    if (player == "Rock" && comp == "Paper") {
      $("#wins").html("YOU LOSE");
    }
    if (player == "Paper" && comp == "Scissors") {
      $("#wins").html("YOU LOSE");
    }
    if (player == "Scissors" && comp == "Rock") {
      $("#wins").html("YOU LOSE");
    }
  }, 500);
  displayAgain();
}

function displayAgain() {
  setTimeout(function () {
    $(".again").css("display", "flex");
  }, 1000);
}

function again() {
  $("#player-Rock").css("display", "none");
  $("#player-Paper").css("display", "none");
  $("#player-Scissors").css("display", "none");

  $("#comp-Rock").css("display", "none");
  $("#comp-Paper").css("display", "none");
  $("#comp-Scissors").css("display", "none");

  $("#wins").html("");
  $(".comparison").css("display", "none");
  $(".buts").css("display", "flex");
  $("#result").html(`${score}`);
  $(".again").css("display", "none");
}

function openRules() {
  $(".rules-div").css("display", "flex");
  $(".title").css("opacity", "0.3");
  $(".buts").css("opacity", "0.3");
  $(".comparison").css("opacity", "0.3");
 
}
function closeRules() {
  $(".rules-div").css("display", "none");
  $(".title").css("opacity", "1");
  $(".buts").css("opacity", "1");
  $(".comparison").css("opacity", "1");
}
