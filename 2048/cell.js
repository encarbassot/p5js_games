let wid
let spc
let siz

let colors={
  "0":{
    size: 0.5,
    color: "#cbbfb3",
    text: (100)
  },
  "2":{
    size: 0.5,
    color: "#eee1d8",
    text: (100)
  },
  "4":{
    size:0.5,
    color:"#dfd3bd",
    text: (100)
  },
  "8":{
    size:0.5,
    color:"#f1ae7a",
    text: (255)
  },
  "16":{
    size:0.5,
    color:"#f59364",
    text: (255)
  },
  "32":{
    size:0.5,
    color:"#f67c5f",
    text: (255)
  },
  "64":{
    size:0.5,
    color:"#f65b3c",
    text: (255)
  },
  "128":{
    size:0.3,
    color:"#e2462d",
    text: (255)
  },
  "256":{
    size:0.3,
    color:"#c96601",
    text: (255)
  },
  "512":{
    size:0.3,
    color:"#fe9730",
    text: (255)
  },
  "1024":{
    size:0.3,
    color:"#edc53f",
    text: (255)
  },
  "2048":{
    size:0.3,
    color:"#eec22e",
    text: (255)
  },
  "else":{
    size:0.3,
    color:"#3d3a33",
    text: (255)
  }

}




function Cell(id,i,j) {
  this.id = id
  this.val = 0
  this.pos=getDesire(i,j)
  this.des=getDesire(i,j)
  this.cyc=0

  this.update = function(i,j) {
    // let err=this.pos.sub(getDesire(i,j));
    // this.pos=this.pos.add(err)

    this.des=getDesire(i,j);
    let err=this.des.sub(this.pos);
    let vel=err.mult(0.5)
    this.pos=this.pos.add(vel)

    if(this.cyc<1){
      this.cyc+=0.1
    }
    if(this.cyc>1){
      this.cyc=1
    }
  }

  this.born=function(i,j){
    this.val=(random(1)>0.1?2:4);
    this.cyc=0;
    this.pos.set(getDesire(i,j))
    this.des.set(getDesire(i,j))
  }

  this.render = function() {
    if(this.val!=0){
    let str=this.val.toString()


        fill(colors[str].color)
        rect(this.pos.x,this.pos.y,wid*this.cyc,wid*this.cyc,10)
      if(this.val!=0){
        textSize(wid*colors[str].size*this.cyc)
        fill(colors[str].text)
        text(this.val,this.pos.x,this.pos.y)
      }
    }



  }



}


function getDesire(x,y){
  return createVector(x*spc+wid/2,y*spc+wid/2);
}


function Controls(a_){
  this.active=false;
  this.pos=createVector(width/2,height-100)
  this.r=90
  this.maxR=50
  this.minR=20


  this.update=function(){
    let des;
    let errR
    if(this.active){
      des=createVector(width/2,height-this.maxR*1.2);
      errR=(this.maxR-this.r)*0.4
    }else{
      des=createVector(width-this.minR*2,height-this.minR*2);
      errR=(this.minR-this.r)*0.4
    }
    let err=des.sub(this.pos).mult(0.4);
    this.pos=this.pos.add(err)

    this.r+=errR

  }
  this.show=function(){
    fill(colors["2"].color)
    push()
    ellipseMode(CENTER )
    translate(this.pos.x,this.pos.y)
    ellipse(0,0,this.r*2)

    fill(colors["2"].text)

    for(let i=0;i<4;i++){
      triangle(0,this.r*0.8,-this.r*0.25,this.r*0.4,this.r*0.25,this.r*0.4)
      rotate(HALF_PI)
    }
    pop()
  }
}
