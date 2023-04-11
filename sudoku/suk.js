class Suk{
    
    
    constructor(n=3){

        this.n=n
        this.m=n*n
        
        this.mat = this.generateSudoku(this.m)
        // this.fillRandom(0,9)
        // this.next(this.mat)

        this.logTable(this.mat)
        console.log(this.isValid(this.mat))

    }

    generateSudoku(m) {
        let board = this.createMat(m)
        this.fillBoard(board);
        return board;
    }

    fillBoard(board,row=0, col=0) {
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      
        if (col == 9) {
          col = 0;
          row++;
          if (row == 9) return true;
        }
      
        if (board[row][col] != 0) return this.fillBoard(board,row, col + 1);
      
        const scrambledNums = nums.sort((a,b)=>Math.random()>0.5)
        for (let i = 0; i < 9; i++) {
          let num = scrambledNums[i];
          if (this.canPlace(board,row, col, num)) {
            board[row][col] = num;
            if (this.fillBoard(board,row, col + 1)) return true;
            board[row][col] = 0;
          }
        }
      
        return false;
    }

    canPlace(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
          if (board[row][i] === num) return false;
        }
      
        for (let i = 0; i < 9; i++) {
          if (board[i][col] === num) return false;
        }
      
        let subRow = Math.floor(row / 3) * 3;
        let subCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[subRow + i][subCol + j] === num) return false;
          }
        }
      
        return true;
    }
      

    getPossibilities(k,r){ //k->x  r->y
        const row = this.getRow(this.mat,k,r,false)
        const col = this.getCol(this.mat,k,r,false)
        const box = this.getBox(this.mat,k,r,false)

        const result = []

        // console.log(col)
        // console.log(row)
        // console.log(box)

        for(let i=1;i<=this.m;i++){
            if(!col.includes(i) && !row.includes(i) && !box.includes(i)){
                result.push(i)
            }
        }

        console.log("result",result)
        return result
    }

    getBox(mat,k,r,self=true){
        let x = parseInt(k/this.n)*this.n
        let y = parseInt(r/this.n)*this.n

        let result = []

        for(let i=0;i<this.n;i++){
            for(let j=0;j<this.n;j++){
                const focusOnSelf = (j==r%this.n && i==k%this.n)
                
                if(self){
                    result.push(mat[y+j][x+i])
                }else if(!focusOnSelf){
                    result.push(mat[y+j][x+i])
                }
            }
        }

        return result
    }


    getCol(mat,k,r,self=true){
        if(self){
            return mat.map(x=>x[k])
        }else{
            return mat.map(x=>x[k]).filter((x,i)=>i!=r)
        }
    }

    getRow(mat,k,r,self=true){
        if(self){
            return mat[r]
        }else{
            return mat[r].filter((x,i)=>i!=k)
        }
    }


    copy(mat){
        return JSON.parse(JSON.stringify(mat))
    }


    createMat(m){
        //create a MxM array filled with 0 (Empty)
        const mat = Array(m).fill(0).map(() => Array(m).fill(0));
        return mat

    }


    fillRandom(min=1,max=9){
        this.mat = this.mat.map(line=>line.map(x=>min+Math.floor(Math.random()*(max-min))))
    }


    txt(mat){
        let result=""
        for (let i = 0; i < mat.length; i++) {

            if(i%3==0&&i!=0){
                result+="\n═══╬═══╬═══"
            }
            let line = ""

            for (let j = 0; j < mat[i].length; j++) {
                const element = mat[i][j];
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

    logTable(mat){
        
        console.log(this.txt(mat))
        document.body.innerHTML=this.txt(mat).replaceAll(" ","&nbsp;&nbsp;").replaceAll("\n","<br>")

    }

    isValid(mat){
        //check columns
        for(let i=0;i<this.m;i++){
            const col = this.getCol(mat,i,0,true)
            if(!this.isSectionValid(col)){
                return false
            }
        }

        //check for rows
        for(let i=0;i<this.m;i++){
            const row = this.getRow(mat,0,i,true)
            if(!this.isSectionValid(row)){
                return false
            }
        }

        //check for boxes
        for(let i=0;i<this.n;i++){
            for(let j=0;j<this.n;j++){
                const box = this.getBox(mat,i,j,true)
                if(!this.isSectionValid(box)){
                    return false
                }
            }
        }

        return true
    }

    isSectionValid(sec){
        //pass a column, row or box
        const section = this.copy(sec)
        while(section.length >=1){
            const p = section.pop()

            if( p!=0 && section.includes(p)){
                return false
            }
        }

        return true
    }

}
