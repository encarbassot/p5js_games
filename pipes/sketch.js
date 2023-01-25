
const pipes=[]


const levels=[
    {schema:[[[0],[0,0,0]]],sections:4},
    {schema:[[[0,1,0,1],[1,0,1,0],[]]],sections:4},
    {schema:[[[0,1,2,0],[0,1,2,2],[1,2,0,1],[],[]]],sections:4},
    {schema:[[[0,0,1,2],[1,2,1,2],[0,1,2,0],[],[]]],sections:4},
    {schema:[[[0,1,2,3],[0,1,3,2],[4,2,4,0],[1,4,0,2]],[[1,4,3,3],[],[]]],sections:4},
    {schema:[[[0,0,0,1],[0,2,1,3],[3,1,3,2],[2,3,2,4]],[[1,4,4,4],[],[]]],sections:4},
    {schema:[[[0,1,0,2],[0,1,3,3],[0,3,4,4],[3,1,4,2]],[[4,2,1,2],[],[]]],sections:4},
    {schema:[[[0,1,2,1],[2,3,3,2],[4,0,4,3],[3,1,4,0]],[[2,4,1,0],[],[]]],sections:4},
    {schema:[[[0,1,2,0],[3,4,4,2],[0,3,3,2],[1,4,2,0]],[[1,1,3,4],[],[]]],sections:4},
    {schema:[[[0,1,0,2],[3,2,4,5],[1,6,6,0],[1,5,5,2],[3,1,4,4]],[[6,6,3,0],[4,5,2,3],[],[]]],sections:4},
    {schema:[[[0,1,2,1],[0,3,2,2],[4,5,4,4],[4,2,6,0],[5,6,3,1]],[[6,6,1,5],[3,3,0,5],[],[]]],sections:4},
    {schema:[[[0,0,1,2],[2,1,2,3],[0,4,3,2],[1,4,0,3]],[[1,4,3,4],[],[]]],sections:4},
    {schema:[[[0,1,2,3],[4,1,1,5],[0,5,6,2],[4,3,0,1],[4,6,2,4]],[[6,3,5,2],[5,3,0,6],[],[]]],sections:4},
    {schema:[[[0,0,0,1],[2,3,1,0],[4,1,2,1],[3,4,2,5],[5,3,6,5]],[[6,4,6,2],[5,6,4,3],[],[]]],sections:4},
    {schema:[[[0,1,1,2],[3,4,2,3],[0,3,2,3],[2,0,4,4]],[[1,4,1,0],[],[]]],sections:4},
    {schema:[[[0,1,1,0],[0,2,0,3],[4,4,5,4],[6,5,2,6],[4,6,3,5]],[[3,1,6,3],[5,2,2,1],[],[]]],sections:4},
    {schema:[[[0,1,2,0],[3,4,1,5],[1,3,5,1],[6,2,4,0],[3,0,6,3]],[[4,6,5,4],[2,2,5,6],[],[]]],sections:4},
    {schema:[[[0,1,2,3],[3,0,4,2],[3,0,1,2],[3,1,1,4]],[[2,0,4,4],[],[]]],sections:4},
    {schema:[[[0,0,1,2],[3,0,3,2],[4,4,5,6],[4,2,0,5],[1,3,2,6]],[[4,3,6,6],[1,1,5,5],[],[]]],sections:4},
    {schema:[[[0,1,2,2],[0,3,0,1],[4,5,6,5],[5,3,4,6],[4,3,2,2]],[[3,6,1,5],[0,1,6,4],[],[]]],sections:4},
    {schema:[[[0,1,1,2],[2,1,3,4],[1,3,0,0],[0,4,2,3]],[[3,4,2],[4],[]]],sections:4},
    {schema:[[[0,1,2,2],[3,4,5,6],[1,4,0,5],[3,5,1,6],[3,3,4,6]],[[2,1,2,0],[4,5,6,0],[],[]]],sections:4},
    {schema:[[[0,1,2,3],[4,5,2,1],[4,0,6,0],[4,5,3,1],[4,2,6,1]],[[2,3,3,6],[6,0,5,5],[],[]]],sections:4},
    {schema:[[[0,0,0,1],[2,2,3,3],[2,4,1,3],[4,2,3,1]],[[0,4,1,4],[],[]]],sections:4},
    {schema:[[[0,1,2,2],[0,1,3,4],[2,5,3,3],[6,4,4,5],[6,1,6,5]],[[3,1,0,6],[5,0,4,2],[],[]]],sections:4},
    {schema:[[[0,0,1,2],[3,4,4,3],[3,2,5,6],[1,6,5,4],[3,4,6,2]],[[0,2,1,1],[6,5,5,0],[],[]]],sections:4},
    {schema:[[[0,1,2,2],[3,4,4,1],[0,0,1,2],[4,3,3,0]],[[2,4,1,3],[],[]]],sections:4},
    {schema:[[[0,1,2,3],[4,5,4,4],[2,6,2,3],[5,4,0,6],[2,1,0,0]],[[1,3,3,5],[5,6,6,1],[],[]]],sections:4},
    {schema:[[[0,1,2,3],[1,4,4,2],[0,5,0,5],[5,4,2,1],[5,4,6,3]],[[6,3,3,2],[1,6,0,6],[],[]]],sections:4},
    {schema:[[[0,0,0,1],[2,3,4,4],[0,4,5,1],[2,1,6,5],[6,3,6,5]],[[3,2,3,4],[2,1,5,6],[],[]]],sections:4},
    {schema:[3],sections:3},
    {schema:[2,2],sections:5},
    {schema:[3],sections:3},
    {schema:[4],sections:4},
    {schema:[3,3],sections:4},
    {schema:[4,5],sections:4},
    {schema:[4,5,4],sections:4},
]

let levelIndex = 0

let level




function windowResized(){
    resizeCanvas(getSize(),getSize())
    level.resize()
}

function setup(){
    createCanvas(getSize(),getSize())
    colorMode(HSB,100)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get('level')!=null){
        levelIndex=urlParams.get('level')-1
    }

    level = new Level(levels[levelIndex])
}

function draw(){
    background(0)

    level.draw()

    
}

function mouseClicked(){
    level.click(mouseX,mouseY)
}


function getSize(){
    return Math.min(windowWidth,windowHeight)
}

function nextLevel(n=undefined){
    displayModal(false)
    if(n==undefined){
        levelIndex++
    }else{
        levelIndex=n
    }
    window.history.replaceState(null, null, `?level=${levelIndex+1}`);

    level = new Level(levels[levelIndex])
}


/**
levels.push(
    pushLevel([ 
        [ "pppo","gcbb","pbro","godr","dcdr"  ],
        [ "cgcb","gord","","" ]
    ],4)
)


function pushLevel(level,sections=2){
    const dic={}
    const count={}
    for(let k=0;k<level.length;k++){
        const line = level[k]
        for(let j=0;j<line.length;j++){
            const pipe = line[j]
            line[j]=[]
            if(pipe.length>sections){
                sections=pipe.length
            }
            for(let i=0;i<pipe.length;i++){
                const color = pipe[i]
                

                if(!dic.hasOwnProperty(color)){
                    dic[color]=Object.keys(dic).length
                    count[color]=0
                }
                line[j][i]=dic[color]
                count[color]++
                
            }
        }
    }
    const result = {schema:level,sections}
    console.log(JSON.stringify(count, undefined, 4));

    return result
    
}
 */