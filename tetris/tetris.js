class Tetris{
    constructor(p){
        this.p=p //p5.js
        this.testing = false

        console.log("TETRIS")
        this.columns = 10
        this.rows = 22
        this.cellSize = 21;

        this.prevMillis = 0
        
        this.fallingPiece
        this.ghostPiece
        this.holdingPice
        this.waitingBuffer=[]
        this.waitingLength = 3
        
        this.gameOver=false
        this.paused = false
        this.ghostMode = true
        
        this.board = new Board(this,this.columns,this.rows,this.cellSize)
        this.controls = new Controls(this)
        
        this.fillWaiting(this.waitingLength)
        this.spawnNewPiece()
    }



    update(millis){
        // Get time passed since last frame
        const currentMillis = millis
        const delta = currentMillis - this.prevMillis
        this.prevMillis = currentMillis

        // Update
        if (this.paused || this.gameOver){
            return
        }

        this.fallingPiece.update(delta)
        // move down piece and spawn a new one
        // if necessary
        if (this.fallingPiece.timeToFall()) {
            this.fallingPiece.resetBuffer()
            this.fallingPiece.moveDown()

            if (!this.board.isValid(this.fallingPiece)) {
                this.fallingPiece.moveUp()
                this.spawnNewPiece()
            }

            this.redrawGhost()
            

        }


        this.board.clearLines()


    }

    redrawGhost(){
        // copy falligPiece's location and
        // orientation, then hardDrop() it
        // if ghostMode is on
        this.ghostPiece.copy(this.fallingPiece)
        this.hardDrop(this.ghostPiece)
    }

    draw(){
        this.p.background(251)
        this.board.show(this.p)

        this.showSideMenu(this.p,this.waitingBuffer,this.holdingPice)
        

        

        if (this.ghostMode){
            this.ghostPiece.show(this.p)
        } 
        this.fallingPiece.show(this.p)


        this.p.fill(0)
        this.p.textSize(30)
        this.p.text(this.board.clearedLines,this.cellSize*12,this.cellSize*2)

        if(this.paused){
            if(this.testing){
                this.p.fill(40,20)
                this.p.textSize(10)
            }else{
                this.p.textSize(40)
                this.p.fill(40,50)
            }
            this.p.rect(0,0,this.p.width,this.p.height)
            this.p.textAlign(this.p.CENTER,this.p.CENTER)
            this.p.fill(0)
            this.p.text("PAUSE",this.p.width/2,this.p.height/2)
        }

        if(this.gameOver){
            this.p.fill(40,50)
            this.p.rect(0,0,this.p.width,this.p.height)
            this.p.textAlign(this.p.CENTER,this.p.CENTER)
            this.p.fill(0)
            this.p.textSize(40)
            this.p.text("GAME",this.p.width/2,this.p.height/2-30)
            this.p.text("OVER",this.p.width/2,this.p.height/2+30)
        }

        
    }


    showSideMenu(p,waiting,holding){
        let x = 11
        let y = this.rows - 5 - 11

        const cs = this.cellSize

        p.fill(240)
        p.stroke(170)

        p.rect(x*cs,y*cs,5*cs,10*cs)
        p.noStroke()

        this.showPiece(p,waiting[0],x + 0.5,y+1,cs)
        this.showPiece(p,waiting[1],x + 0.5,y+3+1,cs)
        this.showPiece(p,waiting[2],x + 0.5,y+6+1,cs)

        x = 11
        y = this.rows -5

        p.fill(240)
        p.stroke(170)

        p.rect(x*cs,y*cs,5*cs,5*cs)
        p.noStroke()

        if(this.holdingPice){
            this.showPiece(p,this.holdingPice.type,x + 0.5,y +1,cs)
        }
    }

    showPiece(p,piece,_x,_y,cellSize) {
        //TODO repeated in Piece.js:show()[46]
        const tetromino = tetrominoes[piece]
        p.fill(tetromino.color)
        if(tetromino.w===3){
            _x+=0.5
        }

        if(tetromino.h===1){
            _y-0.5
        }
		

        for (const [col,row] of tetromino.tiles) {
            let x = (_x + col +1) * cellSize;
            let y = (_y + (-row) +1) * cellSize;
			p.rect(x, y, cellSize-1, cellSize-1);
		}

	}

    click(mouseX,mouseY){

        if(this.testing){
            const col = Math.floor(mouseX/this.cellSize)
            const row = Math.floor(mouseY/this.cellSize)

            console.log("HOLA",row,col,col>=0 , col < this.columns , row>=0 , row <this.columns)
            if(col>=0 && col < this.columns && row>=0 && row <this.rows){
                if(this.board.grid[row][col]){
                    this.board.grid[row][col]=0
                }else{
                    this.board.grid[row][col]=1
                }
            }
        }
    }


    calcSize(){
        let waitingWidth = this.cellSize*6
	
        let totalWidth = this.cellSize * this.columns + this.board.borderSize*2 + waitingWidth
        let totalHeight = this.cellSize * this.rows + this.board.borderSize*2

        return [totalWidth,totalHeight]
    }


    fillWaiting(n){
        for(let i=0;i<n;i++){
            this.newInWaiting()
        }
    }

    newInWaiting(){
        const pieces = ['O', 'J', 'L', 'S', 'Z', 'T', 'I']

        let result = undefined
        while(this.waitingBuffer.length>=this.waitingLength){
            result = this.waitingBuffer.shift()
        }
        
        const npieces = pieces.filter(x=>!this.waitingBuffer.includes(x))
        const iRand = Math.floor(Math.random()*npieces.length)
        this.waitingBuffer.push(npieces[iRand])
        
        return result
    }

    hardDrop(piece) {

        // move down as long as current position is valid
        while (this.board.isValid(piece)) {
            piece.moveDown()
        }
        
        // in the last iteration the position isn't valid, so move up
        piece.moveUp()
    }


    spawnNewPiece(){
        //add the current piece to the board
        if (this.fallingPiece) {
            const correct = this.board.addToGrid(this.fallingPiece)

            if(!correct){
                this.gameOver=true
                return
            }
        }

        let current
        if(this.holdingPice){
            this.fallingPiece = this.holdingPice
            this.holdingPice=undefined

        }else{
            current = this.newInWaiting()
            this.fallingPiece = new Piece(current, this.board)
        }
        
        
        
        this.ghostPiece = new Piece(this.fallingPiece.type, this.board)
        this.ghostPiece.isghost = true
        this.ghostPiece.cells = this.fallingPiece.cells
    
        this.p.redraw()
    }
    



    //CONTROLS
    cont_hold(){
        if(!this.paused || this.testing){
            if(!this.holdingPice && !this.fallingPiece.isholded){
                const buffer = this.fallingPiece
                this.fallingPiece=undefined
    
                this.spawnNewPiece()
                this.holdingPice = buffer
                this.holdingPice.resetCoords(this.board)
                this.holdingPice.isholded=true
            }
        }
    }

    cont_rotateCCW(){
        if(!this.paused || this.testing){   
            this.fallingPiece.rotateCCW();
            // if not valid, rotate back
            if (!this.board.isValid(this.fallingPiece)){
                this.fallingPiece.rotateCW();
            }
            this.redrawGhost()
        }

    }

    cont_rotateCW(){
        if(!this.paused || this.testing){

            this.fallingPiece.rotateCW();

            // if not valid, rotate back
            if (!this.board.isValid(this.fallingPiece)){
                this.fallingPiece.rotateCCW();
            }
            this.redrawGhost()
        }
    }

    cont_drop(){
        if(!this.paused || this.testing){
        
            this.hardDrop(this.fallingPiece);
            this.spawnNewPiece();
            this.redrawGhost()
        }
    }

    cont_down(){
        if(!this.paused || this.testing){

            this.fallingPiece.moveDown();
            if (!this.board.isValid(this.fallingPiece)){
            this.fallingPiece.moveUp()
            }else{
            this.fallingPiece.resetBuffer()
            }
            this.redrawGhost()
        }
    }

    cont_left(){
        if(!this.paused || this.testing){

            this.fallingPiece.moveLeft();
            if (!this.board.isValid(this.fallingPiece)){
                this.fallingPiece.moveRight()
            }
            this.redrawGhost()
        }
    }

    cont_right(){
        if(!this.paused || this.testing){

            this.fallingPiece.moveRight();
            if (!this.board.isValid(this.fallingPiece)){
                this.fallingPiece.moveLeft()
            }
            this.redrawGhost()
        }
    }


    //controls utils

    cont_reset(){
        this.holdingPice=undefined
        this.paused = false
        this.waitingBuffer=[]
        this.fillWaiting(this.waitingLength)
        this.spawnNewPiece();
        this.board.resetGrid();
        this.gameOver=false
    }

    cont_pause(){
        this.paused = !this.paused;
    }

    cont_ghost(){
        this.ghostMode = !this.ghostMode
    }

    cont_gridlines(){
        this.board.gridlines = !this.board.gridlines
    }


    //controls for testing

    cont_test_up(){
        if(this.testing){
            this.fallingPiece.y--;
        }else{
            this.cont_rotateCW()
        }
    }

    cont_test_new(){
        if(this.testing){
            this.spawnNewPiece()
        }
    }

    cont_test_srs(){
        if(this.testing){
            this.fallingPiece.showNextSRS(true)

            console.log(this.fallingPiece.showSRS,this.fallingPiece.showSRSIndex)
        }

    }

    

}//end of class Tetris()
