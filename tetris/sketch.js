//const tetris = new Tetris()
let tetris
new p5((p)=>{

	tetris = new Tetris(p)

    p.setup = ()=>{
		const [cvWidth,cvHeight] = tetris.calcSize()

      	p.createCanvas(cvWidth,cvHeight);
    }
	p.draw=()=>{
		tetris.update(p.millis())

	 	tetris.draw()
	}

	p.mouseClicked=()=>{
		tetris.click(p.mouseX,p.mouseY)
	}
  },document.getElementById("canvasContainer"));

