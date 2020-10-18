
var monkey , monkey_running,monkeyImage
var bananaImage,obstacleImage
var FoodGroup, obstacleGroup
var survivalT=0
var PLAY=1
var END=0
var gameState=PLAY


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyImage=loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
 createCanvas(400,400)
  
 monkey=createSprite(80,315,20,20)
 monkey.addAnimation("moving",monkey_running);
 monkey.scale=0.1
  
 ground=createSprite(400,350,1200,10)
 ground.velocityX=-4
 ground.x=ground.width/2;
 //console.log(ground.x)
 
  FoodGroup= createGroup(); 
  obstacleGroup= createGroup();
}


function draw() {
background(210)
  //console.log(monkey.y)
if (gameState===PLAY){
  ground.velocityX=-25
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("space")&& monkey.y >= 314) {
    monkey.velocityY = -19;
    monkey.velocityX = 0.3;
  }
  monkey.velocityY=monkey.velocityY + 0.8
  
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    survivalT=survivalT+25
  }
    
    survivalT=Math.ceil(frameCount/getFrameRate()); 
    Stone();
    spawnB();
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.velocityX=0
    monkey.velocityY=0
    gameState = END;
  }
  }
  else if (gameState === END) { 
    ground.velocityX=0
    monkey.velocityX=0
    monkey.velocityY=0
    monkey.addImage(monkeyImage)
  }   
  monkey.collide(ground)
  stroke("black"); 
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalT, 100,50);
    
  drawSprites();
}
function spawnB(){
  if (frameCount % 80 === 0) {
    var banana=createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -4;
    banana.lifetime = 300;
    
    FoodGroup.add(banana);
}
}
function Stone(){
  if (frameCount % 300 === 0) {
    var obstacle=createSprite(600,325,5,10)
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(1 + survivalT/10);
    obstacle.scale = 0.16;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
}
}






