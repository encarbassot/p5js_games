
  
  
  let socket = new Socket('room-code',recivedData)
  
function sendData(x){
    socket.send(x)
}

function recivedData(data){
    console.log(data)
}
  
  
  
  
  
  
  //socket.js
  //im not able to link my library so is down here
  
  let _obj={msg:"stock"}
  let _send=false;
  let _interval=100
  function Socket(room,callback){
  
    this.room=room;
    this.recived=callback;
    // this.send=false;
    this.obj={msg:"stock"}
    this.interval=100;
  
    SocketService.init( room, socket => {
      socket.on( 'newMsg', callback)
      socket.on( 'room-joined', room => {
        console.log( `socket joined ${ room }` )
        again()
      } )
  
      function again(){
        if(_send){
          // console.log("send:",_obj);
          _send=false
          socket.emit("newMsg",_obj)
        }
        setTimeout(again,_interval);
      }
  
    } )
  
    this.send=function(obj){
      _send=true;
      _obj=obj;
    }
  }
  
  
  
  
  //STACK-OVERFLOW
  //https://es.stackoverflow.com/questions/315536/c%c3%b3mo-disparar-un-event-listener-con-una-funci%c3%b3n-virtualmente
  //SOCKET SERVICE of
  //https://socketservice.herokuapp.com/
  