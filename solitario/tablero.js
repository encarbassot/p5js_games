



function Tablero(mazo){
  this.grab = []
  this.g = 2
  this.moves = 0;
  this.start = 0
  this.end = 0
  this.pila = []
  this.subPila = []
  this.monton = []
  this.columnas = []
  this.decks = []
  this.allCards = []
  this.rainingCards = []
  this.allC = []
  this.from ={n:0,i:0,j:0}
  this.cardW = minSide/(TABLERO_COLUMNAS+1)
  this.sp = this.cardW/(TABLERO_COLUMNAS+1)
  this.aux = [[this.decks],this.columnas,[this.monton]]
  this.win = false
  this.mouseOff ={x:0,y:0}
  this.move = function(from,to,n){

    // console.log('move',from,'->',to,'('+n+')');
    // let aux = [[this.decks],this.columnas,[this.monton]]
    if (from.n==0&&n>1
      // ||(from.n==to.n&&from.j==to.j)
    ) {
      return false
    }
    if(to.n==0&&n==1){
      //as its only 1 element with a pop we can do
      let buffer = this.aux[from.n][from.i][this.aux[from.n][from.i].length-1]//.pop()//[from.j]
      // console.log('buffor to deck',buffer);
      if (this.ableToMove(buffer,to)) {
        this.aux[to.n][to.i][to.j].push(this.aux[from.n][from.i].pop())
        if (this.aux[from.n][from.i].length>0) {
          this.aux[from.n][from.i][this.aux[from.n][from.i].length-1].isOnTop()

        }

      }
    }else if (to.n==1) {
      if (n==1) {
        let buffer
        if (from.n == 0) {
          buffer = this.aux[from.n][from.i][from.j][this.aux[from.n][from.i][from.j].length-1]
          // console.log('dek buffor to col',buffer);
          if (this.ableToMove(buffer,to)) {
            if(this.aux[to.n][to.i].length>0){
              this.aux[to.n][to.i][this.aux[to.n][to.i].length-1].isUnder(buffer)
            }
            this.aux[to.n][to.i].push(this.aux[from.n][from.i][from.j].pop())
          }
        }else{
          buffer = this.aux[from.n][from.i][this.aux[from.n][from.i].length-1]
          console.log('buffor to col',buffer);
          if (this.ableToMove(buffer,to)) {
            if(this.aux[to.n][to.i].length>0){
              this.aux[to.n][to.i][this.aux[to.n][to.i].length-1].isUnder(buffer)
            }
            this.aux[to.n][to.i].push(this.aux[from.n][from.i].pop())
            if (this.aux[from.n][from.i].length>0) {
              this.aux[from.n][from.i][this.aux[from.n][from.i].length-1].isOnTop()
            }
        }
          // console.log('able');

        }
      }else {
        let arrToMove =[]
        let buffer = this.aux[from.n][from.i][from.j];
        if (this.ableToMove(buffer,to)) {
          if (this.aux[to.n][to.i].length>0) {
            this.aux[to.n][to.i][this.aux[to.n][to.i].length-1].isUnder(buffer)
          }
          while (this.aux[from.n][from.i].length>from.j) {
            arrToMove.push(this.aux[from.n][from.i].pop())
          }
          while(arrToMove.length>0) {
            this.aux[to.n][to.i].push(arrToMove.pop())
          }
          if (this.aux[from.n][from.i].length>0) {
            this.aux[from.n][from.i][this.aux[from.n][from.i].length-1].isOnTop()
          }
        }
      }
    }
    if (this.monton.length==0&&this.subPila.length>0) {
      console.log('000');
      this.monton.push(this.subPila.pop())
      this.monton[this.monton.length-1].flip(true)
    }
  }
  this.ableToMove = function(card,to){
    let topCard
    switch (to.n) {
      case 0://drop on decks
      topCard = this.aux[to.n][to.i][to.j]

        if (topCard.length==0) {
          if (card.number==0) {
            this.moves++
            return true
          }
        }else{
            topCard = topCard[topCard.length-1]
            if (topCard.number==card.number-1&&topCard.deck==card.deck) {
              this.moves++
              return true
            }

        }
        return false
        break;
        case 1://drop on columns
          if (this.aux[to.n][to.i].length==0) {//leaving column is empty
            if (card.number==numeration.length-1) {//and card is a K
              this.moves++
              return true
            }
          }else{//column not empty
            topCard = this.aux[to.n][to.i][this.aux[to.n][to.i].length-1]
            if(topCard.deck%2!=card.deck%2//deck oposite color
              &&topCard.number-1==card.number) {//card is on less
              this.moves++
              return true
            }
          }
          break;
    }
    return false
  }



  this.checkClick = function(){
    // console.log(this.grab);
    if (mouseIsPressed&&!prevMousePressed) {
      if (this.start == 0) {
        console.log('START');
        this.start = Date.now()
      }
      let g=0
      for (var i = 0; i < this.decks.length; i++) {
        if(this.decks[i].length>0)
        g+= this.tryToGrab(this.decks[i][this.decks[i].length-1],0,0,i)
      }
      for (var j = 0; j < this.columnas.length; j++) {
        for (var i = 0; i < this.columnas[j].length; i++) {
          let ni = this.columnas[j].length-1-i
          g+=this.tryToGrab(this.columnas[j][ni],1,j,ni)
        }
      }
      for (var i = 0; i < this.monton.length; i++) {
        g+=this.tryToGrab(this.monton[i],2,0,i)
      }
      if (this.subPila.length>0&&!this.subPila[this.subPila.length-1].upsidedown) {
        g+=this.tryToGrab(this.subPila[this.subPila.length-1])
      }


      // console.log(this.from);
      // for (var i = 0; i < this.allCards.length; i++) {
      //   let g = this.tryToGrab(i)//this.allCards[i])
      //   if(g>0)break
      // }
    } else if(!mouseIsPressed&&this.grab.length>0) {

      for (var i = 0; i < TABLERO_DECK; i++) {
        let p = this.pos(0,i)
        if (incoords(p)) {
          this.move(this.from,{n:0,i:0,j:i},this.grab.length)
          // console.log(i,'decks');
        }
      }
      for (var i = 0; i < TABLERO_COLUMNAS; i++) {
        let p = this.pos(2,0,i)
        if (incoords(p.x,p.y,this.cardW,minSide)) {
          this.move(this.from,{n:1,i:i,j:0},this.grab.length)
          // console.log(i,'column');
        }
      }


      for (var i = 0; i < this.grab.length; i++) {
        this.grab[i].onGrab = false
      }
      this.grab = []

    }

    let cardsOnDecks = 0
    for (var i = 0; i < this.decks.length; i++) {
      cardsOnDecks+=this.decks[i].length
    }
    if (cardsOnDecks==this.allCards.length) {
      this.winit()
    }
  }

  this.tryToGrab = function(_card,n=0,i=0,j=0){
    let grabbing = 0
    if(_card.enabled&&this.grab.length==0){
      if (incoords(_card)) {
        // console.log('_card',_card);
          if (!_card.onGrab) {
            let card = _card
            this.mouseOff = card.mouseOffset();
            this.grabC(card)
            this.from.n=n
            this.from.i=i
            this.from.j=j
            grabbing ++
            while(card.cardOnTop!=undefined){
              card = card.cardOnTop
              this.grabC(card)
              grabbing++
            }
            // console.log('grabb',this.grab);
          }
          // break
        }
      }else if (_card.upsidedown&&incoords(_card)) {
        switch (n) {
          case 1:
              if (j==this.columnas[i].length-1) {
                _card.flip(true)
              }
            break;
        }
      }
      return grabbing
    }

  this.grabC = function(card){
    card.onGrab = true
    this.grab.push(card)
  }

  this.newMonton = function (){
    this.monton.reverse()
    while( this.monton.length>0) {//del monton a la subPila
      this.monton[this.monton.length-1].flip(false)
      this.subPila.push(this.monton.pop())
    }
    if(this.pila.length<=0){//si no hay cartas en pila pasa subpila a pila
      while (this.subPila.length>0) {
        let a = this.subPila.pop()
        a.flip(false)
        this.pila.push(a)
      }
    }else{
      // console.log('monton empty',this.monton.length);
      let n = min(this.pila.length,MONTON_GRUP)
      for (var i = 0; i < n; i++) {//de la pila al monton
        this.monton.push(this.pila.pop())
        this.monton[i].flip(true,i==n-1)
      }
    }
    return [this.pila.length,this.monton.length,this.subPila.length,this.pila.length+this.monton.length+this.subPila.length]
  }

  this.create = function(_mazo){
    for (var i = 0; i < _mazo.length; i++) {
      this.allCards.push(_mazo[i])
    }
    for (let i = 0; i < TABLERO_DECK; i++) {
      // this.decks.push([_mazo.pop()])
      this.decks.push([])
    }
    for (let i = 0; i < TABLERO_COLUMNAS; i++) {
      this.columnas.push([])
      for (var j = 0; j <= i; j++) {
        this.columnas[i].push(_mazo.pop())
        if (j>0) {
          this.columnas[i][j-1].cardOnTop = this.columnas[i][j]
        }
        if (j==i) {
        // if (j>i/2) {
          this.columnas[i][j].flip(true)
        }
      }
    }
    this.pila = _mazo
    // this.allC = []
    console.log('tablero ready',this);
  }
1
  this.winit = function(){
    this.end = Date.now()
    let m = this.moves
    let ellapsed = this.end-this.start
    this.win = true
    this.allCards.sort(this.sort)
    addCardToRain()
    setTimeout(function(){modalText.innerHTML = millisToDate(ellapsed,m);modal.style.display = "block";},3000)
  }

  this.rain = function(){
    for (var i = 0; i < this.rainingCards.length; i++) {
      this.rainingCards[i].move(this.g)
      this.rainingCards[i].show()
    }
  }

  this.addCardToRain = function(){
    if (this.allCards.length>0) {
      this.rainingCards.push(this.allCards.pop())
      //flip the card 20% probability
      this.rainingCards[this.rainingCards.length-1].upsidedown=random()>0.8?!this.rainingCards[this.rainingCards.length-1].upsidedown:this.rainingCards[this.rainingCards.length-1].upsidedown
      // setTimeout(this.addCardToRain,500+random(500))
      return true
    }
    return false
  }

  this.sort = function(a,b){
    return a.number-b.number
  }

  this.show = function (){
    for (var i = 0; i < this.decks.length; i++) {
      // console.log(this.decks[i][this.decks[i].length-1]);
      let p = this.pos(0,i)//DECKS
      if (this.decks[i].length<2) {
        this.mark(p.x,p.y)  //marks of decks
      }
      if(this.decks[i].length>1){
        this.decks[i][this.decks[i].length-2].show(p.x,p.y)
        //under card of decks
      }
      if(this.decks[i].length>0){
        this.decks[i][this.decks[i].length-1].show(p.x,p.y)
        //top card of decks
      }
    }

    let _p = this.pos(1,0)//PILA
    this.mark(_p.x,_p.y,true)//mark with circle
    for (var i = 0; i < min(this.pila.length,MONTON_GRUP); i++) {
      let p = this.pos(1,i)
        this.pila[i].show(p.x,p.y)
    }
    for (var j = 0; j < this.columnas.length; j++) {
      let _p = this.pos(2,0,j)//COLUMN
      this.mark(_p.x,_p.y)
      let ysp = 0
      for (var i = 0; i < this.columnas[j].length; i++) {
        let p = this.pos(2,i,j)
        this.columnas[j][i].show(p.x,p.y+ysp)
        ysp+=this.columnas[j][i].upsidedown?this.sp*1.1:this.sp*3
      }
    }
    for (var i = 0; i < min(this.subPila.length,MONTON_GRUP); i++) {
      let p = this.pos(3,min(this.subPila.length,MONTON_GRUP)-i-1)
      this.subPila[this.subPila.length+i-min(this.subPila.length,MONTON_GRUP)].show(p)
    }
    for (var i = 0; i < min(this.monton.length,MONTON_GRUP); i++) {
      let p = this.pos(3,i)//MONTON
      this.monton[i].show(p.x,p.y)
    }

      push()
      translate(mouseX,mouseY)
      rotate(max(min(movedX*0.05,0.5),-0.5))
      for (var i = 0; i < this.grab.length; i++) {

          let p = this.pos(4,i)
          this.grab[i].show(p.x,p.y,true)

        }
      pop()
  }
  this.pos = function(k,i,j=undefined){
    let p = {x:this.sp,y:this.sp}
    switch (k) {
      case 0://DECKS
        p.x=(this.cardW*(TABLERO_COLUMNAS+1))-this.sp*(1+i)-this.cardW*(i+1)
        break;
      case 1://PILA
        p.x = this.sp+i%3*this.sp
        break;
      case 2://COLUMNAS
        p.x = this.sp*(1+j)+(j)*this.cardW
        p.y = this.cardW*CARD_RATE*1.5//+this.sp*3*i
        break;
      case 3://MONTON
        p.x = this.cardW*1.5+i*this.sp*3
        break;
      case 4://GRAB
          p.x = -this.mouseOff.x
          p.y = -this.mouseOff.y+this.sp*i*3
        break;

    }
    return p
  }
  this.mark = function(x,y,circle = false){
    let w = this.cardW,h = this.cardW*CARD_RATE
    noFill()
    stroke(200)
    strokeWeight(2)
    rect(x,y,w,h,w/10)
    if (circle) {
      strokeWeight(5)
      ellipse(x+w/2,y+h/2,w*0.7)
    }
  }




  this.create(mazo)
}


