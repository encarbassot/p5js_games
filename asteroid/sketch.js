var ship;
var dust=[];
var asteroids=[];
var lasers= []
var frameOfDead=0;
var gameover=false;
var score=0;
var bestScore=0;
var phone=false;
var prevdown=false;
var prevpause=false;
var level=0;
var pause=false
var maxH;
var title;

function setup() {
  createCanvas(windowWidth-1,windowHeight-5);
  if (height>width){
    phone=true;
    maxH=height-17/48*width;
  }else maxH=height;
  ship = new Ship();
  spawnAsteroids(level);
  title=new Title("LEVEL "+level,100);
  noFill();
  stroke(255);
document.body.style.backgroundColor = color(50);
}

function draw() {
  background(81);

if(!pause){
  if(ship.isAlive()){
    ship.update(frameCount-frameOfDead);
  }else{
    push()
      // textSize(32);
      // textAlign(CENTER);
      // text('GAME OVER', width*0.5, height*0.5);
      title=new Title("GAME OVER",1);
      gameover=true;

      title=new Title("Try Again?",1,maxH*0.6,"press Intro");
      //title=new Title("press Intro",1,maxH*0.65,);
      textSize(20);
      noStroke()
      fill(255)
      //text('Try Again?', width*0.5, height*0.6);

      textAlign(CENTER);
      // text('press Intro.', width*0.5, height*0.65);
    pop();

  }
  for (var i = dust.length - 1; i >= 0; i--) {
    dust[i].update();
    if (dust[i].transparency <= 0) {
      dust.splice(i, 1);
    }

  }

    for(var i=0; i<asteroids.length;i++){

      if (ship.hits(asteroids[i])){
          ship.broke();
          frameOfDead=frameCount;
          var dustVel = p5.Vector.add(ship.vel.mult(0.4), asteroids[i].vel);
        var dustNum = (asteroids[i].size + 1) * 5;
        addDust(asteroids[i].pos, dustVel, dustNum);

      }

      asteroids[i].update();
    }

  for(var i = lasers.length - 1; i >= 0; i--) {
      lasers[i].update();


      if (lasers[i].offscreen()){
          lasers.splice(i,1);
      }else{
        for(var j=asteroids.length-1; j>=0;j--){
          if(lasers[i].hits(asteroids[j])){
            console.log(100-asteroids[j].size*25);
            score+=floor(100-asteroids[j].size*20);

            var dustVel = p5.Vector.add(lasers[i].vel.mult(0.2), asteroids[j].vel);
          var dustNum = (asteroids[j].size + 1) * 5;
          addDust(asteroids[j].pos, dustVel, dustNum);

            if(asteroids[j].r>20){
              var newAsteroids=asteroids[j].brakeup();
              asteroids=asteroids.concat(newAsteroids);
            }
            asteroids.splice(j,1);
            lasers.splice(i,1);
            if(asteroids.length==0){
              level++;
              spawnAsteroids(level);
              title=new Title("LEVEL "+level,100);
              frameOfDead=frameCount;
            }
            break;
          }
        }
      }
    }
}else{
  // push()
  //   textSize(32);
  //   textAlign(CENTER);
  //   text('PAUSE', width*0.5, height*0.5);
  // pop();
  title=new Title("PAUSE",2);


}









push();
  textAlign(CENTER);
  textSize(32);
  text(score,width/2,40);
  textAlign(LEFT);
  fill(255);
  noStroke();
  textSize(15);
  text("level ",10,40);
  text("best ",10,60);
  text(level,50,40);
  text(bestScore,50,60);
pop();
ship.render();
title.render()

for (var i = dust.length - 1; i >= 0; i--)
  dust[i].render();
for(var i=0; i<asteroids.length;i++)
  asteroids[i].render();
for(var i = lasers.length - 1; i >= 0; i--)
    lasers[i].render();



    if(phone&&!gameover){
      var left=false;
      var right=false;
      var up=false;
      var down=false;

      var rHeight=(height-maxH)

      var x0=width*0.2;
      var y0=width*0.15;
      var rad0=width*0.36;


      var x2=width*0.9;
      var y2=maxH+rHeight*0.3;
      var y1=maxH+rHeight*0.56;
      var x1=width*0.9+(y2-y1)//width*0.74;
      var rad = width*0.1;

      var x3 =width*0.5;
      var y3 =maxH+rHeight*0.7
      var rad3=width*0.12

        push();
        noStroke();

      for (var i = 0; i < touches.length; i++) {
        var x =touches[i].x;
        var y =touches[i].y;
        if(dist(x0,maxH+y0,x,y)<rad0/2){
          if (x<x0){left=true;
          }else{right=true;
          }
        }else if(dist(x2,y2,x,y)<rad){
          up=true;
        }else if(dist(x1,y1,x,y)<rad){
          down=true;
        }else if(dist(x3,y3,x,y)<rad3&&!prevpause){
          pause=!pause;
          prevpause=true;
        }
      }

        fill(235);
        rect(0,maxH,width,rHeight)

         stroke(200);
         strokeWeight(rad*1.5);
         line(x1,y1,x2,y2);
         noStroke();
         fill(200);
         ellipse(x0,maxH+y0,rad0)

         fill(100)
         var t=rad0*0.2;
         triangle(x0-t*2,maxH+y0,x0-t/2,maxH+y0+t,x0-t/2,maxH+y0-t);
         triangle(x0+t*2,maxH+y0,x0+t/2,maxH+y0+t,x0+t/2,maxH+y0-t);

         fill(100,50);
         if(left) arc(x0,maxH+y0,rad0, rad0, PI/2,  -PI/2);
         if(right)arc(x0,maxH+y0,rad0, rad0, -PI/2,  PI/2);
         if (up)fill(168,41,92);else fill(255,0,100);
          ellipse(x2,y2,rad);
         if (down)fill(168,41,92);else fill(255,0,100);
          ellipse(x1,y1,rad);

          stroke(100)
          strokeWeight(15);
          translate(x3,y3);
          rotate(-PI/4);
          line(-rad3/2,0,rad3/2,0)
          noStroke();
          fill(100)
          textAlign(CENTER)
          text("Pause",0,25);
          fill(255,0,0,40)
          //ellipse(0,0,rad3+15);

       pop();


      if(!ship.broken&&!pause){
        if (up)ship.boosting(true);
        else   ship.boosting(false);

        if (down&&!prevdown){
          lasers.push(new Laser(ship.pos,ship.heading,ship.r,ship.vel));
          prevdown=true;
        }

        if (right){ship.turn(0.1);}
        if (left){ship.turn(-0.1);}
      }
    }


}
function mouseReleased(){
  prevdown=false;
  prevpause=false;
}

