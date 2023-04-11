let size, cell, edge, maxize,controlsH,controlsPos;
let menu=1000,menuAfter=0,transition=0,transitionTime=35,transitionFunc=[];
let buttons=[],containers=[],cvButt;
let phone=false, fullscreen=false;
let inGame=false;

let mouseXs;
function windowResized(){
  createCanvas(windowWidth,windowHeight-10);
  dimensionarPantalla();

}
function setup() {
  createCanvas(windowWidth,windowHeight-10);
  //createCanvas(windowWidth-1,windowHeight-60);
  //createCanvas(900,600)
   dimensionarPantalla()
   textAlign(LEFT, TOP)
   if(phone){
     controlsH=height-size
     controlsPos=height+size-height
   }
   setUpUI()
}

function draw() {



  // console.log(menu);
  mouseXs=!phone?mouseX-(width-size)/2:mouseX;
  fill(255)
  background(0);
push()
  if(phone){
    //controls
    fill(100,255,100)
    rect(0,height,width,size-height+edge)
    if(inGame){
      push()
      var thisH=height-size;
      var tsp=thisH/5;
      var th=thisH/10;
      var tw=thisH/5;
      translate(width/2,size+(thisH/2))
      for(let i=0;i<4;i++){
        fill(230);
        arc(3, 0, thisH*0.9, thisH*0.9, -QUARTER_PI, QUARTER_PI);
        fill(255,0,100);
        triangle(tsp, th, tsp, -th, tsp+tw, 0);
        rotate(HALF_PI);
      }
      pop()
    }
    translate(edge/2,edge/2);

    // fill(0)
    // text(width+' x '+controlsH, 10, controlsPos+10);//controls dimensions


  }else{//computer
    translate((maxsize-size)/2+edge/2,edge/2);
  }

  fill(255,200,50)
  rect(0,0,size,size)
  fill(255)
  rect(0,0,cell*16,cell*16)


for(let j=0;j<16;j++)for(let i=0;i<16;i++){//chest rainbow board
  fill(255,i*255/16,j*255/16)
  rect(cell*i,cell*j,cell,cell)
}

if(menu>=1000&&!inGame){
  let _w=floor((menu-1000)/100);
  let _i=menu-1000-100*_w;
  setGame(_w,_i);
}
if(inGame){game()}
switch(menu){
  case 4:creatingGame();
}
for(let i=0;i<containers.length;i++){
  containers[i].render(menu)
}

for(let i=0;i<buttons.length;i++){
  buttons[i].render(menu)
}
cvButt.render();
  // console.log(transition);
if(transition!=0){
  if(transition==transitionTime) transitionFunc[0](transitionFunc[1]);
  transition--;

  let _w=(transitionTime-abs(transition-transitionTime))*(size/2)/transitionTime

  fill(0);
  rect(0,0,size,_w);//top
  rect(0,0,_w,size);//left
  rect(size,size,-size,-_w);//botom
  rect(size,size,-_w,-size);//right
}




pop()
//out of translation
// image(fullscreen?imgMinsize:imgMaxsize, 10, height-40,30,30);
fill(80)
drawFullscreen(10, height-40,30,30)
}

function mouseClicked() {
  if (mouseOnFullScreen()){
    fullscreen=!fullscreen;
    fullscreenIt(fullscreen);
  }

  // switch (menu){
  // case 0:
  //   if(mouseOnC(5,4,6,1)){}//start
  //   if(mouseOnC(5,5,6,1)){setMenu(2)}//levels
  //   if(mouseOnC(5,6,6,1)){}//controls
  //   if(mouseOnC(5,7,6,1)){}//credits
  // break;
  // case 2:
  //   if(mouseOnC(1,1,2,2)){setMenu(0)}//back
  //
  // break;
  // }
  // for(let i=0;i<buttons.length;i++){
  //   buttons[i].press(menu)
  // }

//game controls for phone
  if(phone&&mouseY>size&&inGame){
    let thisY=mouseY-size;
    let thisH=height-size;
    let top=(thisH/2-thisY)
    let left=(width/2-mouseX)
    if(-left>abs(top))catMove(1,0);    // console.log("Right")
    if(left>abs(top))catMove(-1,0);    //console.log("left")
    if(-top>abs(left))catMove(0,1);    // console.log("Down")
    if(top>abs(left))catMove(0,-1);    // console.log("UP")
  }
}
