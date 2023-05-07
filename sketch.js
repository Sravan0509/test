var trex , trexImg;
var ground, groundImg;
var fakeG;
var cloud, cloudIMG,cloudGroup;
var obsticle,obsticleGroup, obs1, obs2, obs3, obs4, obs5, obs6;
var end, endIMG;
var restart,restartIMG;
var gamestate;
var tend;
function preload(){

  trexImg= loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg= loadImage("ground2.png");
  cloudIMG = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  endIMG = loadImage("gameOver.png");
  restartIMG = loadImage("restart.png");
  tend = loadAnimation("trex_collided.png");
}

function setup(){

  createCanvas(600,200);
  
  ground = createSprite(300, 175);
  ground.addImage(groundImg);

  fakeG = createSprite(100, 180, 200, 2);
  fakeG.visible = false;

  trex= createSprite(100,170);
  trex.addAnimation("run",trexImg);
  trex.addAnimation("end",tend);
  trex.scale = 0.4;

  trex.debug = true;
  trex.setCollider('circle', 0,0,50);
  cloudGroup= createGroup();
  obsticleGroup= createGroup();
  trex.debug = false;
  restart = createSprite(300, 120),
  restart.addImage(restartIMG);
  restart.scale=0.3;
  
  end = createSprite(300,90);
  end.addImage(endIMG);
  end.scale = 0.5;
  gamestate="play";
  
}


function draw(){

  background('black');
  drawSprites();

  if(gamestate == "play"){
    spawnCloud();
    spawnObsticle();
    
    restart.visible=false;
    end.visible=false;

    if (keyDown("space") && trex.y >= 150){
      trex.velocityY=-13;
    }
    trex.velocityY += 0.8;

    if(ground.x < -200){
      ground.x = ground.width/2;
    }
    ground.velocityX = -4;

    if (trex.isTouching(obsticleGroup)){
      gamestate="end";
    }
  
  }
  if(gamestate == "end"){
    restart.visible = true;
    end.visible = true;
    cloudGroup.setVelocityXEach(0);
    obsticleGroup.setVelocityXEach(0);
    trex.changeAnimation("end",tend);
    obsticleGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    trex.velocityY = 0
    ground.velocityX = 0
    if (mousePressedOver(restart)){
        reset();

    }
  }
  
 
 
  
  trex.collide(fakeG);
  

  
}


function spawnCloud(){

  if(frameCount %60 == 0){
  cloud = createSprite(700, 50);
  cloud.addImage(cloudIMG);
  cloud.velocityX = -4;
  cloud.y = random(30, 60);
  cloud.scale = random(0.4, 1);
  trex.depth = cloud.depth + 1
  cloudGroup.add(cloud);
  cloud.lifetime = 200
  }
}

function spawnObsticle (){
  if (frameCount % 70 == 0){
      obsticle = createSprite(700, 160);
      var num = Math.round(random(1,6))
     console.log(num)
      switch(num){
        case 1:obsticle.addImage(obs1);
        break;
        case 2:obsticle.addImage(obs2);
        break;
        case 3:obsticle.addImage(obs3);
        break;
        case 4:obsticle.addImage(obs4);
        break;
        case 5:obsticle.addImage(obs5);
        break;
        case 6:obsticle.addImage(obs6);
        break;
        default:break;
      }
      obsticle.velocityX = -4;
      obsticle.scale=0.4
      obsticleGroup.add(obsticle);
      obsticle.lifetime = 200;

  }
}

function reset(){
  gamestate = 'play'
  obsticleGroup.destroyEach();
  
  cloudGroup.destroyEach();
  trex.changeAnimation('run')
}