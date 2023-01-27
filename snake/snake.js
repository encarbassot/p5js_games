function snake(){
  this.x=(floor(col/2))*scl;
  this.y=(floor(row/2))*scl;
  this.xspeed=1;
  this.yspeed=0;
  this.total=0;
  this.tail =[];

  this.restart = function(){
    this.total=0;
    this.tail=[];

    food.mult(scl);
    this.x=(floor(col/2))*scl;

    this.y=(floor(row/2))*scl;
    pickLocation();
}


  this.update = function (){
    if (this.tail.length === this.total){
      for(var i=0;i<this.tail.length-1;i++){
        this.tail[i]=this.tail[i+1];
      }
    }
    this.tail[this.total-1]=createVector(this.x,this.y);

    this.x+=this.xspeed*scl;
    this.y+=this.yspeed*scl;

    this.x=constrain(this.x,0-scl,(col*scl));
    this.y=constrain(this.y,0-scl,(row*scl));

    pressed=false;
  }

  this.death = function(){

    if(this.x<-1||this.x-1>(col*scl)-scl){
      // console.log("DEADx");
      this.restart();
    }
    if(this.y<-1||this.y>(row*scl)-scl*2){
      // console.log("DEADy");
      this.restart();
    }


    for(var i=0;i<this.tail.length;i++){
      var pos=this.tail[i];
      var d = dist(this.x,this.y,pos.x,pos.y);
      if (d<1){
        // console.log("DEADt");
        this.restart();

      }
    }
  }

  this.eat= function(pos){
    var d=dist(this.x,this.y,pos.x,pos.y);
    if (d<1){
      this.total++;
      if(this.total>best)best=this.total;
      localStorage["bestP"] =this.total;
      // console.log(this.total);
      return true;
    }else {
      return false;
    }
  }
this.show = function(){

  fill(255);
  noStroke();
  for(var i=0; i<this.total; i++){
    rect(this.tail[i].x,this.tail[i].y,scl,scl);
  }
    fill(255,100,0);
  rect(this.x,this.y,scl,scl);

}

this.puntuation=function(){
  fill(100,200);
  textSize(scl*5);
  text(this.total, scl*2, scl*6);
  if (best>0){
    textSize(scl);
    text("Best: "+best,scl,scl*1.5)
  }
}


this.dir = function(x,y){
  // console.log(x,y);
  if(!pressed){
    pressed=true;
    if(Math.abs(x)>0&&this.xspeed==0  || Math.abs(y)>0&&this.yspeed==0){
      this.xspeed=x;
      this.yspeed=y;
    }
  }
}




}
