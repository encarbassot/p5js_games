class Suk{
    
    
    constructor(n=3){
        this.n=n
        this.m=n*n
        this.mat = this.createMat(this.m)

        // this.fillRandom(0,9)
        this.next()

        this.logTable()

    }

    next(){

        let stop = false
        let i,j
        for(i=0;i<this.m && !stop;i++){
            for(j=0;j<this.m && !stop;j++){

                if(this.mat[i][j]==0){
                    stop = true
                }
            }
        }
        j--
        i--

        let x = j
        let y = i
        console.log("x",x,"y",y,"->",this.mat[y][x])
        this.getPossibilities(x,y)
        // console.log("Row",this.getRow(x,y))
        // console.log("Row",this.getRow(x,y,false))
        // console.log("Col",this.getCol(x,y))
        // console.log("Col",this.getCol(x,y,false))
        // console.log("Box",this.getBox(x,y))
        // console.log("Box",this.getBox(x,y,false))
    }

    getPossibilities(k,r){ //k->x  r->y
        const row = this.getRow(k,r,false)
        const col = this.getCol(k,r,false)
        const box = this.getBox(k,r,false)

        const result = []

        console.log(col)
        console.log(row)
        console.log(box)

        for(let i=1;i<=this.m;i++){
            if(!col.includes(i) && !row.includes(i) && !box.includes(i)){
                result.push(i)
            }
        }

        console.log("result",result)
        return result
    }

    getBox(k,r,self=true){
        let x = parseInt(k/this.n)*this.n
        let y = parseInt(r/this.n)*this.n

        let result = []

        for(let i=0;i<this.n;i++){
            for(let j=0;j<this.n;j++){
                const focusOnSelf = (j==r%this.n && i==k%this.n)
                
                if(self){
                    result.push(this.mat[y+j][x+i])
                }else if(!focusOnSelf){
                    result.push(this.mat[y+j][x+i])
                }
            }
        }

        return result
    }


    getCol(k,r,self=true){
        if(self){
            return this.mat.map(x=>x[k])
        }else{
            return this.mat.map(x=>x[k]).filter((x,i)=>i!=r)
        }
    }

    getRow(k,r,self=true){
        if(self){
            return this.mat[r]
        }else{
            return this.mat[r].filter((x,i)=>i!=k)
        }
    }


    copyMat(mat){
        this.mat=JSON.parse(JSON.stringify(mat))
    }


    createMat(n){
        const mat = []

        for(let i=0;i<n;i++){
            mat.push("0".repeat(n).split('').map(x=>0))
        }

        console.log(mat)
        return mat

    }


    fillRandom(min=1,max=9){
        this.mat = this.mat.map(line=>line.map(x=>min+Math.floor(Math.random()*(max-min))))
    }


    txt(){
        let result=""
        for (let i = 0; i < this.mat.length; i++) {

            if(i%3==0&&i!=0){
                result+="\n═══╬═══╬═══"
            }
            let line = ""

            for (let j = 0; j < this.mat[i].length; j++) {
                const element = this.mat[i][j];
                if(j%3==0&&j!=0){
                    line+="║"
                }

                line += element==undefined?' ':element
                
            }
            result+="\n"
            result+=line
        }
        return result
    }

    logTable(){
        
        console.log(this.txt())
        document.body.innerHTML=this.txt().replaceAll(" ","&nbsp;&nbsp;").replaceAll("\n","<br>")

    }



}
