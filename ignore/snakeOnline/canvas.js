class Canvas{
    constructor(n,dom){
        this.n=n
        this.dom=dom




        
        this.minSide=Math.min(window.innerWidth,window.innerHeight)
        this.pWidth=this.minSide/this.n
        
        this.dom.style.width=this.minSide+"px"



        this.list=[]
        for(let i = 0;i<this.n*this.n;i++){
            let pix = new Pixel(this.dom,this.pWidth)
            this.list.push(pix)

        }

    }


    point(x,y,color){
        this.getPixel(x,y).setColor(color)
    }
    
    getPixel(x,y){
        return this.list[y*n+x]
    }

    background(color){
        for (const p of this.list) {
            p.setColor(color)
        }
    }

    draw(){
        for (const p of this.list) {
            p.paint()
        }
    }


}