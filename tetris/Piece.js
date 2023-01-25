class Piece {

	constructor(type, board, x, y) {
		// cells of this piece

		this.board = board
		this.type = type;
		// this.cells = types[type];
		this.tetrominoe = JSON.parse(JSON.stringify(tetrominoes[type]))
		this.size = this.tetrominoe.w
		this.rotationIndex = 0

		// drawing sizes
		this.cellSize = board.cellSize;
		this.offset = board.borderSize;

		// position of top-left piece relative to playfield
		this.resetCoords(board,x,y)
		
		// gravity
		this.dropInterval = 500 // in ms
		this.dropBuffer = 0; // time since last drop

		// whether this is a ghost piece
		this.isghost = false;
		this.isholded = false;

	}

	resetCoords(board,x,y){
		this.x = x === undefined ? floor((board.cols - this.size) / 2) : x;
		this.y = y || -2;
	}
	
	
	update(time) {
		this.dropBuffer += time;

		// console.log(
		// 	this.tetrominoe.tiles.map(tile => this.getColRow(tile)[1])
		// )
	}
	

	timeToFall() {    
		return this.dropBuffer > this.dropInterval
	}
	
	resetBuffer() {
		this.dropBuffer = 0;
	}

	copy(piece) {
		this.x = piece.x;
		this.y = piece.y;
		this.cells = piece.cells
		this.tetrominoe = piece.tetrominoe
	}

	

	show(){
		const color = this.tetrominoe.color
		fill(this.isghost ? '#ccc' : color)

		for (const tile of this.tetrominoe.tiles) {
			let [x,y] = this.getPixelPos(tile)
			let cs = this.cellSize;
			rect(x, y, cs-1, cs-1);

			if(this.board.parent.testing && (tile[0] === 0 && tile[1] === 0) ){
				push()
				noFill()
				stroke(0)
				ellipse(x+cs/2,y+cs/2,cs/2)
				pop()
			}
		}

	}


	getPixelPos(tile){
		let [col,row] = this.getColRow(tile)
		let x = col*this.cellSize
		let y = row*this.cellSize

		return[this.offset + x, this.offset + y]
	}

	getColRow([x,y]){
		let col = this.x + x;
		let row = this.y + (-y) +1;
		return [col,row]
	}



	moveDown() {
		this.y++;
	}
	moveRight() {
		this.x++;
	}
	moveLeft() {
		this.x--;
	}
	moveUp() {
		this.y--;
	}
	
	

	//================================
	// Rotate functions
	//================================


	// rotate clockwise
	rotateCW() {
		this.rotate(true,true)
	}

	// rotate counter-clockwise
	rotateCCW() {
		this.rotate(false,true)
	}

	rotate(clockwise,shouldOffset=true){
		const rot = clockwise?1:-1
		const r = this.rotationIndex+rot
		const newRot = (r%4+4)%4
		
		let newTiles = this.tetrominoe.tiles.map(([x,y])=>{
			return this.rotateTile([x,y],!clockwise)
		})
		this.tetrominoe.tiles = newTiles

		
		if(shouldOffset){
			const correct = this.checkOffset(this.rotationIndex,newRot)
			if(!correct){
				this.rotate(!clockwise,false)
			}
		}
		
		this.rotationIndex = newRot
	}

	rotateTile([x,y],clockwise){

		const rotMatrix = !clockwise
			? [
				[0,-1],
				[1, 0]
			]
			: [
				[0, 1],
				[-1,0]
			]
		
		const newXpos = (rotMatrix[0][0] * x) + (rotMatrix[1][0] * y)
		const newYpos = (rotMatrix[0][1] * x) + (rotMatrix[1][1] * y)

		return [newXpos,newYpos]
	}

	checkOffset(oldRotationIndex,newRotationIndex){
		//run all 5 tests

		const tests1 = this.tetrominoe.offsets[oldRotationIndex]
		const tests2 = this.tetrominoe.offsets[newRotationIndex]


		for(let i=0;i<tests1.length;i++){
			const [x1,y1] = tests1[i]
			const [x2,y2] = tests2[i]

			const xOff = x1-x2
			const yOff = y1-y2

			if(this.board.isValid(this,xOff,yOff)){
				//apply offset
				this.x += xOff
				this.y += yOff

				return true
			}

		}

		//return false if all failed
		return false
	}

}


