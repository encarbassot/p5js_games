class Pipe{
    constructor(index,nSections,i,j,x,y,w,h,total,colorShift,layers=undefined){
        this.index=index
        this.total=total
        this.colorShift=colorShift

        this.homeX=x
        this.homeY=y

        this.x=this.homeX
        this.y=this.homeY

        this.i=i
        this.j=j
        this.w=w
        this.h=h

        this.x2=this.x
        this.y2=this.y
        this.a=0.6

        this.mouseXoff=0
        this.mouseYoff=0

        this.nSections=nSections
        this.sectionH=this.h/this.nSections
        this.holding=false
        this.layers=layers
        if(layers==undefined){
            this.layers=[]
            for(let i=0;i<this.nSections;i++){
                this.layers.push(this.index)
            }
        }

    }

    resize(x,y,w,h){
        this.homeX=x
        this.homeY=y

        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.sectionH=this.h/this.nSections
    }

    test(){
        console.log("test",this.w,this.h)
    }
    update(){
        //DESIRE    this.x
        //ERROR     this.x-this.x2
        //CURRENT   this.x2
        let desire = this.homeX
        if(this.holding)
            desire=mouseX

        this.x2=this.x2+(desire-this.x2)*this.a

        //DESIRE    70
        //CURRENT   10
        //ERROR     60 = desire-current
        //NEWCURRENT 10 + 60*accel
        //current=current+error*accel

    }


    draw(){
        push()
        if(this.holding){
            stroke(90)
            noFill()
            rect(this.x,this.y,this.w,this.h,0,0,this.w/2,this.w/2)
            translate(mouseX+this.mouseXoff,mouseY+this.mouseYoff)
            rotate(-0.5)
        }else{
            translate(this.x2,this.y2)
        }
        

        stroke(0)
        strokeWeight(1)
        for(let i=0;i<this.layers.length;i++){
            const round = i==0 ? this.w/2 : 0
            fill(this.getColorFromIndex(this.layers[i]))
            rect(0,this.h-this.sectionH*(i+1),this.w,this.sectionH,0,0,round,round)
        }

        noFill()
        strokeWeight(3)
        if(this.holding){
            stroke(100,100,100)
        }else{
            if(this.click(mouseX,mouseY)){
                stroke(70,100,100)
            }else{
                stroke(255)
            }
        }
        strokeWeight(5)
        rect(0,0,this.w,this.h,0,0,this.w/2,this.w/2)
        pop()

    }

    click(x,y){
        return x>this.x &&  x<this.x+this.w && y>this.y && y<this.y+this.h
    }

    getColorFromIndex(i){
        return color((Math.floor(i/this.total*100)+this.colorShift)%100,100,100)
    }

    grab(x=true){
        this.holding=x
        if(x){
            this.mouseXoff=this.x-mouseX
            this.mouseYoff=this.y-mouseY
        }
    }

    pop(){
        if(this.layers.length==0) return []
        const result = []
        result.push(this.layers.pop())
        while(this.layers.length>0 && result[result.length-1]==this.layers[this.layers.length-1]){
            result.push(this.layers.pop())
        }
        return result
    }

    push(x){
        if(Array.isArray(x)){
            for (const n of x) {
                this.layers.push(n)
            }
        }else{
            this.layers.push(x)
        }
    }
    complete(){
        if (this.layers.length==0) 
            return true

        if(this.layers.length<this.nSections)
            return false

        return this.layers.every(p=>p==this.layers[0])   
    }
}