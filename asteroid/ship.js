
function Ship(){
  var lives=3;
  this.pos=createVector(width/2,maxH/2);
  this.r=10;
  this.heading=0;
  this.rotation=0;
  this.vel=createVector(0,0);
  this.isBoosting=false;
  this.lives=lives;
  this.inmortal=true;
  this.broken=false;
  this.walls=[];
  this.shapeX=[-this.r, this.r,       0];
  this.shapeY=[this.r , this.r, -this.r];
//-this.r, this.r,this.r,this.r,0,-this.r

  this.update=function(framesFromDeath){
    if(this.broken){
      if(framesFromDeath<100){
        for(var i=0;i<this.walls.length;i++){
          this.walls[i].update();
        }
      }else{
        this.die();
        this.broken=false;
      }
    }else{
      ship.turn();
      this.edges();
      if(this.isBoosting)this.boost();
      this.pos.add(this.vel);
      this.vel.mult(0.95);
      this.inmortal=(framesFromDeath<200)
    }
  }

  this.render=function(){
    push();

    //LIVES INDICATOR
      for(var i=1;i<lives+1;i++){
        noFill();
        triangle(i*15-5, 20, i*15, 5, i*15+5, 20);
        if(i<=this.lives){
          fill(255);
          triangle(i*15-5, 20, i*15, 5, i*15+5, 20);
        }
      }

      //AUREA
      noFill();
      if(frameCount%3==0&&this.inmortal){
        stroke(100,100,255);
        strokeWeight(4);
      }

      translate(this.pos.x,this.pos.y);
      rotate(this.heading+PI/2);
      //SHIP
      if(!this.broken){
        triangle(this.shapeX[0],this.shapeY[0],this.shapeX[1],this.shapeY[1],this.shapeX[2],this.shapeY[2]);
      }else{//walls
        for(var i=0;i<this.walls.length;i++){
          this.walls[i].render();
        }
      }



      //BOOSTER
      if(frameCount%2==0&&this.isBoosting&&!this.broken){
        triangle(this.shapeX[0]/2,this.shapeY[0],this.shapeX[1]/2,this.shapeY[1],this.shapeX[2],-this.shapeY[2]*2);
        //triangle(-this.r/2, this.r,this.r/2,this.r,0,this.r*2);
      }
    pop();
  }

  this.broke=function(){
    this.broken=true;

    var r1=dist(this.shapeX[0],this.shapeY[0],this.shapeX[1],this.shapeY[1]);       //0-1
    var r2=dist(this.shapeX[2],this.shapeY[2],this.shapeX[1],this.shapeY[1]);       //1-2
    var r3=dist(this.shapeX[0],this.shapeY[0],this.shapeX[2],this.shapeY[2]);       //2-0




    this.walls.push(new Walls(this.shapeX[0],this.shapeY[0],r1,random(PI)));
    this.walls.push(new Walls(this.shapeX[1],this.shapeY[1],r2,random(PI)));
    this.walls.push(new Walls(this.shapeX[2],this.shapeY[2],r3,random(PI)));

  }

  this.revive=function(){
    this.lives=lives;
  }
  this.isAlive=function(){
    return (ship.lives>=0)
  }
  this.hits=function  (asteroid){
    var d=dist(this.pos.x,this.pos.y,asteroid.pos.x,asteroid.pos.y);
    return (d<asteroid.r+this.r&&!this.inmortal&&!this.broken);
  }



  this.edges=function(){
    if (this.pos.x>width){
      this.pos.x=0;
    }else if (this.pos.x<0) {
      this.pos.x=width;
    }

    if (this.pos.y>maxH){
      this.pos.y=0;
    }else if (this.pos.y<0) {
      this.pos.y=maxH;
    }

  }

  this.die=function(){
    this.lives--;
    this.vel=createVector(0,0);
    this.walls=[];
    this.pos.x=width/2;
    this.pos.y=maxH/2;
    this.heading=0;
  }

  this.boosting=function(b){
    this.isBoosting=b
  }

  this.boost=function(){
    var force=p5.Vector.fromAngle(this.heading);
    force.mult(0.5);
    this.vel.add(force);
  }


  this.setRotation=function(ang){
    this.rotation=ang;

  }

  this.turn=function(ang=this.rotation){
      this.heading+=ang;

  }


}














function Laser(spos,angle,srad,svel){

  var x=srad*cos(angle);
  var y=srad*sin(angle);
  this.pos=createVector(spos.x+x,spos.y+y);
  this.vel=p5.Vector.fromAngle(angle);
  this.vel.mult(10);
  this.vel.add(svel);

  this.render=function(){
    push();
      strokeWeight(4);
      point(this.pos.x,this.pos.y)
    pop();
  }

  this.update=function(){
    this.pos.add(this.vel);

  }

  this.offscreen=function(){
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > maxH || this.pos.y < 0) {
      return true;
    }
    return false;
  }

  this.hits=function  (asteroid){
    var d=dist(this.pos.x,this.pos.y,asteroid.pos.x,asteroid.pos.y);
    return (d<asteroid.r);
  }
}




function Walls(x,y,r,a){
  this.pos=createVector(x,y);
  this.r=r;
  this.heading=a;
  this.rotation=random(PI*0.01);
  this.vel=p5.Vector.random2D();
  this.c=random()




  this.render=function(){
    push()
      translate(this.pos.x,this.pos.y);
      rotate(this.heading);
      line(-r*this.c,0,r*1-this.c,0)
    pop()
  }
  this.update=function(){
    this.pos.x+=this.vel.x;
    this.pos.y+=this.vel.y
    this.heading+=this.rotation;
  }




}



function Title(txt_,timeout_,h_=maxH*0.5-50,subtit_=""){
  this.txt=txt_;
  this.timeout=timeout_;
  this.showable=true;
  this.h=h_
  this.subtit=subtit_

  this.render=function(){
    if(this.showable){
      this.timeout--;
      push()
        textSize(32);
        textAlign(CENTER);
        text(this.txt, width*0.5, this.h);
        textSize(20);
        noStroke()
        fill(255)
        text(this.subtit,width*0.5,this.h+50)
      pop();
      this.showable=(this.timeout>0)
    }
  }



}
