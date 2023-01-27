function Asteroid(pos,r,speed_){

  if(pos){
    this.pos=pos.copy();
  }else{
    this.pos=createVector(random(width),random(height));
  }

  if(r){
    this.size=r
  }else{
    this.size=floor(random(1,4));
  }

  this.vel=p5.Vector.random2D();
  if(speed_){
    this.vel.add(speed_)
  }
  this.r=this.size*15
  this.heading=0;
  this.rotation=random(PI*0.001);

  this.total=floor(random(5,15));
  this.offset=[]
  for(var i=0;i<this.total;i++){
    this.offset[i]=random(-this.r*0.5,this.r*0.5);
  }

  this.update=function(){

    this.pos.add(this.vel);
    this.heading+=this.rotation;
    this.edges();

  }

  this.render = function(){
    push();

      translate(this.pos.x,this.pos.y);
      rotate(this.heading);
      beginShape();
      for (var i=0; i<this.total;i++){
        var ang=map(i,0,this.total,0,TWO_PI);
        var r =this.r+this.offset[i];

        var x=r*cos(ang);
        var y=r*sin(ang);
        vertex(x,y);
      }
      endShape(CLOSE);
      stroke(255,50);
      //ellipse(0,0,this.r*2,this.r*2);


    pop();
  }

  this.brakeup=function(){
    var soons=floor(random(2,4));
    var newA=[];
    for(var i=0;i<soons;i++){
      newA[i]=new Asteroid(this.pos,this.size-1,this.vel);
    }
    return newA;
  }

  this.edges=function(){
    if (this.pos.x>width+this.r){
      this.pos.x=0-this.r;
    }else if (this.pos.x<0-this.r) {
      this.pos.x=width+this.r;
    }

    if (this.pos.y>maxH+this.r){
      this.pos.y=0-this.r;
    }else if (this.pos.y<0-this.r) {
      this.pos.y=maxH+this.r;
    }
  }
}
















function Dust(pos, vel) {
  this.pos = pos.copy();
  this.vel = vel.copy();
  this.vel.add(p5.Vector.random2D().mult(random(0.5, 1.5)));
  this.transparency = random(200, 255);

  this.update = function() {
    this.pos.add(this.vel);
    this.transparency -= 2;
  }

  this.render = function() {
    push();
    if (this.transparency > 0) {
      stroke(this.transparency);
      point(this.pos.x, this.pos.y);
    }
    pop();
  }
}

function addDust(pos, vel, n) {
  for (var i = 0; i < n; i++) {
    dust.push(new Dust(pos, vel));
  }
}
