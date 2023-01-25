
const tetrominoes = {
    O:{
        color:'#ff0',
        type:"O",
        w:2,
        h:2,
        tiles:[[0,0],[0,1],[1,0],[1,1]],
        offsets:[
            [ [0,0] ],
            [ [0,-1] ],
            [ [-1,-1] ],
            [ [-1,0] ],
        ]
    },


	J:{
        color:'#00f',
        type:"J",
        w:3,
        h:2,
        tiles:[[0,0],[-1,0],[-1,1],[1,0]],
        offsets:[
            [ [0,0],[0,0],[0,0],[0,0],[0,0] ],
            [ [0,0],[1,0],[1,-1],[0,2],[1,2] ],
            [ [0,0],[0,0],[0,0],[0,0],[0,0] ],
            [ [0,0],[-1,0],[-1,-1],[0,2],[-1,2] ],
        ]
    },


	L:{
        color:'#fa0',
        type:"L",
        w:3,
        h:2,
        tiles:[[0,0],[-1,0],[1,1],[1,0]],
        offsets:[
            [ [0,0],[0,0],[0,0],[0,0],[0,0] ],
            [ [0,0],[1,0],[1,-1],[0,2],[1,2] ],
            [ [0,0],[0,0],[0,0],[0,0],[0,0] ],
            [ [0,0],[-1,0],[-1,-1],[0,2],[-1,2] ],
        ]
    },


	S:{
        color:'#0f0',
        type:"S",
        w:3,
        h:2,
        tiles:[[0,0],[-1,0],[0,1],[1,1]],
        offsets:[
            [ [0,0],[0,0],[0,0],[0,0],[0,0] ],
            [ [0,0],[1,0],[1,-1],[0,2],[1,2] ],
            [ [0,0],[0,0],[0,0],[0,0],[0,0] ],
            [ [0,0],[-1,0],[-1,-1],[0,2],[-1,2] ],
        ]
    },


	Z:{
        color:'#f00',
        type:"Z",
        w:3,
        h:1,
        tiles:[[0,0],[-1,1],[0,1],[1,0]],
        offsets:[
            [ [0,0],[0,0],[0,0],[0,0],[0,0] ],
            [ [0,0],[1,0],[1,-1],[0,2],[1,2] ],
            [ [0,0],[0,0],[0,0],[0,0],[0,0] ],
            [ [0,0],[-1,0],[-1,-1],[0,2],[-1,2] ],
        ]
    },


	T:{
        color:'#a0f',
        type:"T",
        w:3,
        h:2,
        tiles:[[0,0],[-1,0],[0,1],[1,0]],
        offsets:[
            [ [0,0],[0,0],[0,0],[0,0],[0,0] ],
            [ [0,0],[1,0],[1,-1],[0,2],[1,2] ],
            [ [0,0],[0,0],[0,0],[0,0],[0,0] ],
            [ [0,0],[-1,0],[-1,-1],[0,2],[-1,2] ],
        ]
    },


	I:{
        color:'#0ff',
        type:"I",
        w:4,
        h:2,
        tiles:[[0,0],[-1,0],[1,0],[2,0]],
        offsets:[
            [ [0,0],[-1,0],[2,0],[-1,0],[2,0] ],
            [ [-1,0],[0,0],[0,0],[0,1],[0,-2] ],
            [ [-1,1],[1,1],[-2,1],[1,0],[-1,0] ],
            [ [0,1],[0,1],[0,1],[0,-1],[0,2] ],
        ]
    }
}