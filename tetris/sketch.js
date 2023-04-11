//const tetris = new Tetris()
let tetris
new p5((p)=>{
	p.pixelDensity(1)

	tetris = new Tetris(p)

    p.setup = ()=>{
		const touch = isTouchDevice()
		const [cvWidth,cvHeight] = tetris.calcSize(p.windowWidth,touch)

      	p.createCanvas(cvWidth,cvHeight);

		if(touch){
			controlls(tetris)
		}
    }
	p.draw=()=>{
		tetris.update(p.millis())

	 	tetris.draw()
	}

	p.mouseClicked=()=>{
		tetris.click(p.mouseX,p.mouseY)
	}
},document.getElementById("canvasContainer"));


//PHONE CONTROLLS
function controlls(tetris){
	const phoneControls = new PhoneControls(
		{
			reset:	document.getElementById("btn_reset"),
			pause:	document.getElementById("btn_pause"),
			rotate:	document.getElementById("btn_rotate"),
			left:	document.getElementById("btn_left"),
			down:	document.getElementById("btn_down"),
			right:	document.getElementById("btn_right"),
			hold:	document.getElementById("btn_hold"),
		},tetris
	)
}



//detect if device has touchScreen
function isTouchDevice() {
	return 'ontouchstart' in window ||
		   navigator.maxTouchPoints > 0 ||
		   navigator.msMaxTouchPoints > 0;
}