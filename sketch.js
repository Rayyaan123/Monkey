
var monkey , monkey_running

var banana ,bananaImage, obstacle, obstacleImage

var foodGroup, obstaclesGroup

var ground

var score

var survivalTime=0;

function preload(){
  
  
  monkey_running =      loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
 
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  foodGroup = createGroup();
  obstaclesGroup = createGroup();
  
}


function draw() {
  background("white");
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,100,50);
  
  
  if(World.frameCount%80===0){
    banana = createSprite(400,200,20,20);
    banana.scale = 0.1;
    banana.addImage("banana",bananaImage);
    banana.y = Math.round(random(120,310));
    banana.velocityX = -7;
    banana.setLifetime = 100;
    foodGroup.add(banana);
  }
  
  if (frameCount % 300 === 0){
    obstacle = createSprite(600,310,10,40);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX = -6
    obstacle.scale = 0.28;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
  
  if(keyDown("space")&& monkey.y >= 230) {
        monkey.velocityY = -12;
        
    }
  
  if (ground.x>=10){
    ground.x=350;
  }
    
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
  }
  
  if(monkey.isTouching(obstaclesGroup)){
    monkey.changeAnimation("stop", monkey_stop);
    
    banana.visible=false;
     
      ground.velocityX = 0;
      monkey.velocityY = 0
    
    
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);    
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
}




