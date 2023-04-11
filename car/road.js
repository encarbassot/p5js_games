import Car from "./car.js"

class Road{
    constructor(width,height,laneWidth,userCar){
        this.laneWidth=laneWidth
        this.lanes = parseInt(width/laneWidth)-3
        this.padding = (width-(this.laneWidth*this.lanes))/2
        this.userCar = userCar


        this.speed = 0

        this.width=width
        this.height=height

        this.trafic=[]

        //0 - grass
        //1 - road
        //2 - road wrong-way
        this.layouts=[
            [0,2,2,2,2,1,1,1,1,0],
            [0,0,0,0,2,1,0,0,0,0],
            [0,0,0,0,2,1,1,0,0,0],
            [0,0,0,0,2,2,1,0,0,0],
            [3,3,3,3,2,3,3,1,3,3],
            [3,3,3,3,5,3,3,4,3,3],

        ]
        this.offroadLanes=[
            0,3,4,5
        ]

        this.wrongWayLanes=[
            2,5
        ]

        this.layoutColors=[
            [50,  200, 100],//grass
            [173, 167, 167],//road
            [173, 167, 167],//road
            [90,  70,  50 ],//gravel
            [120,  100,  80 ],//soft gravel
            [120,  100,  80 ],//soft gravel
        ]
        this.currentLayout = 2

        

        //SETUP
        // this.addRandomTrafic()
    }

    setSpeed(s){
        this.speed = s
    }

    update(cv,millis){
        this.offset = millis/30*this.speed

        //check if its out of the screen
        for(let i=this.trafic.length-1;i>=0;i--){
            const car = this.trafic[i]
            const points = car.getCornerPoints()
            const ys = points.map(([x,y])=>y)
            if(ys.every(y=>y>cv.height)){
                this.trafic.splice(i,1)
                this.addRandomTrafic()
            }
        }


        //update vehichles
        for (const vehichle of this.trafic) {
            vehichle.update()
        }

        //check for colisions
        for (const vehichle of this.trafic) {
            if (vehichle.isColiding(this.userCar)) {
                console.log("COLISION")
                cv.noLoop()
            }
        }

    }

    draw(cv){
        const off = this.offset
        

        const layout= this.layouts[this.currentLayout]

        //grass
        cv.noStroke()
        cv.fill(this.layoutColors[layout[0]])
        cv.rect(-1,0,this.padding +5,cv.height)
        cv.fill(this.layoutColors[layout[9]])
        cv.rect(cv.width-this.padding,0,this.padding,cv.height)

        //borders already done
        for(let i=1;i<layout.length-1;i++){

            const lane = layout[i]
            const x = this.padding + (i-1)*this.laneWidth
            const color =this.layoutColors[lane] 
            cv.fill(color)
            cv.rect(x,-1,this.laneWidth+1,cv.height)
            if(lane == 1 || lane == 2){
                this.drawLaneArrows(cv,x,lane,off)
            }
        }

        //paint lane line


        for (let i = 0; i < layout.length - 1; i++) {
            const curr = layout[i];
            const next = layout[i+1];

            const x =this.padding + i*this.laneWidth 

            cv.stroke(255)
            if (curr !== next) {
                cv.line(x,0,x,cv.height)


            } else if (!this.offroadLanes.includes(curr)) {
                this.drawDottLine(cv,x,off)
            }
        }

        //PAINT TRAFIC
        for (const vehicle of this.trafic) {
            vehicle.draw(cv)
        }


    }

    addRandomTrafic(){
        const layout = this.layouts[this.currentLayout]
        const lanes = layout.flatMap((x,i)=>this.offroadLanes.includes(x)?[]:i)
        const lane = lanes[Math.floor(Math.random()*lanes.length)]
        this.trafic.push(this.createVehicle(lane,layout[lane]))
    }

    createVehicle(lane,surface){
        
        const speed = this.speed
        const x = this.padding + (lane-1)*this.laneWidth + this.laneWidth/2
        const vehichle = new Car(this.width,this.height,this.laneWidth,x,-300)
        

        if(this.wrongWayLanes.includes(surface)){
            vehichle.angle = Math.PI
            vehichle.setSpeed(speed + 2)
        }else{
            vehichle.setSpeed( speed - 15)
        }

        return vehichle
    }


    drawLaneArrows(cv,x,lane,off=0){
        
        const reverse = lane == 2
        const spacing = this.laneWidth*2.5
        let y = -spacing + off % spacing

        while(y<cv.height + spacing){
            this.drawArrow(cv,x+this.laneWidth/2,y,reverse)
            y+=spacing
        }

    }

    drawArrow(cv,x,y,reverse = false){
        cv.fill(200)
        cv.saveTransform()
        cv.translate(x,y)
        if(reverse){
            cv.rotate(cv.PI)
        }
        cv.makeShape([
            [0,-30],
            [10,0],
            [5,0],
            [5,30],
            [-5,30],
            [-5,0],
            [-10,0],
        ])
        cv.restoreTransform()
    }


    drawDottLine(cv,x,off){
        
        const line = this.laneWidth
        const space = this.laneWidth/2
        let y = -(line+space)+off % (line+space)

        while(y<this.height){
            cv.line(x,y,x,y+line)
            y+=line+space
        }
    }
    
}

export default Road