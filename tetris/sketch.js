/*

REFERENCES
https://en.wikipedia.org/wiki/Tetris
https://tetris.fandom.com/wiki
https://tetris.fandom.com/wiki/SRS
https://harddrop.com/wiki/SRS

*/




//const tetris = new Tetris()
let tetris

function setup() {
	tetris= new Tetris()
	const [cvWidth,cvHeight] = tetris.calcSize()

	createCanvas(cvWidth,cvHeight)
}

function draw() {

	tetris.update(millis())

	tetris.draw()
}


