
class Game{
    constructor(parameters){
        /*
            difficulty:15,
            columns:undefined,
            rows:undefined,
            easyLeft:false,
            easyRight:false,
        */
        this.easyLeft = parameters.easyLeft
        this.easyRight = parameters.easyRight
        this.w = 32
        this.difficulty = parseInt(parameters.difficulty)
        this.gameStarted=false

        
        this.phone = isTouchDevice()
        this.phoneSwitch,this.phoneFunction
        this.phoneFunction=true
        if(this.phone){
            
            this.phoneSwitch = document.querySelector('#phoneSwitch')
            this.phoneSwitch.style.display='block'
            this.phoneSwitch.onclick=()=>{
                this.phoneFunction=!this.phoneFunction
                this.phoneSwitch.classList.toggle("changed");
            }
        }
        

        document.addEventListener('contextmenu', event => event.preventDefault());//disable right click
        this.canvas = document.querySelector('#canvas')
        this.face = document.querySelector('#face')
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.columns = this.minNull(parameters.columns,Math.floor(this.width/this.w)-2)
        this.rows = this.minNull(parameters.rows,Math.floor(this.height/this.w)-5)
        this.canvas.style.gridTemplateColumns = `repeat(${this.columns},${this.w}px)`

        this.grid=[]
        this.flat=[]
        this.cellBombs=[]
        this.keylog=""
        this.gameDead=false
        this.faceStatus="facesmile"

        this.bombs=0
        this.counterBombs=0

        //cheatCode
        document.addEventListener("keyup",(e) => {
            let code="xyzzyShift"
            if(e.key=='Enter'&&this.keylog  ==code){
                    //console.log('BOWUMBA')
                    //activate eastereg
            }
            this.keylog+=e.key
            this.keylog=this.keylog.slice(-code.length)
        })

        //create cells
        for(let j=0; j < this.rows; j++){
            this.grid.push([])
            for(let i=0; i < this.columns; i++){
                let c = new Cell(j,i,this)
                this.grid[j].push(c)
                this.flat.push(c)
            }
        }
        this.canvas.addEventListener('mousedown' ,e=>this.setFace('faceooh'))
        this.canvas.addEventListener('mouseup'   ,e=>this.setFace('facesmile'))
        this.canvas.addEventListener('mouseleave',e=>this.setFace('facesmile'))
        this.face  .addEventListener('mouseleave',e=>this.setFace('facesmile'))
        this.face  .addEventListener('mousedown' ,e=>this.setFace('facepressed'))
        this.face  .addEventListener('mouseup'   ,e=>this.setFace('facesmile'))
        this.face  .addEventListener('mouseup'   ,e=>this.reset())
        //set bombs
        this.setBombs()

        


    }

    reset(){
        this.gameDead=false
        this.gameStarted=false
        this.flat.forEach(c=>c.reset())
        this.setBombs()

        clearInterval(this.interval);
        this.setTimer(0)


    }

    minNull(a,b){
        if(isNaN(a))
            return b
        if(isNaN(b))
            return a
        return Math.min(a,b)
    }


    setFace(name,reset=false){
        if(!this.gameDead||reset){
            this.faceStatus=name
            this.face.classList=[name]
        }
    }


    gameOver(){
        this.setFace('facedead')
        this.gameDead=true
        clearInterval(this.interval);
        this.uncoverBombs()
        
    }

    uncoverBombs(){
        this.cellBombs.forEach(c=>c.uncover())
    }

    setBombs(){
        let bombs = Math.floor(this.columns*this.rows*this.difficulty/100)
        this.bombs = bombs
        this.counterBombs=this.bombs
        this.setCounter(this.bombs)
        while(bombs>0){
            let j = Math.floor(Math.random()*this.rows)
            let i = Math.floor(Math.random()*this.columns)
            let c = this.grid[j][i]
            if(!c.isBomb()){
                c.setBomb()
                this.cellBombs.push(c)
                bombs--;
                //console.log('has bomb',c.dom);
            }

        }

        //tel each cell the amount of bomb neighbors it has
        this.flat.forEach(cell=>{
            cell.setNei(this.countNei(cell))
        })
    }

    setCounter(n){this.setCounterTo('#counter',n)}
    setTimer(n){ this.setCounterTo('#timer',n)}
    setCounterTo(counterQuery,number){
        const counter = document.querySelector(counterQuery)
        let counters = [...counter.children]
        let n = number.toString()
        while(n.length<counters.length){
            n='0'+n
        }
        while(counters.length<n.length){
            let div = document.createElement('DIV')
            document.querySelector(counterQuery).appendChild(div)
            counters = [...counter.children]
        }
        counters.forEach((e,i)=>e.classList=['num'+n[i]])

    }

    counterAdd(n){
        this.counterBombs+=n
        this.setCounter(this.counterBombs)
        if(n==-1){
            this.checkWinByFlag()
        }
    }

    gameStart(){
        if(!this.gameStarted){
            this.gameStarted=true
            this.startTimestamp=Date.now()
            //this.startTimer()
            this.interval = setInterval(()=>{
                let t = Math.floor((Date.now()-this.startTimestamp)/1000)
                this.setTimer(t)
            }, 1000);

            //clearInterval(this.interval);
        }
    }

    

    

