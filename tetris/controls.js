class Controls{
  constructor(parent){
    this.parent = parent

    document.addEventListener('keydown', event => {this.handleKeyDown(event)})
  
  }

  handleKeyDown(event){

    if ([" ","r","p", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    	event.preventDefault();
    }

    switch (event.key) {
      case " ":
        this.parent.cont_drop()
      break;
        
      case "x":
      case "ArrowUp":
        this.parent.cont_rotateCW()
      break;

      case 'z':
        this.parent.cont_rotateCCW();
      break;
        
      case "s":
      case "ArrowDown":
        this.parent.cont_down()
      break;
        
      case "a":
      case "ArrowLeft":
        this.parent.cont_left()
      break;

      case "d":
      case "ArrowRight":
        this.parent.cont_right()
      break;

      case "h":
      case "c":
        this.parent.cont_hold()
      break;
        
      case 'r':
        this.parent.cont_reset()
      break;
        
      case 'p':
        this.parent.cont_pause()
      break;

      case 'g':
        this.parent.cont_ghost();
      break;

      case 'l':
        this.parent.cont_gridlines();
      break;



      // Testing
      // -------
      case 'w':
        this.parent.cont_test_up()
      break;
        
      case 'n':
        this.parent.cont_test_new()
      break;

      case 't':
        this.parent.cont_test_srs()
      break;

    }//end of switch case

  }//end of handleKeyDown()

}//end of class Controls()


