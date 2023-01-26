class Board {

	constructor(parent,w, h,size = 21) {

		this.parent=parent
		// colors
		this.foreground = 0;
		this.background = [170];
		
		// dimensions and grid
		this.cols = w;
		this.rows = h;
		this.grid = [];
		this.resetGrid();
		
		// drawing sizes
		this.cellSize = size;
		this.borderSize = 3;

		// whether or not gridlines are seen
		this.gridlines = true;
	}

	addToGrid(piece) {
		const type = piece.tetrominoe.type

		for (const [x,y] of piece.tetrominoe.tiles) {
			const row = piece.y +(-y)+1
			const col = piece.x +x
			if(row>=0){
				this.grid[row][col] = type
			}else{
				return false
			}
		}
		return true
	}
	



	
	clearLines() {
		
		for (let row = this.rows-1; row >= 0; row--) {

			// if this row is full
			if (!this.grid[row].includes(this.foreground)) {
				// remove the row
				this.grid.splice(row, 1)
				// and add an empty row to the top
				this.grid.unshift(new Array(this.cols).fill(this.foreground));
			}
			
		}
		
	}
	
	isValid(piece,xoff=0,yoff=0) {
		
		for (const tile of piece.tetrominoe.tiles) {

			const [gridCol,gridRow] = piece.getColRow(tile)
			const col = gridCol + xoff
			const row = gridRow + yoff


			const okLeft   = col >= 0
			const okRight  = col <  this.grid[0].length
			const okTop    = row >= 0
			const okBottom = row <  this.grid.length
			

			if(!okLeft || !okRight || !okBottom){
				return false
			}

			if(okTop){
				const isOcupied = this.grid[row][col] != this.foreground
				if(isOcupied){
					return false
				}
			}

		}
		
		return true;
		
	}

	
	
	resetGrid() {
		for (let i = 0; i < this.rows; i++) {
			this.grid[i] = new Array(this.cols).fill(this.foreground);
		}
	}
	
	
	show(p) {
		//===========================
		// Draw the rectangle behind all the cells
		// for the border and gridlines
		//===========================


		if (this.gridlines){
			p.fill(this.background)
		}else{
			p.fill(240);
		}
		
		p.stroke(this.background)
		p.strokeWeight(this.borderSize);

		// offset the rectangle so that
		// top and right borders stay in canvas
		let offset = Math.floor(this.borderSize / 2)

		const rectangle_width = this.cellSize * this.cols + this.borderSize - 1
		const rectangle_height = this.cellSize * this.rows + this.borderSize - 1
		p.rect(offset, offset, rectangle_width, rectangle_height)
		
		
		//===========================
		// Draw cells over the big rectangle
		//===========================

		for (let row = 0; row < this.grid.length; row++) {
			for (let col = 0; col < this.grid[row].length; col++) {
				
				
				// this.grid contains the colors of each cell
				if(this.grid[row][col] === this.foreground){
					p.fill(240)
				}else{
					const type = this.grid[row][col]
					let color
					if(typeof(type)=="string"){
						console.log(typeof(type))
						color = tetrominoes[ type ].color
					}else{
						color = type
					}
					p.fill(color)
				}
				
				p.noStroke();
				const x_pos = this.cellSize * col + this.borderSize
				const y_pos = this.cellSize * row + this.borderSize
				const width = this.cellSize - 1
				p.rect(x_pos, y_pos, width, width);
			}
		}

		
	} // end of show()


}//end of class Board()