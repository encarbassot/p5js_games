var s;
var scl=20;
var food;
var col;
var row;

var upB,downB,leftB,rightB;

var pressedX;
var pressedY;

var press=0
var maxH;
var best=0;
var pressed=false;
var phone=false;
var pause=false;

function ini(){

  if(height>width){//movil
    frameRate(5);
    phone=true;
    scl=height/50
    maxH=height/3*2
  }else{//PC
    frameRate(7);
    maxH=height
  }

  col=floor(width/scl);
  row=floor(maxH/scl)+1;
}
function windowResized(){resizeCanvas(windowWidth-1,windowHeight-6);ini()}

function setup() {
  if (localStorage["bestP"]) {
  best=localStorage["bestP"];
}else{
    localStorage["bestP"] =0;
  }
createCanvas(windowWidth-1,windowHeight-6);

ini();

  s=new snake();
pickLocation();

}
function pickLocation(){//reborn food
  food=createVector(floor(random(col)),floor(random(row-1)));
  food.mult(scl);
}

function draw() {
	background(81);


  s.update();
  s.death();
  s.puntuation();
  s.show();

  if(s.eat(food)){
    pickLocation();
  }

  fill(255,0,100);
  rect(food.x,food.y,scl,scl);

  if(phone){
    push();
    fill(51);
    rect(0,maxH,width,height);
    var thisH=height-maxH;
    var tsp=thisH/5;
    var th=thisH/10;
    var tw=thisH/5;
    translate(width/2,maxH+(thisH/2))
    fill(81)
    ellipse(0,0,thisH*0.9,thisH*0.9)
    for(let i=0;i<4+press;i++){
      if(i==3+press&&press>0)fill(180);else fill(230);
      //arc(3, 0, thisH*0.9, thisH*0.9, -QUARTER_PI, QUARTER_PI);
      let _w=thisH*0.3,_h=thisH*0.45;
      rect(0,-_w*0.5,_h, _w,5)
      if(i==3+press&&press>0)fill(200,0,70);else fill(255,0,100);
      triangle(tsp, th, tsp, -th, tsp+tw, 0);
      rotate(HALF_PI);

    }
    pop();

    drawFullscreen(10,height-50,40)
  }
}




function keyPressed() {
  if(!phone){
  if (keyCode === UP_ARROW){
    s.dir(0,-1);
  }else if(keyCode === DOWN_ARROW){
    s.dir(0, 1);
  }else if(keyCode === LEFT_ARROW){
    s.dir(-1,0);
  }else if(keyCode === RIGHT_ARROW){
    s.dir(1,0);
  }
}
}
function mousePressed(){
  //console.log(mouseX,mouseY);
  pressedX=mouseX;
  pressedY=mouseY;
  if(phone&&mouseY>maxH){
    let thisY=mouseY-maxH;
    let thisH=height-maxH;
    let top=(thisH/2-thisY)
    let left=(width/2-mouseX)
    if(-left>abs(top)){// console.log("Right")
      s.dir(1,0);
      press=1;
    }else if(left>abs(top)){//console.log("left")
      s.dir(-1,0);
      press=3;
    }else if(-top>abs(left)){// console.log("Down")
      s.dir(0,1);
      press=2;
    }else if(top>abs(left)){// console.log("UP")
      s.dir(0,-1);
      press=4;
    }else{}

  }
}
function mouseReleased(){
  press=0;
  var draggedX=mouseX-pressedX;
  var draggedY=mouseY-pressedY;
//console.log(draggedX,draggedY);

if(dist(0,0,draggedX,draggedY)>width/15){
  if (abs(draggedX)>abs(draggedY)){
      if(draggedX>0){
        // console.log("Right")
        s.dir(1,0);
      }else{
        //console.log("left")
        s.dir(-1,0);
      }
  }else{
      if(draggedY>0){
        // console.log("Down")
        s.dir(0,1);
      }else{
        // console.log("UP")
        s.dir(0,-1);
      }
  }
}

}

function mouseClicked() {
fullscreenClick()
}
