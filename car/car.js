class Car{
    constructor(width,height,laneWidth,x,y,isUser=false){
        this.w = laneWidth/1.8
        this.h = laneWidth
        this.x = x
        this.y = y
        this.colors = [
            "red","blue","yellow","green","black","white","silver"
        ]
        this.color = this.colors[Math.floor(Math.random()*this.colors.length)]
        this.error = 0
        this.isUser = isUser
        this.angle = 0
        this.speed = 0
    }

    setUserPos(x,y){

        this.smoothx=x
        this.y = y


    }

    setPos(x,y){
        this.x=x
        this.y=y
    }

    setSpeed(s){
        this.speed = s
    }

    update(){

        if(this.isUser){
            this.error = this.smoothx-this.x
            this.x = PID(this.smoothx,this.x,0.01,0.0001,0.001*this.speed)
            this.angle = this.error*0.001
            


        }else{
            this.y += this.speed
        }
    }


    getCornerPoints() {
        const centerX = this.x + this.w / 2;
        const centerY = this.y ;
        const sin = Math.sin(this.angle);
        const cos = Math.cos(this.angle);
        const cornerXOffsets = [-this.w / 2, this.w / 2, this.w / 2, -this.w / 2];
        const cornerYOffsets = [0,0,this.h, this.h];
        const cornerPoints = [];
    
        for (let i = 0; i < 4; i++) {
          const xOffset = cornerXOffsets[i];
          const yOffset = cornerYOffsets[i];
          const rotatedX = centerX + (xOffset * cos - yOffset * sin);
          const rotatedY = centerY + (xOffset * sin + yOffset * cos);
          cornerPoints.push([rotatedX, rotatedY]);
        }
    
        return cornerPoints;
    }

    isPointInsidePolygon(point, polygon) {
        let x = point[0], y = point[1];
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          let xi = polygon[i][0], yi = polygon[i][1];
          let xj = polygon[j][0], yj = polygon[j][1];
          let intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
        }
        return inside;
    }

    isColiding(vehicle){
        const me_points = this.getCornerPoints()

        const vh_points = vehicle.getCornerPoints()

        for (const point of vh_points) {
            if(this.isPointInsidePolygon(point,me_points)){
                //other corner inside me
                return true
            }
        }

        for (const point of me_points) {
            if(this.isPointInsidePolygon(point,vh_points)){
                //my corner inside other
                return true
            }
        }

        return false
    }

    draw(cv){


        cv.saveTransform()
        // cv.line(0,0,this.x,this.y)
        cv.translate(this.x,this.y)

        cv.rotate(this.angle)
        cv.translate(-this.w/2,0)

        cv.stroke(0)
        // cv.line(0,0,0,-100)

        //BODY
        cv.fill(this.color)
        cv.rect(0,0,this.w,this.h)

        //driving mirrors
        cv.stroke(this.color)
        cv.strokeWeight(10)
        cv.line(-8,20,this.w+8,20)
        
        //headLights
        cv.fill(200,200,100)
        cv.noStroke()
        cv.circle(+5,3,6)
        cv.circle(this.w-5,3,6)

        cv.fill(150,50,50)
        cv.circle(+5,this.h-3,6)
        cv.circle(this.w-5,this.h-3,6)

        //windshield
        cv.stroke(0)
        cv.strokeWeight(5)
        cv.fill(100,100,255)

        cv.makeShape([
            [10,       30],
            [this.w-10,30],
            [this.w-5, 50],
            [5,        50]
        ])


        //rear windshield
        cv.makeShape([
            [10,       this.h-10],
            [this.w-10,this.h-10],
            [this.w-5, this.h-20],
            [5,        this.h-20]
        ])

        cv.restoreTransform()


    }
}

function PID(desiredValue, currentValue,kp=0.01,ki=0.0001,kd=0.03) {

    // Variables for PID controller
    let prevError = 0;
    let integral = 0;
    
    // Calculate error between desired value and current value
    const error = desiredValue - currentValue;
    
    // Calculate PID output
    const proportional = kp * error;
    integral += ki * error;
    const derivative = kd * (error - prevError);
    const output = proportional + integral + derivative;
    
    // Update previous error for next iteration
    prevError = error;
    
    // Return the new value for the next frame
    return currentValue + output;
}


export default Car