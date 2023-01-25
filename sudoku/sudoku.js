class Sudoku{

    constructor(n=3){
        this.N=n
        this.M=n*n
        this.columns=this.M
        this.rows=this.M
        this.max=this.M

        this.table=this.createTable(this.M)
        //this.fillSudoku()

        this.logTable()
    }

    fillSudoku(){
        let s = this.pickEmptySpot()
        this.insert(s.i,s.j, Math.floor(Math.random()*this.M)+1)
        
        const spots = this.getFreeSpots()

        let seg=0
        do{
            seg++
            let s = spots.pop()
            let a = this.availableNumbers(s.i,s.j)
            const n = a[Math.floor(Math.random()*a.length)]
            this.insert(s.i,s.j,n)
            this.logTable()
            console.log(a,seg);
        }while(spots.length>0&&seg<100)
    }

    fill2(){
        let s = this.pickEmptySpot()
        let a = this.availableNumbers(s.i,s.j)
        const n = a[Math.floor(Math.random()*a.length)]
        this.insert(s.i,s.j,n)
        this.logTable()
    }

    createTable(n){
        const result=[]

        for (let i = 0; i < n; i++) {
            result.push(new Array(n))            
        }
        return result
    }

    insert(x,y,n){
        this.table[x][y]=n
    }

    availableNumbers(i,j){
        const available = Array.from({length: this.M}, (_, index) => index + 1)

        const row = this.getRowNum(j)
        for (const n of row) {
            const i = available.indexOf(n)
            if(i>=0){
                available.splice(i,1)
            }
        }

        const column = this.getColNum(i)
        for (const n of column) {
            const i = available.indexOf(n)
            if(i>=0){
                available.splice(i,1)
            }
        }

        const nei = this.getNeighbours(i,j,false)
        for (const n of nei) {
            const i = available.indexOf(n)
            if(i>=0){
                available.splice(i,1)
            }
        }

        // console.log("ROW",row)
        // console.log("COL",column)
        // console.log("NEI",nei)
        // console.log("AVAILABLE",available);        
        return available
    }

    willColide(i,j,n,checkSelf=true){
        //NOT FINISHED
        console.log(this.table[i],i)
        console.log(this.table[i][j])
        if( this.table[i][j]!==undefined && checkSelf) 
            return true

        const row = this.getCol(j)
        console.log(row)
        
        const column = this.getRow(i)
        const nei = this.getNeighbours(i,j,false)

        return false
    }

    getFreeSpots(){
        const result = []

        for(let j=0;j<this.table.length;j++){
            for(let i=0;i<this.table[j].length;i++){
                if(this.table[j][i]==undefined||this.table[j][i]==0){
                    result.push({j,i})
                }
            }
        }

        return result
        
    }

    getCol(j){
        return this.table[j]
    }
    getColNum(j){
        return this.table[j].filter(x=>x!==undefined)
    }

    getRow(j){
        return this.table.map(x=>x[j])
    }
    getRowNum(j){
        return this.table.map(x=>x[j]).filter(x=>x!==undefined)
    }

    getNeighbours(x,y,returnSelf=false){
        //return 3x3 neighbous (len 8) of the element
        const sx = Math.floor(x/3)*this.N
        const sy= Math.floor(y/3)*this.N
        const nei=[]

        for(let j=0;j<this.N;j++){
            for(let i=0;i<this.N;i++){
                const ni = sx+i
                const nj = sy+j
                if(returnSelf || !(ni==x&&nj==y)){
                    const n = this.table[sx+i][sy+j]
                    if(n!==undefined){
                        nei.push(n)
                    }
                }
            }
        }

        return nei
    }

    pickEmptySpot(){
        let j,i
        let empty = false
        do{
            j=Math.floor(Math.random()*this.M)
            i=Math.floor(Math.random()*this.M)
            empty = this.table[i][j]!==undefined
        }while(empty)
        return {i,j}
    }

    txt(){
        let result=""
        for (let i = 0; i < this.table.length; i++) {

            if(i%3==0&&i!=0){
                result+="\n═══╬═══╬═══"
            }
            let line = ""

            for (let j = 0; j < this.table[i].length; j++) {
                const element = this.table[j][i];
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