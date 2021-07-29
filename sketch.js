let player;
let playerImage;
let obstcleImage;
let obstacles = [];

let wordClassifier;

function preload() {
  playerImage = loadImage("player.png");
  obstcleImage = loadImage("obstacle.png");
  bgimage = loadImage("background.jpg");
  let options = {
    probabilityThreshold: 0.85,
  };
  wordClassifier = ml5.soundClassifier("SpeechCommands18w", options);
}

function setup() {
  createCanvas(1300, 800);
  background(255, 255, 255);
  player = new Player();
  wordClassifier.classify(hearWord);
}

function hearWord(error, results) {
  if (results[0].label === "up") {
    player.jump();
  }
}

function keyPressed() {
  if (key === " ") {
    player.jump();
    console.log("up");
  }
}

function draw() {
  background(255, 255, 255);
  player.show();
  player.move();

  if (random(1) < 0.01) {
    obstacles.push(new Obstacle());
  }

  for (let obs of obstacles) {
    obs.show();
    obs.move();
    if (player.collided(obs) == true) {
      console.log("Game-Over");
      text("Game Over");
      noLoop();
    }
  }
}
