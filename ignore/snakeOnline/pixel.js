class Pixel{
    constructor(canva,w){
      this.dom=document.createElement("div")
      this.dom.classList.add("pixel")
      this.dom.style.width=w+"px"
      this.dom.style.height=w+"px"
      canva.appendChild(this.dom)
    }

    paint(){
        this.dom.style.background=this.color
    }

    setColor(c){
        this.color=c
    }
  }