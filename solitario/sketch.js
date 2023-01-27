let deckimg=[],reverseImg
let numeration = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
let tablero
let prevMousePressed = false
let minSide

let TABLERO_COLUMNAS = 7
let TABLERO_DECK = 4
let CARD_RATE = 1.5
let MONTON_GRUP = 3
// let cardW = 0


function preload(){
  reverseImg = loadImage('reverse.png')
  for (var i = 0; i < TABLERO_DECK; i++) {
    //load images
    deckimg.push(loadImage('deck'+(i+1)+'.png'))
  }
}


function windowResized(){resizeCanvas(windowWidth,windowHeight)}
function setup() {
  pixelDensity(1)
  document.body.style.background='rgb(18,53,91)'
  document.body.style.overflow='hidden'
  createCanvas(windowWidth,windowHeight-5);
  minSide=min(width,height)
  //createCanvas(900,600)
  textAlign(LEFT,TOP)
  ellipseMode(CENTER)
  tablero = new Tablero(newMazo())


}

function draw() {
  // background(255);
  if (!tablero.win) {
    background(18,53,91);
    tablero.show()
    tablero.checkClick()
  }else{
    tablero.rain()
  }



  fill(fullScreenMode?color(255,100):255)
  drawFullscreen(tablero.sp,height-tablero.sp*4,tablero.sp*3)
  // noLoop()
  prevMousePressed = mouseIsPressed
}

// function test(){//DEVELO
//   for (var i = 0; i < tablero.monton.length; i++) {
//     let to = tablero.columnas[i][tablero.columnas[i].length-1]
//     let fr = tablero.monton[i]
//     to.char = numeration[(fr.number+1)]
//     to.number = fr.number+1
//     to.deck = (fr.deck+1)%TABLERO_DECK
//     to.color = to.deck%2==0?color(255,0,0):color(0)
//     to.img = deckimg[to.deck]
//   }
// }


function newMazo(){//genera un array de cartas mezcladas
  let mazo = []
  // cardW = min(windowWidth,windowHeight)/(TABLERO_COLUMNAS+1)
  for (var i = 0; i < deckimg.length; i++) {
    for (var j = 0; j < numeration.length; j++) {
      mazo.push(new Card(i,j))
    }
  }
  shufflearr(mazo)
  return mazo
}

function shufflearr(array) {
  array.sort(() => Math.random() - 0.5);
}


function mouseClicked(){
  if (incoords(0,0,tablero.cardW*0.4)){//,tablero.cardW,tablero.cardW*CARD_RATE)) {
    tablero.newMonton()
  }
  fullscreenClick()
}

function incoords(a,b=undefined,c=undefined,d=undefined,e=undefined){
  // console.log(a,b,c,d);
  let x,y,m=0,w= tablero.cardW,h = tablero.cardW*CARD_RATE
  if (b==undefined) {
    // console.log('1param');
    x=a.x
    y=a.y
  }else if(c==undefined) {
    // console.log('2params');
    x=a
    y=b
  }else if (d==undefined) {
    // console.log('3params');
    x=a
    y=b
    m=c
  }else if (e==undefined) {
    // console.log('4params');
    x=a
    y=b
    w=c
    h=d
  }else {
    // console.log('5params');
    x=a
    y=b
    w=c
    h=d
    m=e
  }
  // console.log(x,y,w,h);

  return mouseX>=x-m&&mouseX<x+w+m&&mouseY>=y-m&&mouseY<y+h+m
}

// function mouseOffset(card){
//   return {x:
//          ,y:}
// }

function isCardInList(card,list){
  let found = false
  for (var i = 0; i < list.length&&!found; i++) {
    if (card.deck==list[i].deck&&card.char==list[i].char) {
      found = true
    }
  }
  return found
}
function addCardToRain(){
  if(tablero.addCardToRain()){
    setTimeout(addCardToRain,500+random(1500))
  }
}

function millisToDate(d,moves){
  let result=''
  let millis = d%1000
  let s=floor(d/1000%60)
  let m=floor(d/60000%60)
  let h=floor(d/3600000%24)
  let a=floor(d/86400000)

  result+='<h2>YOU WIN</h2>'
  result+='<b>Moves: </b>'+moves+'<br><br>'

  result+=a>0?a+'<b> Days </b>':''
  result+=h>0||a>0?h+' : ':''
  result+=m>0||h>0||a>0?m+' : ':''
  result+=s+'<sub>'+forceDigits(millis,3)+'</sub>'

  return result

}
function forceDigits(x,n){
   let y = x.toString()
   for (var i = 0; i <= n-y.length-1; i++) {
     y='0'+y
   }
   return y
}