    countNei(cell){
        return this.getNei(cell).reduce((total,c)=>total+(c.isBomb()?1:0),0)
    }

    revealNei(cell,recursive=false){
        this.gameStart()
        if(!cell.isRevealed()){
            cell.reveal(true)
        }
        if(cell.nei==0)
        this.getNei(cell).forEach(c=>{
            if(!c.isRevealed()){
                this.revealNei(c,true)
            }
        });
        if(!recursive){
            this.checkWin()
        }
        
    }

    checkWinByFlag(){
        let allBombsFlagged = this.cellBombs.reduce((t,c)=>t&&c.isFlagged(),true)
        if(allBombsFlagged && this.counterBombs==0){
            this.makeWin()
        }
    }
    checkWin(){
        let total = this.flat.filter((n)=>!n.isRevealed())
        if(total.length==this.bombs){
            this.makeWin()
        }
    }
    makeWin(){
        this.setFace('facewin')
        this.gameDead=true
        clearInterval(this.interval);
        this.flat.forEach(c=>{
            if(!c.isBomb()){
                c.reveal(true)
            }else{
                c.toFlag()
            }
        })
    }

    getNei(cell){
        let result = []
        for(let j=cell.j-1;j<=cell.j+1;j++){
            for(let i = cell.i-1;i<=cell.i+1;i++){
                if (i>=0&&i<this.columns&&j>=0&&j<this.rows&&!(j==cell.j&&i==cell.i))
                    result.push(this.grid[j][i])
            }
        }
        return result
    }


}


class Cell{
    #revealed
    #bomb
    #flagged
    #question
    #exploded
    constructor(j,i,parent){
        this.j = j
        this.i = i
        this.parent=parent
        
        
        //DOM
        this.dom = document.createElement('div')
        parent.canvas.appendChild(this.dom)
        
        
        
        this.reset()


        this.dom.setAttribute('j',this.j)
        this.dom.setAttribute('i',this.i)
        this.dom.addEventListener('click',(event)=>this.click(event))
        this.dom.addEventListener('contextmenu',(event)=>this.rightClick(event))

        
    }

    reset(){
        this.#bomb=false
        this.#revealed=false
        this.#flagged=false
        this.#question=false
        this.#exploded = false
        this.nei=0
        this.setClass('blank')
    }

    click(event){

        if(this.parent.phone&&!this.parent.phoneFunction){
            return this.rightClick(event)
        }

        if(!this.parent.gameDead){
            this.parent.gameStart()
            if(!this.#revealed&&!this.#flagged){
                console.log('REVEAL');
                if(this.isBomb()){
                    console.log('isBomb');
                    this.#exploded=true
                    this.setClass('bombdeath')
                    this.parent.gameOver()
                }else{
                    console.log('not a bomb');
                    this.reveal()
                }
            }else if(this.parent.easyLeft){
                this.easy(true)
            }
        }
    }



    rightClick(event){
        if(!this.parent.gameDead){
            this.parent.gameStart()
            if(!this.#revealed){
                if(this.#flagged){
                    this.#flagged=false
                    this.#question=true
                    this.parent.counterAdd(1)
                    this.setClass('question')
                }else if(this.#question){
                    this.#question=false
                    this.setClass('blank')
                }else{
                    this.toFlag()
                }
            }else if(this.parent.easyRight){
                this.easy(false)
            }
        }
    }


    easy(left){
        if(left||this.parent.phone){
            console.log('try left');
            if(this.easyLeft())
                return
        }
        if(!left||this.parent.phone){
            console.log('tryRight');
            this.easyRight()
        }
    }
    easyLeft(){
        let nei = this.getNei()
        let neiFlagged = nei.reduce((t,n)=>t+(n.isFlagged()?1:0),0)
        if(neiFlagged==this.nei){
            let neiBlank = nei.filter((n)=>!n.isRevealed()&&!n.isFlagged())
            neiBlank.forEach(n=>n.reveal())
            return true
        }
        return false
    }

    easyRight(){
        let nei = this.getNei()
        let neiBlank = nei.filter((n)=>!n.isRevealed())
        if(neiBlank.length==this.nei){
            neiBlank.forEach(n=>n.toFlag())
            return true
        }
        return false
    }

    toFlag(){
        if(!this.#flagged){
            this.#flagged=true
            this.#question=false
            this.parent.counterAdd(-1)
            this.setClass('bombflagged')
        }
    }

    getNei(){return this.parent.getNei(this)}

    //when clicked
    reveal(recursive=false){
        if(!this.#flagged){

            this.#revealed=true
            if(this.isBomb()){
                this.setClass('bombdeath')
                return
            }
            
            this.parent.revealNei(this,recursive)
            this.setClass('open'+this.nei)
        }

    }

    //when game over
    uncover(){
        if(this.isBomb() && !this.#exploded){
            if(this.#flagged){
                this.setClass('bombmisflagged')
            }else{
                this.setClass('bombrevealed')
            }
        }
    }

    setBomb(set = true){this.#bomb=true}
    isBomb(){return this.#bomb}
    setClass(cl){this.dom.classList=[cl]}
    setNei(n){this.nei=n}
    isRevealed(){return this.#revealed}
    isFlagged(){return this.#flagged}
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }