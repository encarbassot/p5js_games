import Car from "./car.js"
import Road from "./road.js"

class Player{
    constructor(width,height,laneWidth){
        this.speed = 20

        this.carY = height-laneWidth*1.5
        this.car = new Car(width,height,laneWidth,width/2,this.carY,true)
        this.road = new Road(width,height,laneWidth,this.car)

        this.width=width
        this.height=height

        this.road.setSpeed(this.speed)
        this.car.setSpeed(this.speed)
        this.road.addRandomTrafic()

    }

    update(mouseX,mouseY,millis,cv){
        this.road.setSpeed(this.speed)
        this.car.setSpeed(this.speed)

        this.car.setUserPos(mouseX,this.carY)
        this.road.update(cv,millis)
        this.car.update()
    }

    draw(cv){


        this.road.draw(cv)
        this.car.draw(cv)

    }
}

export default Player