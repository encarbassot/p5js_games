
let horizontal=false;
let n=3,url
let grid=[[],[],[]]
let discHeight=0,maxDiscWidth=0;
let poleHeight=0,poleWidth=0;
let moves=0;
let win=false,start=false,begin,end,d;

function setup() {

  //put N param in URL and read it
   url=window.location.href.split('?')
  if(url.length<2){
    window.location.replace(url[0]+"?"+n);
  }else{
    createCanvas(windowWidth-1,windowHeight-5)

    n=parseInt(url[1])
    poleHeight=height*0.6
    poleWidth=min(width*0.05,30);
    discHeight=min((poleHeight*0.9)/n,height/15)
    maxDiscWidth=min(width/3.1,n*50)
    console.log('hanoi with '+n+' discs');
  }

  for (var i = n-1; i >= 0; i--) {
    grid[0].push(i)
  }
  d = new Date();

colorMode(HSB, 255);
textAlign(CENTER,CENTER)
  // put setup code here
  horizontal=(height<width)
}
function draw() {
  background(200)

  showPoles(true);
  showShadows();
  showGUI();

  if (!pressing&&mouseIsPressed) {
    pressing=true
    mPressed()
  }
  if(pressing&&!mouseIsPressed){
    pressing=false
    mReleased()
  }
}

let pressing=false
let buffer=-1;
let byClick=false;
function mPressed(){
  if(!start){
    start=true
    begin = d.getTime();

  }
  if(win){
    window.location.replace(url[0]+"?"+(n+1));

  }


  if(!byClick){
    buffer=getN();
  }else{
    if(buffer==getN()){
      buffer=-1
    }
    byClick=false
  }

}

function mReleased(){
  if(buffer!=getN()){
    move(buffer,getN())
    buffer=-1;
  }else{
    byClick=true

  }

}



function showShadows(){
  if(buffer!=-1){

    let gn=getN();
    let mooving=topElement(buffer);
    if(mooving<n){
      fill((mooving%4)*50,250,200)
      if(!(!mouseIsPressed&&is_touch_device())){
        push()
          translate(mouseX,mouseY)
          rotate(movedX*0.05)
          let discW=map(mooving,0,n-1,poleWidth*1.5,maxDiscWidth)
          rect(0,0,discW,discHeight*0.9)
          text(mooving+1,0,0)
        pop()
      }
      strokeWeight(5)
      stroke(move(buffer,gn,true)?color(85,150,150):color(0,150,150))
      if(gn!=buffer){
        showDisc(gn,grid[gn].length,mooving)
      }
    }
  }
}

function showGUI(){
  if(grid[grid.length-1].length==n){
    //WIN
    if(!win){
      d=new Date();
      end= d.getTime();
    }
    win=true
    fill(0,50)
    rect(width/2,height/2,width,height)
    fill(255,150)
    rect(width/2,height/2,width*0.9,height*0.9,width/10)

    fill(0)
    textSize(height*0.1)
    text("YOU WIN",width/2,height*0.2)

    textSize(height*0.05)
    text("Your moves: "+moves ,width/2,height*0.3)
    text("Best moves: "+(pow(2,n)-1) ,width/2,height*0.4)
    text("Your time "+formatTime(end,begin) ,width/2,height*0.5)

    textSize(height*0.04)
    let _tab="TAB HERE FOR NEXT LEVEL"
    noFill()
    stroke(0)
    rect(width/2,height*0.7,textWidth(_tab)*1.1,height*0.06)
    fill(0)
    noStroke()
    text(_tab,width/2,height*0.7)
  }else{

    // rectMode(CORNER)
    // stroke(81)
    // fill(255)
    // strokeWeight(5)
    // rect(width*0.775,height*0.025,width*0.2,height*0.1)
    noStroke()
    fill(89)
    textSize(20)
    textAlign(LEFT,TOP)
    text("moves:"+moves,width*0.01,10)
    text("best:"+(pow(2,n)-1),width*0.01,35)
    textSize(30)
    text(n,width/2,10)
  }
}



function showPoles(discs=false){
  rectMode(CENTER)

  noStroke()
  fill(43)

  rect(width/2,height*0.95,width,height*0.1)

  for(let i=0;i<grid.length;i++){
    fill(89)
    rect(width/6*(i*2+1),height*0.6,poleWidth,poleHeight)
    if(discs){
      showDiscs(i);
    }

  }
}

function showDiscs(j){
  textSize(discHeight*0.5)
  for (var i = 0; i < grid[j].length; i++) {
    if (buffer==j&&i==grid[j].length-1) {
      fill(127,127,127)
    }else{
      fill((grid[j][i]%4)*50,250,200)
    }
    showDisc(j,i)

  }
}

function showDisc(x,y,i=grid[x][y]){
  let discW=map(i,0,n-1,poleWidth*1.5,maxDiscWidth)
  rect(width/6*(x*2+1),height*0.9-(discHeight*0.5+discHeight*y),discW,discHeight*0.9)

  fill(0)
  noStroke()
  textAlign(CENTER,CENTER)
  text(i+1,width/6*(x*2+1),height*0.9-(discHeight*0.5+discHeight*y))
}

















function formatTime(end,beg=0){

  let s=floor((end-beg)/100)/10

  let fd=[
     Math.floor(Math.floor(Math.floor(s/60)/60)/24)%24      //DAYS
     ,Math.floor(Math.floor(s/60)/60)%60                     //HOURS
     ,Math.floor(s/60)%60                                    //MINUTES
     ,s%60                                                   //SECONDS
   ]

   let result=""
   for (var i = 0,found=false; i < fd.length&&!found; i++) {
     if(fd[i]>0){
       found=true
       switch (i) {
         case 0://d
            result+=ch(fd[0])+" days "
         case 1://h
            result+=ch(fd[1])+":"
         case 2://m
            result+=ch(fd[2])+":"
         case 3://s
             result+=ch(Math.round(fd[3]*10)/10)

       }
     }

     function ch(n){
       return n<10?"0"+n:n
     }
   }
   return result

  // return floor((end-beg)/100)/10+"s"
}



function getN(x=mouseX){
  return max(0,min(floor(x/width*grid.length),grid.length-1))
}

function move(from,to,test=false){
  if(from>=0&&to>=0&&from<grid.length&&to<grid.length&&from!=to)
  if(topElement(from)<topElement(to)){
    if(!test){
      // console.log("from:"+from+" to:"+to);
      grid[to].push(grid[from].pop())
      moves++
    }
    return true;
  }
  return false;
}

function topElement(j){
  if(j<0)return 0
  if(grid[j].length==0) return n//Infinity
  return grid[j][grid[j].length-1]
}








function is_touch_device() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}
