class Snake{
    constructor(n){
        this.n=n
        this.x=Math.floor(this.n/2)
        this.y=Math.floor(this.n/2)

        this.dead=false

        this.vy=1
        this.vx=0

        this.dvx=this.vx
        this.dvy=this.vy


        this.tailN = 3
        this.tail=[]

        this.id=getId()
    }


    show(){
        if(!this.dead){

            for(const t of this.tail){
                cv.point(t.x,t.y,"LightSalmon")
            }
            cv.point(this.x,this.y,"yellow")
        }
    }

    update(food,snakes){
        if(!this.dead){
        
            this.vx=this.dvx
            this.vy=this.dvy

            if(this.tail.length!=this.tailN){
                if(this.tail.length<this.tailN){//ADD
                    this.tail.push({x:this.x,y:this.y})        
                }//else{}//REMOVE ?
            }else{
                this.tail.shift()
                this.tail.push({x:this.x,y:this.y})
            }

            this.x+=this.vx
            this.y+=this.vy
            if(this.y<0||this.y==n||this.x==n||this.x<0){
                this.dead=true
                return
            }

            this.check(food)
            sendData(this.toText())
        }
    }

    changeDir(x){


        if(this.vx==0){
            if(x==1){//RIGHT
                this.dvx=1
                this.dvy=0
            }else if(x==2){//LEFT
                this.dvx=-1
                this.dvy=0
            }
        }
        
        if(this.vy==0){
            if(x==0){//UP
                this.dvx=0
                this.dvy=-1
            }else if(x==3){//DOWN
                this.dvx=0
                this.dvy=1
            }
        }
    }


    check(food,snakes){
        const foodInd = food.findIndex(f=>f.x==this.x&&f.y==this.y)
        if(foodInd>=0){
            food.splice(foodInd,1)
            addRandomFood()
            this.tailN++
        }

        if(this.tail.some(t=>t.x==this.x&&t.y==this.y)){
            console.log("DEAD")
            this.dead=true
        }
    }

    toText(){
        const result = []
        result.push([this.x,this.y])
        for (const t of this.tail) {
            result.push([t.x,t.y])
        }


        return JSON.stringify({id:this.id,t:result})
    }

}  