// Start Screen
let startbutton = document.querySelector("#StartButton");
let start = document.querySelector("#StartScreen");
let startgame = document.querySelector(".playground");

// Hide Start Screen and play music when you click on the button

var backgroundMusic = new Audio();

function hidestart() {
  start.style.display = "none";
  startgame.style.display = "unset";
  window.requestAnimationFrame(loop);
  playBackgroundMusic();
}

startbutton.addEventListener("click", hidestart);

// Soundeffect Collision
function playBackgroundMusic() {
  backgroundMusic = document.getElementById("Music");
  backgroundMusic.loop = true;
  backgroundMusic.play();
}

// Player and Playground
var spieler = document.querySelector(".player");
spieler.style.top = "0px";
var spielfeld = document.querySelector(".playground");
var backgroundPosition = 0;
let positionSpieler = parseInt(spieler.style.top);

var timer = new Timer(60);

// Game Over
let restartBtn = document.querySelector("#restart");

// Reload Game when you click on button
function restartGame() {
  location.reload();
}
restartBtn.addEventListener("click", restartGame);

// Player movement
function tastatur() {
  if (keyboard(38)) {
    positionSpieler = parseInt(spieler.style.top);
    if (positionSpieler > 0) {
      spieler.style.top = positionSpieler - 5 + "px";
    }
  }
  if (keyboard(40)) {
    positionSpieler = parseInt(spieler.style.top);
    if (positionSpieler < 300) {
      spieler.style.top = positionSpieler + 5 + "px";
    }
  }
}

// Background movement
function background() {
  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;
}

// Objects
function generateObjects() {
  if (timer.ready()) {
    // First row of objects
    // Array
    const obj = ["fishpurple", "bottle", "sack", "fishgreen", "toothbrush"];

    // Random object of first array
    const index = Math.floor(Math.random() * obj.length);

    // Position of that object
    var h = document.createElement("div");
    h.classList.add(obj[index]);
    h.style.top = "25px";
    h.style.left = "700px";
    spielfeld.appendChild(h);

    // Second row of objects
    // Array
    const objtwo = ["fishpurple", "bottle", "sack", "fishgreen", "toothbrush"];

    // Random Object of second array
    const indextwo = Math.floor(Math.random() * objtwo.length);

    // Position of object
    var b = document.createElement("div");
    b.classList.add(objtwo[indextwo]);
    b.style.top = "175px";
    b.style.left = "700px";
    spielfeld.appendChild(b);

    // Third row of objects
    // Array
    const objthree = [
      "fishpurple",
      "bottle",
      "sack",
      "fishgreen",
      "toothbrush",
    ];

    // Random object of third array
    const indexthree = Math.floor(Math.random() * objthree.length);

    // Position of object
    var s = document.createElement("div");
    s.classList.add(objthree[indexthree]);
    s.style.top = "325px";
    s.style.left = "700px";
    spielfeld.appendChild(s);
  }

  // Movement of objects
  var fische = document.querySelectorAll(".fishpurple");
  for (var fisch of fische) {
    fisch.style.left = parseInt(fisch.style.left) - 5 + "px";
    if (parseInt(fisch.style.left) < 0) {
      fisch.parentNode.removeChild(fisch);
    }
  }

  var bottles = document.querySelectorAll(".bottle");
  for (var bottle of bottles) {
    bottle.style.left = parseInt(bottle.style.left) - 5 + "px";
    if (parseInt(bottle.style.left) < 0) {
      bottle.parentNode.removeChild(bottle);
    }
  }

  var sacke = document.querySelectorAll(".sack");
  for (var sack of sacke) {
    sack.style.left = parseInt(sack.style.left) - 5 + "px";
    if (parseInt(sack.style.left) < 0) {
      sack.parentNode.removeChild(sack);
    }
  }

  var fischgreens = document.querySelectorAll(".fishgreen");
  for (var fischgreen of fischgreens) {
    fischgreen.style.left = parseInt(fischgreen.style.left) - 5 + "px";
    if (parseInt(fischgreen.style.left) < 0) {
      fischgreen.parentNode.removeChild(fischgreen);
    }
  }

  var toothbrushs = document.querySelectorAll(".toothbrush");
  for (var toothbrush of toothbrushs) {
    toothbrush.style.left = parseInt(toothbrush.style.left) - 5 + "px";
    if (parseInt(toothbrush.style.left) < 0) {
      toothbrush.parentNode.removeChild(toothbrush);
    }
  }
}

// Collision
function collision() {
  var bottles = document.querySelectorAll(".bottle");
  var sacke = document.querySelectorAll(".sack");
  var toothbrushs = document.querySelectorAll(".toothbrush");
  var gameoverScreen = document.querySelector(".gameover");
  var eatEnemy = new Audio();

  // Soundeffect Collision when eating enemies
  function playEatEnemy() {
    eatEnemy = document.getElementById("gameoversfx");
    eatEnemy.loop = false;
    eatEnemy.play();
  }

  // Collision
  // Soundeffect Collision

  if (anyCollision(spieler, bottles)) {
    playEatEnemy();
    gameoverScreen.style.display = "unset";
    startgame.style.display = "none";
    eatEnemy.stop();
  }

  if (anyCollision(spieler, sacke)) {
    playEatEnemy();
    gameoverScreen.style.display = "unset";
    startgame.style.display = "none";
    eatEnemy.stop();
  }

  if (anyCollision(spieler, toothbrushs)) {
    playEatEnemy();
    gameoverScreen.style.display = "unset";
    startgame.style.display = "none";
    eatEnemy.stop();
  }

  var collisions = allCollisions(spieler, bottles);
  var collisions = allCollisions(spieler, sacke);
  var collisions = allCollisions(spieler, toothbrushs);

  // Remove object when collision
  for (var collision of collisions) {
    collision.parentNode.removeChild(collision);
  }
}

// Points
var score = 0;
var punkteAnzeige = document.querySelector(".punkte");

function points() {
  var fische = document.querySelectorAll(".fishpurple");
  var fischgreens = document.querySelectorAll(".fishgreen");
  var pointSfx = new Audio();

  // Soundeffect Point
  function playPointSfx() {
    pointSfx = document.getElementById("pointsfx");
    pointSfx.loop = false;
    pointSfx.play();
  }

  if (anyCollision(spieler, fischgreens)) {
    score = score + 20;
    punkteAnzeige.textContent = score;
    playPointSfx();
  }

  var collisions = allCollisions(spieler, fischgreens);

  for (var collision of collisions) {
    collision.parentNode.removeChild(collision);
  }

  if (anyCollision(spieler, fische)) {
    score = score + 20;
    punkteAnzeige.textContent = score;
    playPointSfx();
  }

  var collisions = allCollisions(spieler, fische);

  for (var collision of collisions) {
    collision.parentNode.removeChild(collision);
  }
}

function loop() {
  // Player movements
  tastatur();

  // Background
  background();

  // Objects

  generateObjects();

  // Collision
  collision();

  // Points
  points();

  window.requestAnimationFrame(loop);
}
