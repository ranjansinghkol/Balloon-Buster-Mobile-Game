var bow, arrow, scene, gameOver;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage, blue_balloonImage, backgroundImage, bombImg, gameOverImg;
var red, blue, green, pink, arrow, bomb;

var arrowGroup, redB, greenB, blueB, pinkB, bombG;

var explosion, popSound;

var score;

// Game States
var SERVE = 0;
var PLAY = 1;
var END = 2;
var gameState = SERVE;

function preload() {
  backgroundImage = loadImage("assets/background0.png");
  arrowImage = loadImage("assets/arrow0.png");
  bowImage = loadImage("assets/bow0.png");
  red_balloonImage = loadImage("assets/red_balloon0.png");
  green_balloonImage = loadImage("assets/green_balloon0.png");
  pink_balloonImage = loadImage("assets/pink_balloon0.png");
  blue_balloonImage = loadImage("assets/blue_balloon0.png");
  bombImg = loadImage("assets/bomb.png");
  gameOverImg = loadImage("assets/gameOver.png");

  explosion = loadSound("assets/explosion.wav");
  popSound = loadSound("assets/balloon_pop.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Creatung the Bow
  bow = createSprite(windowWidth - 25, windowHeight / 2, 20, 50);
  bow.addImage(bowImage);
  bow.scale = 1;

  // Creating the Game Over Sprite
  gameOver = createSprite(windowWidth / 2, windowHeight / 2);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  // Setting score to 0 when the game starts
  score = 0;

  // Groups
  arrowGroup = new Group();
  redB = new Group();
  greenB = new Group();
  blueB = new Group();
  pinkB = new Group();
  bombG = new Group();
}

function draw() {
  background(0, 170, 255);
  drawSprites();
  textSize(15);
  fill(255);

  if (gameState == SERVE) {
    gameOver.visible = false;
    bow.visible = true;

    text("Tap to start",  windowWidth / 2, windowHeight / 2 - 50);

    score = 0;

    // Starting the game
    if (keyDown("space") || touches.length > 0) {
      gameState = PLAY;
      touches = [];
    }
  }

  if(gameState == PLAY) {
    // Setting the Bow's y axis to the Mouse
    bow.y = mouseY;

    // Shooting arrows
    if (keyDown("space") || touches.length > 0) {
      createArrow();
      touches = [];
    }

    // Creating Balloons
    var select_object = Math.round(random(1, 5));

    if (World.frameCount % 100 == 0) {
      switch (select_object) {
        case 1:
          redBalloon();
          select_object = Math.round(random(1, 5));
          break;
        case 2:
          greenBalloon();
          select_object = Math.round(random(1, 5));
          break;
        case 3:
          blueBalloon();
          select_object = Math.round(random(1, 5));
          break;
        case 4:
          pinkBalloon();
          select_object = Math.round(random(1, 5));
          break;
        case 5:
          spawnBombs();
          select_object = Math.round(random(1, 5));
          break;
        default:
          break;
      }
    }

    if (arrowGroup.isTouching(redB)) {
      redB.destroyEach();
      arrowGroup.destroyEach();
      score = score + 1;
      popSound.play();
    }
    if (arrowGroup.isTouching(greenB)) {
      greenB.destroyEach();
      arrowGroup.destroyEach();
      score = score + 2;
      popSound.play();
    }
    if (arrowGroup.isTouching(blueB)) {
      blueB.destroyEach();
      arrowGroup.destroyEach();
      score = score + 3;
      popSound.play();
    }
    if (arrowGroup.isTouching(pinkB)) {
      pinkB.destroyEach();
      arrowGroup.destroyEach();
      score = score + 4;
      popSound.play();
    }
    if (arrowGroup.isTouching(bombG)) {
      arrowGroup.destroyEach();
      bombG.destroyEach();
      gameState = END;
      explosion.play();
    }
  }

  if (gameState == END) {
    redB.destroyEach();
    greenB.destroyEach();
    blueB.destroyEach();
    pinkB.destroyEach();

    gameOver.visible = true;
    bow.visible = false;

    text("Tap to Restart", windowWidth / 2, windowHeight / 2 - 50);

    // Restarting the game
    if (keyDown('space') || touches.length > 0) {
      gameState = SERVE;
      touches = [];
    }
  }

  text("Score: " + score, 10, 20);
}

function createArrow() {
  arrow = createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = windowWidth - 40;
  arrow.y = bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 1750;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
}

function redBalloon() {
  red = createSprite(-50, Math.round(random(30, windowHeight - 30)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 2000;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  blue = createSprite(-50, Math.round(random(30, windowHeight - 30)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 2000;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() {
  green = createSprite(-50, Math.round(random(30, windowHeight - 30)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 2000;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  pink = createSprite(-50, Math.round(random(30, windowHeight - 30)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 2000;
  pink.scale = 1;
  pinkB.add(pink);
}

function spawnBombs() {
  bomb = createSprite(-50, Math.round(random(30, windowHeight - 30)), 10, 10);
  bomb.addImage(bombImg);
  bomb.velocityX = 3.25;
  bomb.lifetime = 2000;
  bomb.scale = 0.1;
  bombG.add(bomb);
}