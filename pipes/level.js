class Level {
    constructor(schema) {
        this.schema=schema.schema
        this.sections=schema.sections
        this.h = this.schema.length
        this.w = Math.max(...this.schema)
        this.pipes=[]
        this.hoding=undefined
        
        this.moves=0
        this.start=new Date().getTime()

        this.colorShift=Math.floor(Math.random()*100)
        this.pw = width*0.1
        this.ph = width*0.3
        
        this.isExplicit = typeof(this.schema[0])!="number"
        this.total = this.schema.reduce((t,n)=>t+(this.isExplicit?n.length:n),0)
        let index=0
        for (let j=0;j<this.schema.length;j++) {
            const lineLength = this.isExplicit?this.schema[j].length:this.schema[j]
            for(let i=0;i<lineLength;i++) {

                let h = height/this.h
                let y = h*j - this.ph/2 + h/2

                let w = width/lineLength
                let x = w*i - this.pw/2 + w/2


                if(this.isExplicit){
                    this.pipes.push( new Pipe(index,this.sections,i,j,x,y,this.pw,this.ph,this.total,this.colorShift,this.schema[j][i]))
                }else{
                    this.pipes.push( new Pipe(index,this.sections,i,j,x,y,this.pw,this.ph,this.total,this.colorShift))
                }
                
                index++
            }
        }
        if(!this.isExplicit){
            this.scramble()
        }
    }


    resize(){
        this.pw = width*0.1
        this.ph = width*0.3

        for (const p of this.pipes) {
            const i = p.i
            const j = p.j
            const lineLength = this.isExplicit?this.schema[j].length:this.schema[j]
            let h = height/this.h
            let y = h*j - this.ph/2 + h/2

            let w = width/lineLength
            let x = w*i - this.pw/2 + w/2

            p.resize(x,y,this.pw,this.ph)
        }
    }

    draw(){
        
        for (const p of this.pipes) {
            p.update()
            if(!p.hoding){
                p.draw()
            }
        }
        if (this.holding) {
            this.holding.draw()
        }
    }

    click(x,y){
        if(x<0||x>width||y<0||y>height)return

        const p = this.getPipe(x,y)
        if(this.holding!=undefined){
            this.fill(this.holding,p)
            this.holding.grab(false)
            this.holding=undefined
        }else{
            this.holding=p
            p.grab()
        }
        return

        if(this.holding){
            this.holding.grab(false)
            this.holding=undefined
        }

    }

    getPipe(x,y){
        const j = Math.floor(y/(height/this.h))
        const i = Math.floor(x/(width/this.schema[j].length))
        const r = this.pipes.find(p=>p.i==i&&p.j==j)
        return r
    }

    fill(a,b){
        if(a.index==b.index){
            return
        }
        this.pour(a,b)

        if(this.checkAllDone()){
            // nextLevel()
            showModal(this.moves,new Date().getTime()-this.start)
        }
    }

    scramble(){
        //empty one full pipe
        let empty = this.pipes[Math.floor(Math.random()*this.pipes.length)]
        empty.layers=[]

        let iterations = this.total*this.sections*50

        let lastA
        let lastB

        while(iterations>0){

            //free pipes
            let a = this.pipes
                .filter(x=>x.layers.length<this.sections)
                .sort(()=>0.5-Math.random())[0]

            
            //pipe with element AND not A
            let b=this.pipes
                .filter(x=>x.layers.length>0 && x.index!=a.index)
                .sort(()=>0.5-Math.random())[0]


            if(lastA && !(b.index==lastA.index && a.index==lastB.index)){
                this.pour(b,a,true)
                iterations--
            }
            

            lastA=a
            lastB=b
        }

    }

    // printTable(){
    //     console.log(JSON.stringify(this.pipes.map(x=>x.layers)))
    // }

    pour(from,to,byOne=false){
        const get = from.pop()
        if(get.length>0){

            if(byOne){
                to.push(get.pop())
            }else{
                
                const abailable=this.sections-to.layers.length
                const got = get.length


                if(to.layers.length==0||get[0]==to.layers[to.layers.length-1]){
                    this.moves++
                    if(abailable>=got){
    
                        to.push(get)
                        return
                    }else{
                        to.push(get.splice(0,abailable))
                    }
                }


            }

            if(get.length>0){
                from.push(get)
            }


            
        }
    }

    checkAllDone(){
        return this.pipes.every(p=>p.complete())
    }
}