function mouseClicked(){
  //console.log(mouseX/width,(mouseY-maxH)/(height-maxH));
  if(phone&&gameover&&frameCount>frameOfDead+30){
    gameover=false;
    if(score>bestScore){
      bestScore=score;
    }
    score=0;
    level=0;
    ship.revive();
    spawnAsteroids(level);
  }
}

function keyReleased(){
var tleft=(ship.rotation<0);
var tright=(ship.rotation>0);

    if(keyCode==UP_ARROW){
      ship.boosting(false);
    }else if(keyCode==RIGHT_ARROW&&tright){
      ship.setRotation(0);

    }else if(keyCode==LEFT_ARROW&&tleft){
      ship.setRotation(0);
    }
}
function keyPressed(){

  if(!ship.broken){
    if (keyCode==32||keyCode==DOWN_ARROW){
      lasers.push(new Laser(ship.pos,ship.heading,ship.r,ship.vel));
    }else if(keyCode==RIGHT_ARROW){
      ship.setRotation(0.1);
    }else if(keyCode==LEFT_ARROW){
      ship.setRotation(-0.1);
    }else if(keyCode==UP_ARROW){
      ship.boosting(true);
    }else if(keyCode==ENTER&&gameover&&frameCount>frameOfDead+30){
      gameover=false;
      if(score>bestScore){
        bestScore=score;
      }
      score=0;
      level=0;
      ship.revive();
      spawnAsteroids(level);
    }else if(keyCode==80){
      pause=!pause;
    }
  }
}

function spawnAsteroids(lv){
  asteroids=[];
  var n=floor(width*height*0.000015)+lv;//width*height*0.000015

  for(var i=0; i<n;i++){
    asteroids.push(new Asteroid());
  }
}
