var b;
var p=[];
var nowPoints=0;
var bestPoints=0;
var lastPoints=0;
var start=false;
var pu=15;
var grab=0.6
var lim=10;

var dhole;
var dbetween;
var dtopfix;
var dtop;
var speed;


var img=[];//img[randomImg()];
var imgcat;
var imgfloor;

var slider1;
var backg

function preload(){
  for(var i=0;i<4;i++){
    img[i]=loadImage('src/pipe'+i+'.png');
  }
  imgcat=loadImage('src/bird.png');
  imgfloor=loadImage('src/floor.png');

}

function setup() {
  backg  = new Background()
  // put setup code here

  if (windowWidth>windowHeight){

    pu=15;
    grab=0.6;
  }else{//movil
    pu=15;
    grab=0.5;
    lim=5;
  }

  createCanvas(windowWidth-1,windowHeight-5);
  difficulty(nowPoints);
  b=new bird(pu,grab,lim);
  p.push(new pipe(randomImg(),width-100));


  // createP
  // slider1 =createSlider(0,TWO_PI,PI/6,0.01);

}


function randomImg(){
  return constrain(floor(random(0,img.length*10)),0,img.length);
  
}

function difficulty(level){
  dbetween=80;
  dhole=170;
  dtop=random(height/4);
  dtopfix=height/4
  speed=2;


dhole=70+constrain(100-level,0,100)
   dtopfix=random(constrain(height/4-level,0,height/4),constrain(height/4+level,height/4,height));


}

class Background{
  constructor(){
    this.speed = 1
    let picW = imgfloor.width/imgfloor.height*windowHeight
    this.frames = []
    for (let x = 0; x < windowWidth+picW; x+=picW) {
      this.frames.push(new BackgroundFrame(x,this.speed))
    }
  }
  draw(){
    let r = this.frames[this.frames.length-1]
    if(r.imNotMargin()){
      this.frames.push(new BackgroundFrame(r.mostX(),this.speed))
    }

    for (let i = this.frames.length-1; i >= 0; i--) {
      if(this.frames[i].imOut())
        this.frames.splice(i,1)
      else{
        this.frames[i].render()

      }
    }
  }
}

class BackgroundFrame{
  constructor(x,s){
    this.x = x
    this.s = s
    this.ratio = imgfloor.width/imgfloor.height
    this.picW = imgfloor.width/imgfloor.height*windowHeight
  }

  render(){
    image(imgfloor,this.x,0,this.picW,windowHeight)
    this.x-=this.s
  }
  imOut(){
    return this.x+this.picW<0
  }
  imNotMargin(){
    return this.mostX()<windowWidth
  }
  mostX(){
    return this.x+this.picW
  }

}

function draw() {
  background(200);
  backg.draw()
  

  for(var i= p.length-1;i>=0;i--){

    if(p[i].offscreen()){
      p.splice(i,1);
    }
    if(p[i].over(b)&&!p[i].overv){
      p[i].overv=true;
      nowPoints++;
      console.log(nowPoints)
    }

    if (start)p[i].update();
    p[i].show();
    //if(false){
    if(p[i].hits(b)){
      console.log("HIT");
      fill(255);
      b.reset();
      start=false;
      p=[];
        p.push(new pipe(randomImg(),width-100));
      if (nowPoints>bestPoints)bestPoints=nowPoints;
      lastPoints=nowPoints;
      nowPoints=0;
      //i+=p.length;
    }

  }

  if(start)b.update();
  b.show();

  if (frameCount%dbetween==0&&start){
    difficulty(nowPoints);
    p.push(new pipe(randomImg()));
  }

if(start){
  fill(255);
  textSize(70);
  textAlign(RIGHT,TOP);
  text(nowPoints,width-10,10);
  textSize(30);
  textAlign(LEFT,TOP);
  text("Best: "+bestPoints,10,10);
}else{
  fill(255);
  textAlign(CENTER,TOP);
  textSize(30);
  text("Your points:",width/2,10)
  textSize(70);
  text(nowPoints,width/2,50)
  textSize(30);
  text("Best points: "+bestPoints,width/2,140)
}


}


function mouseClicked(){
  b.up();
  start=true;
}
function keyPressed(){

    b.up();
    start=true;

}




function bird(p=15,g=0.6,lim=10){
  this.y=height/2;
  this.x=width/3;
  this.r=14;

  this.g=g;
  this.v=0;
  this.p=p;
  this.lim=lim;

this.reset=function(){

  this.y=height/2;
  this.v=0;

}

  this.show = function(){
      fill(255,255,0);
      push()
      imageMode(CENTER);
      translate(this.x,this.y)
      rotate(this.v*0.05)

      image(imgcat,0,0,this.r*3,this.r*3);
      //ellipse(this.x,this.y,this.r*2);
      pop()
  }

  this.up = function(){
    this.v-=this.p;
  }

  this.update = function(){
    this.y+=this.v;
    this.v+=this.g;
    this.y=constrain(this.y,this.r,height-this.r);
this.v=constrain(this.v,-this.lim,this.lim);
    //this.y=mouseY;

    if (this.y>height){
      this.y=height;
      this.v=0;
    }

    if (this.y<0){
      this.y=0;
      this.v=0;
    }

  }


}



function pipe(_img,x=width){

  this.space=dhole;
  this.top=dtop+dtopfix;
  //this.bottom= random(height/2);
  this.x=x;
  this.w=40;
  this.speed=speed;
  this.overv=false;
  this.img=constrain(floor(random(img.length*5)),0,img.length-1);



  this.over = function(bird){
    return (this.x+this.w<bird.x+bird.r);
  }
  this.hits=function(bird){

    if(bird.x+bird.r>this.x&&bird.x-bird.r<this.x+this.w){
      if (bird.y-bird.r<this.top||bird.y+bird.r>this.top+this.space){
        return true;
      }else {return false;}

  }
}
  this.show=function(){

    fill(50);
    var _y2=this.top+this.space;
    var _height2=height-_y2;
    //rect(this.x,  0,                    this.w, this.top);
  push();
    scale(-1.0,1.0);
    image(img[this.img],-this.x,this.top-this.w*4.3,-this.w,this.top-this.w*20);
  pop();

  push();
    translate(this.x,this.top);
    rotate(PI);
    //rect(0,  0,                -this.w, -this.top);

    image(img[this.img],0,0,-this.w,this.w*4.3)


    scale(-1.0,1.0);
    //image(img[this.img],-this.x,this.top-this.w*4.3,-this.w,this.top-this.w*20);
    //ellipse(0,-this.space-this.w*4.3,15);
    image(img[this.img],0,-this.space-this.w*20,this.w,this.w*20);
  pop();
    //rect(this.x,  _y2,  this.w, height);
    image(img[this.img],this.x,_y2,this.w,this.w*4.3);
  }


  this.update=function(){

    this.x-=this.speed;
  }
  this.offscreen=function(){

    return (this.x<-this.w)
  }

}




