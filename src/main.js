import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Game} from './dinoipsum.js';

async function dinoWordCall(){
  try{
    let response = await fetch(`http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=1`); 
    let jsonifiedResponse;
    if (response.ok && response.status == 200) {
      jsonifiedResponse = await response.json();
    } else {
      jsonifiedResponse = false;
    }
    return jsonifiedResponse;
  } catch (error) {
    return false;
  }
}

async function getDinoWord() {
  const wordArray = await dinoWordCall(); // blocking // api call
  if(!wordArray) {
    return 'There has been an error processing your request';
  } else {
    return wordArray[0][0];
  }
}

function badGuesses(newGame){
  $("#badGuesses").empty();
  newGame.guessWrong.forEach(element => {
    $("#badGuesses").append(`<li> ${element} </li>`);
  });

  if (newGame.guessWrong.length >= 6){
    $("body").removeClass();
    $("body").addClass("backgroundLose");
    $("#gameBoard").hide();
    $("#gameOver").show();
    $("#revealedAnswer").html(newGame.answer);
  } else if (newGame.guessWrong.length ===5) {
    $("body").removeClass();
    $("body").addClass("background6");
  } else if (newGame.guessWrong.length ===4) {
    $("body").removeClass();
    $("body").addClass("background5");
  } else if (newGame.guessWrong.length ===3) {
    $("body").removeClass();
    $("body").addClass("background4");
  } else if (newGame.guessWrong.length ===2) {
    $("body").removeClass();
    $("body").addClass("background3");
  } else if (newGame.guessWrong.length ===1) {
    $("body").removeClass();
    $("body").addClass("background2");
  }
}

$(document).ready(function () {
  let newGame;
  $('#newGame').click(async function() {
    newGame = new Game((await getDinoWord()).toLowerCase());
    $("#intro").hide();
    $("#hiddenAnswer").html(newGame.answerHidden);
    $("#gameBoard").show();
  });

  $('#guessForm').submit(function(event) {
    event.preventDefault();
    newGame.checkGuess($("#guess").val().toLowerCase());
    $("#hiddenAnswer").html(newGame.answerHidden);
    badGuesses(newGame);
  });

  $('#solveForm').sumbit(function(event) {
    event.preventDefault();
    if (newGame.checkAddSolve($("#solve").val().toLowerCase())){
      $("#revealedAnswer").html(newGame.answer);
      $("#winner").show();
    } else {
      $("#hiddenAnswer").html(newGame.answerHidden);
      badGuesses(newGame);
    }
  });

  $("#startOver1").click(function() {
    location.reload();
  });
  $("#startOver2").click(function() {
    location.reload();
  });
});

//$(document).ready(function(){
//  $("button#show").click(function(){
//    $("body").remove("hero-image");
//    $("body").addClass("background2");
//    $("#hiddenForm").slideToggle(1000);
//  });

//.background2 {
//  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("dog.jpg.jpg");
//  height: 100%;
//  background-position: center; 
//  background-repeat: no-repeat;
//  background-size: cover;
//  position: relative;
//}