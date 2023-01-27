
let playing = false;
let leftscore = 0;
let rightscore = 0;
let finger;
let paddleSpeed=5,ballSpeed=15,bring=0;

function preload(){
  finger=loadImage("data/finger.png")
}

function windowResized(){resizeCanvas(windowWidth-1,windowHeight-6)}
function setup() {
  createCanvas(windowWidth-1,windowHeight-6);
    puck = new Puck();
    left = new Paddle(true);
    right = new Paddle(false);
    document.body.style.background="rgb(81,81,81)"

}

function draw() {
    background(81);
    left.show();
    right.show();
if(playing){
    puck.checkPaddleRight(right);
    puck.checkPaddleLeft(left);

    left.update();
    right.update();

    puck.update();
    puck.edges();
    puck.show();

 }else{
       prestart()
}

    fill(255);
    textSize(32);
    stroke(255)
    line(width/2,0,width/2,height)
    textAlign(RIGHT,TOP)
    text(leftscore, width/2-10, 10);
    textAlign(LEFT,TOP)
    text(rightscore, width/2+10, 10);


    if(is_touch_device()){

      if(check_touches())playing=false
      else{
        playing=true
        fill(255,50)
        for (var i = 0; i < touches.length; i++) {
          var x =touches[i].x;
          var y =touches[i].y;
          ellipse(x,y,50)
          if(x>width/2){
              right.moveto(y);
          }else{
            left.moveto(y);
          }
        }
      }

    }




    if (keyIsDown(65)) {//A
      left.move(-paddleSpeed);
      }else if (keyIsDown(90)) {//Z
        left.move(paddleSpeed);
      }else{
        left.move(0);
      }

      if (keyIsDown(75)) {//K
        right.move(-paddleSpeed);
      }else if (keyIsDown(77)) {//M
        right.move(paddleSpeed);
      }else{
        right.move(0);
      }
}


// function keyReleased() {
//     left.move(0);
//     right.move(0);
// }
//
function keyPressed() {
  playing=true
  if (key==27){
    playing=false;

  }
    // if (key == 'A') {
    //     left.move(-paddleSpeed);
    // } else if (key == 'Z') {
    //     left.move(paddleSpeed);
    // }
    //
    // if (key == 'K') {
    //     right.move(-paddleSpeed);
    // } else if (key == 'M') {
    //     right.move(paddleSpeed);
    // }
}







function prestart(){
  textAlign(CENTER,CENTER)
  noStroke()
  textSize(20)




  if(is_touch_device()){
    text("Tap to play",width/2,height/2)

    imageMode(CENTER);
    push()
    translate(width,height)
    scale(-1,-1)
    image(finger,width*0.8,height/2,width/2,width/2)
    pop()
    image(finger,width*0.8,height/2,width/2,width/2)
  }else{//PC
    text("Press any key to start",width/2,height/2)

    push()
    translate(0,height/6)
    rectMode(CENTER)
    textSize(50)
    text("A",width/5,height/4)
    text("Z",width/4,height/2)
    text("M",width/5*4,height/4)
    text("K",width/4*3,height/2)

    fill(255,100)
    rect(width/5,height/4,100,100,5)
    rect(width/4,height/2,100,100,5)

    rect(width/5*4,height/4,100,100,5)
    rect(width/4*3  ,height/2,100,100,5)
    pop()
  }
}

function is_touch_device() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

function check_touches(){
  if (touches.length==2)return touches[0].x>width/2 ==  touches[1].x>width/2
  else return touches.length>2||touches.length==0
}
