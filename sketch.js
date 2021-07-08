var bgImage,
  bg,
  birdy,
  birdy_flying,
  birdy_fly,
  fireTorchImage,
  fireTorchGroup,
  gameOverImg,
  gameOver,
  score = 0,
    edges,
gameOverSound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  bgImage = loadImage("8bit_wallpaper7.jpg");
  birdy_flying = loadAnimation(
    "book-flying-1.png",
    "book-flying-2.png",
    "book-flying-3.png",
    "book-flying-4.png"
  );

  birdy_fly = loadAnimation("book-flying-9.png");

  fireTorchImage = loadImage("torch_PNG14.png");
  gameOverImg = loadImage("game-over.png");
  gameOverSound=loadSound("Game Over Sound Effect.mp3");
}

function setup() {
  createCanvas(600, 300);

  bg = createSprite(280, 150);
  bg.addImage(bgImage);
  bg.scale = 0.5;
  bg.velocityX = -1.5;

  birdy = createSprite(130, 50, 10, 10);
  birdy.addAnimation("birdyflying", birdy_flying);
  birdy.addAnimation("birdyfly", birdy_fly);
  birdy.scale = 0.3;
  birdy.setCollider("rectangle", 0, 0, 90, 45, 0);

  gameOver = createSprite(300, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

 edges=createEdgeSprites();
  
  fireTorchGroup = new Group();
  
}

function draw() {
  background("white");

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    fireTorchGroup.visible = true;
    birdy.visible = true;
    birdy.velocityY = birdy.velocityY + 0.8;
    birdy.changeAnimation("birdyflying", birdy_flying);
    if (keyWentDown("space")) {
      birdy.changeAnimation("birdyfly", birdy_fly);
      birdy.velocityY = -8;
    }

    if (bg.x < 140) {
      bg.x = 280;
    }
    gameOver.visible = false;
    spawnFire();
gameOverSound.stop();
    if(fireTorchGroup.isTouching(birdy)||birdy.isTouching(edges)) {
      gameOverSound.play();
      gameState = END;
    }
  } else if (gameState === END) {
    gameOver.visible = true;
    if (bg.x < 110) {
      bg.x = 280;
    }
if (keyDown("r")){
  reset();
}
   
    birdy.visible = false;
  }

  
  drawSprites();
  text("Score: " + score, 500, 50, fill("black"));
}
function spawnFire() {
  if (frameCount % 90 === 0) {
    var fireTorch = createSprite(700, Math.round(random(20, 280)), 100, 1);
    fireTorch.scale = 0.6;
    fireTorch.addImage("fire", fireTorchImage);
    fireTorch.velocityX = -10;
    fireTorch.rotation = -90;
    fireTorch.setCollider("rectangle", 0, 0, 180, 30, 90);
    fireTorch.setLifetime = 700;
    fireTorchGroup.add(fireTorch);
  }
}
function reset(){
  gameState=PLAY;
  fireTorchGroup.destroyEach();
  birdy.y=50;
  score=0;
}