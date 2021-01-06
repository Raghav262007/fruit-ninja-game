var PLAY = 1;
var END = 0;
var gameState = PLAY;

var knife, microbe, knife1, microbe1;
var fruit, fruit1, fruit2, fruit3, fruit4;
//var live;
var gameOver;

var gameOverSound, KnifeSound;

var score;
function preload() {
  knife = loadImage("sword.png");

  microbe1 = loadAnimation("alien1.png");
  microbe1 = loadAnimation("alien2.png");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");

  gameOver = loadImage("gameOver.png");

  gameOverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwooshSound.mp3");
}

function setup() {
  createCanvas(600, 500);

  knife1 = createSprite(100, 250, 15, 15);


  fruitGroup = new Group();
  microGroup = new Group();

  score = 0;
  //live = 5;
}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {
    knife1.addImage("sword", knife);
    knife1.scale = 0.5;

    knife1.x = World.mouseX;
    knife1.y = World.mouseY;


    fruits();
    microorganisms();

    if (fruitGroup.isTouching(knife1)) {
      fruitGroup.destroyEach();
      score = score + 5;
      knifeSound.play();
    }

    if (microGroup.isTouching(knife1)) {

      knife1.addAnimation("sword", gameOver);
      knife1.x = 300;
      knife1.y = 250;
      knife1.scale = 1.5;
      gameOverSound.play();
      gameState = END;
    }

  }
  else if (gameState === END) {

    fruitGroup.setLifetimeEach(0);
    microGroup.setLifetimeEach(0);

    fruitGroup.setVelocityXEach(0);
    microGroup.setVelocityXEach(0);

    text("PRESS UP_ARROW TO RESTART THE GAME", 175, 300);
  }

  //text("LIVES : " + live , 100,50);

  if (keyDown("UP_ARROW")) {
    reset();
  }

  textSize(20);
  text("SCORE : " + score, 260, 50);

  drawSprites();

}

function fruits() {
  if (World.frameCount % 80 === 0) {
    fruit = createSprite(600, 200, 20, 20);
    fruit.scale = 0.2;
    //fruit.debug=true;
    fruit.setCollider("circle", 0, 0, 120);

    position = Math.round(random(1, 5));
    if (position === 3) {
      fruit.addImage("fruit", fruit1);
    }
    else if (position === 4) {
      fruit.addImage("fruit", fruit2);
    }
    else if (position === 5) {
      fruit.addImage("fruit", fruit3);
    }
    else {
      fruit.addImage("fruit", fruit4);
    }

    fruit.y = Math.round(random(80, 470));

    fruit.velocityX = -10;
    fruit.setlifetime = 100;

    if (position === 1) {
      fruit.x = 100;
      fruit.velocityX = (10 + (score / 4));
    }
    else {
      if (position === 2) {
        fruit.x = 0;
        fruit.velocityX = (10 + (score / 4));
      }
    }

    fruitGroup.add(fruit);

  }
}

function microorganisms() {
  if (World.frameCount % 190 === 0 || World.frameCount % 180 === 5) {
    microbe = createSprite(600, 200, 20, 20);
    microbe.addAnimation("microbes", microbe1);
    microbe.y = Math.round(random(130, 430));
    microbe.velocityX = - (10 + (score / 10));
    microbe.setlifetime = 50;
    //microbe.debug=true;
    microbe.setCollider("circle", 0, 0, 20);
    microGroup.add(microbe);
  }
}

function reset() {
  gameState = PLAY;
  microGroup.destroyEach();
  fruitGroup.destroyEach();
  knife1.changeAnimation("sword", knife);
  score = 0;
}




