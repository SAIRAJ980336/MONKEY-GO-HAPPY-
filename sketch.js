
var monkey , monkey_running;
var ground;
var banana ,bananaImage,bananaGroup, obstacle, obstacleImage;
var obstacleGroup;
var score;
var survivalTime=0;

function preload(){
  //add animation ,add image
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  //createCanvas(600,600);
  
  //make a monkey
  monkey = createSprite (80,315,20,20);
  monkey.addAnimation("monkeyrunning",monkey_running);
  monkey.scale = 0.1;

  //create ground and give it a velocity
  ground = createSprite(400,390,900,10);
  ground.velocityX=-4;
  ground.x = ground.width/2;
  
  //MAKE NEW GROUP
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
}


function draw() {
  //CHANGE THE CANVAS COLOUR TO LIGHTGREEN
  background("lightgreen");
  
  if (ground.x < 0){
  ground.x = ground.width/2;
    
  }
  
  //IF  SPACE BAR IS PRESSED MONKEY SHOULD JUMP
  if (keyDown("space") && monkey.y >= 300){
  monkey.velocityY = -16       ;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  //IF BANANA IS TOUCHING TO MONKEY INCREASE 1 SCORE
  if (bananaGroup.isTouching(monkey)){
 bananaGroup.destroyEach();
    score = score + 1; 
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.velocityY = 0;
    ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
  }
  
  monkey.collide(ground);
  
  spawnBanana();
  spawnObstacles();
  
  drawSprites();
  
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
  fill("white");
  text("SCORE: " + score,130,80);
  
}

//CREATE OBSTACLES
function spawnObstacles(){
  if(frameCount % 300 === 0) {
    obstacle = createSprite(600,360,10,40);
    obstacle.addImage("obstacles",obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.lifetime = 300;
  
    obstacleGroup.add(obstacle);
  
  }  
}
//CRATE BANANA
function spawnBanana(){

  if(frameCount % 80 === 0){
    banana = createSprite(600,250,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
  }
  
}