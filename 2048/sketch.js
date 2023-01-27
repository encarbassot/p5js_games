let score=0
let gameover=false;
let cels=[];

let phone=false;
let controls;

var pressedX;
var pressedY;

function blankGrid(){
  cels=[]
  var row=[]

  for(var j=0;j<4;j++){
    for(var i=0;i<4;i++){
        row.push(new Cell(i+4*j,i,j));
    }
  cels.push(row)
  row=[]
  }
}

function setup() {
  pixelDensity(1)
  // put setup code here
  createCanvas(windowWidth-1,windowHeight-5);
  controls=new Controls(phone);

  calculateSiz()
  phone= (height>width)
  blankGrid()
  addNumber(2);

  noStroke()

  document.body.style.background="rgb(185,173,159)"

}
function mouseClicked(){
  fullscreenClick()
}
function draw(){
  background(185,173,159);
  textAlign(LEFT,TOP)
  textSize(min(width,height)*0.1)
  fill(colors["2"].color)
  text(score,10,10)
  textAlign(CENTER,CENTER)

push()
  let size=spc-wid+siz;
  let w=width/2-size/2+(spc-wid);
  let h=height/2-size/2+(spc-wid);
  let h2=((width*0.1+10)+((controls.pos.y-controls.r)-(width*0.1+10))/2)-size/2+(spc-wid);
  calculateSiz()
  if(phone)
    translate(w,h2)
else  translate(w,h)





    fill(0,100)
    rect(-(spc-wid),-(spc-wid),siz+(spc-wid),siz+(spc-wid),10);
    textAlign(CENTER,CENTER);
    rectMode(CENTER)

    for (let i=0;i<4;i++){
      for (let j=0;j<4;j++){
        let pos=getDesire(i,j)

        fill(colors["0"].color)
        rect(pos.x,pos.y,wid,wid,10)
        cels[i][j].update(i,j)

      }
    }

    for (let i=0;i<4;i++){
      for (let j=0;j<4;j++){

        cels[i][j].render()
      }
    }
pop()


  if(phone){
    controls.update();
    controls.show();
  }


  if(gameover){
    textSize(siz*0.2)
    fill(51)
    text('GAME OVER',width/2,height/2)
  }

  fill(fullScreenMode?color(255,100):255)
  drawFullscreen(20,height-50,30)
}
function calculateSiz(){
  if (phone) siz=min(((controls.pos.y-controls.r)-(width*0.1+10))*0.9,min(width,height)*0.9);
  else siz=min(width,height)*0.9


        wid=siz*0.23
        spc=(siz*0.25)
}

function isGameOver(){
  for (let i=0;i<4;i++){
    for (let j=0;j<4;j++){
      if (cels[i][j].val==0)  return false
      else if (i!==3 && cels[i][j].val==cels[i+1][j].val) return false
      else if (j!==3 && cels[i][j].val==cels[i][j+1].val) return false
    }
  }
  console.log("GAMEOVER");
  return true
}

function addNumber(n=1){
  for(let r=0;r<n;r++){

    let options=[];
    for (let i=0;i<4;i++){
      for (let j=0;j<4;j++){
        if (cels[i][j].val==0){
          options.push({x:i,y:j});
        }
      }
    }
    if (options.length>0){
      let spot=random(options);
      cels[spot.x][spot.y].born(spot.x,spot.y);
    }

  }
}


function slide(row){
for(let i=0;i<row.length;i++){
  for(let j=0;j<row.length-1;j++){
    if(row[j].val==0){
      let aux = row[j]
      row[j]= row[j+1]
      row[j+1]=aux
    }
  }
}

return row
}
function combine(row){

  for(let i=0;i<3;i++){
    let a = row[i].val
       let b = row[i+1].val
       if(a==b&&a+b>2){
         row[i].val=a+b
         row[i+1].val=0;
         score+=a+b
       }
  }

  return row
}


function operate(row){
  row=slide(row)
  row=combine(row)
  row=slide(row)
  return row;
}


function rotateMatrix(mat_,n){
  n=n%4
  let mat=mat_
    for(let r=0;r<n;r++){
    for (let x = 0; x <2; x++){
        for (let y = x; y < 3-x; y++){
            let temp = mat[x][y];
            mat[x][y] = mat[y][3-x];
            mat[y][3-x] = mat[3-x][3-y];
            mat[3-x][3-y] = mat[3-y][x];
            mat[3-y][x] = temp;
        }
    }
  }
  return mat
}



function move(n){
  n=n%4

  if (gameover){
    blankGrid();
    addNumber(2);
    gameover=false
  }else {
    let pastArr=copyArr(cels)
    cels=rotateMatrix(cels,n)
    for(let i=0;i<4;i++){
      cels[i]=operate(cels[i]);
    }
    cels=rotateMatrix(cels,4-n);
    let newArr=copyArr(cels)
    if(!compare(pastArr,newArr)){
      addNumber();
    }
    if(isGameOver()){
      gameover=true}
  }
}

function keyPressed(){
  switch (keyCode) {
      case UP_ARROW:
        move(0)
        break;
      case DOWN_ARROW:
      move(2)
        break;
      case LEFT_ARROW:
      move(1)
        break;
      case RIGHT_ARROW:
      move(3)
        break;
    }
}


function mousePressed(){
  pressedX=mouseX;
  pressedY=mouseY;

}


function mouseReleased(){
  var draggedX=mouseX-pressedX;
  var draggedY=mouseY-pressedY;
  var di=dist(0,0,draggedX,draggedY)
  console.log(di)

  if(di>20){
    if (abs(draggedX)>abs(draggedY)){
        if(draggedX>0){//right
          move(3)
        }else{//left
          move(1)
        }
    }else{
        if(draggedY>0){//down
          move(2)
        }else{//up
          move(0)
        }
    }
  }





  let d=dist(mouseX,mouseY,controls.pos.x,controls.pos.y);
  if(d<controls.r*1.2&&di<20){
    if(!controls.active){
      controls.active=true;
    }else{
      var x=controls.pos.x-mouseX;
      var y=controls.pos.y-mouseY;
      if(abs(x)>abs(y)){
        if(x>0){//left
          move(1)
        }else{//right
          move(3)
        }
      }else{
        if(y>0){//up
          move(0)
        }else{//down
          move(2)
        }
      }
    }
  }else if(controls.active){
    controls.active=false;
  }
}


function copyArr(array){
  let aux=[]

  for (let i=0;i<4;i++){
    for (let j=0;j<4;j++){
      aux.push(array[i][j].val)
    }
  }
  return aux;

}

function compare(arr1,arr2){
  let ecual=true;
  for (let i=0;i<4*4;i++){
      if(arr1[i]!==arr2[i]){
        ecual=false;
        break;
      }
    }

  return ecual;
}
