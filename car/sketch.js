import ElioCanvas from "/lib/elioUtils/eloiCanvas.js"
import Player from "./player.js"

// const cv = new ElioCanvas(16,16);
const cv = new ElioCanvas();
const laneWidth = cv.width/11
//width of the screen divided by 11
//(1.5 grass) (8 lanes) (1.5 grass)

const player = new Player(cv.width,cv.height,laneWidth)

cv.appendTo(document.getElementById("canvas-container"))

cv.setup = function () {
};

let x = 0
let y = 0

cv.draw = function (f,millis) {

    cv.background(20);
    cv.fill(255)
    cv.strokeWeight(4)

    //MOUSE
    cv.stroke(0,0,255)
    cv.circle(cv.mouseX,cv.mouseY,10)

    player.update(cv.mouseX,cv.mouseY,millis,cv)

    player.draw(cv)

//   document.querySelector("head link[rel=icon]").href=cv.toDataURL()

    // cv.noLoop()
};

cv.start();



document.addEventListener("keyup",(event)=>{
    if(event.key=="ArrowUp"){
        y-=1
    }else if(event.key=="ArrowDown"){
        y+=1
    }else if(event.key=="ArrowLeft"){
        x-=1
    }else if(event.key=="ArrowRight"){
        x+=1
    }
})

