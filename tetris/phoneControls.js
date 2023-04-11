class PhoneControls{
    constructor(buttons,tetris){

        this.buttons=buttons
        this.tetris=tetris
        
        buttons.pause.onclick=()=>{
            tetris.cont_pause()
        }

        buttons.reset.onclick=()=>{
            tetris.cont_reset()
        }
        
        buttons.rotate.onmousedown=()=>{
            tetris.cont_rotateCW()
        }
        
        new Button(buttons.left,()=>{
            tetris.cont_left()
        })

        new Button(buttons.right,()=>{
            tetris.cont_right()
        })

        new Button(buttons.down,()=>{
            tetris.cont_down()
        })

        buttons.hold.onmousedown=()=>{
            tetris.cont_hold()
        }
    }
}

class Button{
    constructor(element,fun){
        this.fun=fun

        this.press=false
        element.onpointerdown=(event)=>{
            event.preventDefault()
            event.stopPropagation()
            event.cancelBubble = true

            this.press=true
            this.fun()
            console.log("DOWN")
            setTimeout(()=>{
                this.repeat()
            },400)
        }
        
        element.onfocusout=()=>{
            this.press=false
        }
        element.onpointerup=()=>{
            this.press=false
        }
        
        
    }

    repeat(){
        if(this.press){
            this.fun()
            setTimeout(()=>{
                this.repeat()
            },100)
        }
    }
}