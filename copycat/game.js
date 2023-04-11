let cat=[];
let plngW,plngL;
let framePress=0;

function setGame(_w,_i){
  cat=[];
  plngW=_w;
  plngL=_i;
  for(let j=0;j<16;j++)for(let i=0;i<16;i++){//level board
    let _val=levels[_w][_i].onGround[j][i]
    switch(_val){
      case 7:
        cat.push(new Cat(i,j));
      break;
    }
  }

  inGame=true;
}


function Cat(_x,_y){
  this.x=_x;
  this.y=_y;

  this.render = function(){
    ellipse(this.x*cell,this.y*cell,cell,cell)
  }

  this.move = function(_x,_y){
    this.x+=_x;
    this.y+=_y;
  }


  this.dead=function(){

  }
}


function game(){
  push();
  ellipseMode(CORNER);

    colorMode(HSB, 10);

    for(let j=0;j<16;j++)for(let i=0;i<16;i++){//level board
      fill(levels[plngW][plngL].ground[j][i],10,10);
      rect(cell*i,cell*j,cell,cell);
    }

    for(let j=0;j<16;j++)for(let i=0;i<16;i++){//level board
      let _val=levels[plngW][plngL].onGround[j][i]
      fill(_val,10,10);
      if(_val>0&&_val!=7)ellipse(cell*i,cell*j,cell,cell);
    }

    for(let i=0;i<cat.length;i++){
      fill(7,10,10);
      cat[i].render();
    }

  pop();
  if(frameCount>framePress+frameRate()/4){
    if(keyIsDown(UP_ARROW)){
      catMove(0,-1);
    }else if(keyIsDown(DOWN_ARROW)){
      catMove(0,1);
    }else if(keyIsDown(LEFT_ARROW)){
      catMove(-1,0);
    }else if(keyIsDown(RIGHT_ARROW)){
      catMove(1,0);
    }
  }

}


function catMove(_x,_y){
  let walkableOnGrounds=[0,8,7,6];
  let deathGrounds=[0];
  let nextGround,nextOnGround;
  let _win=true;
  framePress=frameCount
  for(let i=0;i<cat.length;i++){
    nextOnGround=levels[plngW][plngL].onGround[cat[i].y+_y][cat[i].x+_x];
    console.log(i,nextOnGround);
    if(arrContains(walkableOnGrounds,nextOnGround)){cat[i].move(_x,_y);}
    if(arrContains(deathGrounds,nextGround)){cat.splice(i,1)}

    _win=(levels[plngW][plngL].onGround[cat[i].y][cat[i].x]==8)&&_win;

  }

  if(_win){

    // setMenu(1000+100*plngW+plngL+1)
    setGame(plngW,plngL+1)
    // setTransition(setGame(),plngW,plngL+1);
  }

}



function creatingGame(){
  // background(0)
  colorMode(HSB, 10);
  ccell=cell*14/16;
  for(let j=0;j<16;j++)for(let i=0;i<16;i++){//chest rainbow board
    fill((i+j)/16*5,7,10)
    rect(ccell*i,ccell*j,ccell,ccell)

  }
  cbButton();

}



function cbButton(){
  for(let i=0;i<7;i++){
    fill(3);
    rect(cell*14,cell*2*i+2*cell,cell*2,cell*2)
    rect(cell*2*i,cell*14,2*cell,2*cell)
    ellipse(cell*14+cell,cell*2*i+3*cell,cell*1.5)
    ellipse(cell*2*i+cell,cell*15,cell*1.5)
  }

  _buttons(0,14,0,true)

  function _buttons(_x,_y,_n,_t){
    fill(_n,10,10)
    if(_t){
      rect(cell*_x+cell*0.25,cell*_y+cell*0.25,cell*1.5,cell*1.5)
    }else{
      ellipse(_x*cell+cell,_y*cell+cell)
    }


  }

}
