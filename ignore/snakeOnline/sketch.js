
  
let dom= document.getElementById('container')

let n = 30
const cv=new Canvas(n,dom)

snake = new Snake(n)
const food=[]




addRandomFood()
draw()

function draw(){

    cv.background("grey")
    snake.update(food)
    snake.show()

    for (const f of food) {
        cv.point(f.x,f.y,"green")
    }

    cv.draw()
    //window.requestAnimationFrame(draw)
    setTimeout(()=>{
        draw()
    },300)
}


window.onkeyup=(e)=>{
    switch (e.key) {
        case "ArrowUp":
            snake.changeDir(0)
            break;
        case "ArrowRight":
            snake.changeDir(1)
            break;
        case "ArrowLeft":
            snake.changeDir(2)
            break;
        case "ArrowDown":
            snake.changeDir(3)
            break;
    }
}

function addRandomFood(){
    food.push({x:Math.floor(Math.random()*n),y:Math.floor(Math.random()*n)})

}

function getId(n=4){
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result =""
    while(result.length<n){
        result+=t[Math.floor(Math.random()*t.length)]
    }
    return result
}