function Card(deck,number,usd=true){
  this.x=0
  this.y=0
  this.vx = (random(width)-width/2)/10
  this.vy = 0
  this.cardOnTop = undefined
  this.onGrab = false
  this.enabled = false
  this.deck = deck
  this.number = number
  this.char = numeration[number]
  this.img = deckimg[deck]
  this.color = deck%2==0?color(255,0,0):color(0)
  // this.w = cardW
  // this.h = this.w*CARD_RATE
  this.upsidedown = usd

  this.flip = function(upVisible,enabled = undefined){
    this.enabled = enabled == undefined?upVisible:enabled

    this.upsidedown = !upVisible
  }

  this.isOnTop = function(){
    this.cardOnTop = undefined
    if (!this.upsidedown&&!this.enabled) {
      this.enabled = true
    }
  }
  this.isUnder = function(card){
    this.cardOnTop=card
  }

    this.show = function(_x=undefined,_y=undefined,grabing = false){
      let x,y
      if (_x==undefined) {
        x=this.x
        y=this.y
      }else if (_y==undefined) {
        x=_x.x
        y=_x.y
      }else {
        x=_x
        y=_y
      }
      if (!grabing) {
        this.x = x
        this.y = y
      }
      // console.log(this.char,this.deck);
      if (!this.onGrab||grabing) {//show only the grab one

      let sp=tablero.cardW/10
      fill(255)//this.onGrab&&!grabing?color(150):255)
      stroke(this.upsidedown?color(3,122,188):color(200))
      strokeWeight(3)
      rect(x,y,tablero.cardW,tablero.cardW*CARD_RATE,tablero.cardW/10)
      if (this.upsidedown) {
        image(reverseImg,x+sp/2,y+sp/2,tablero.cardW-sp,tablero.cardW*CARD_RATE-sp)
      }else {
        fill(this.color)
        noStroke()
        textSize(tablero.cardW/4)
        text(this.char,x+sp,y+sp)
        image(this.img,x+tablero.cardW-sp-tablero.cardW/3,y+5,tablero.cardW/3,tablero.cardW/3)
      }
    }

  }
  this.move = function(g){
    this.x += this.vx
    this.vy += g
    this.y += this.vy
    if (this.y>height) {
      this.vy=-this.vy
    }
  }
  this.mouseOffset = function(){
    return {x:mouseX-this.x
           ,y:mouseY-this.y}
  }
}
