


function arrContains(arr,val){
  for(let i=0;i<arr.length;i++){
    if (arr[i]==val)return true;
  }
  return false;
}
function preload(){
  imgMaxsize=loadImage('src/maxsize.png');
  imgMinsize=loadImage('src/minsize.png');
}

function setMenu(_menu){
  //menuAfter=_menu;
  //console.log(menu);
  setTransition(function(x){menu=x},_menu)
}


function setTransition(func,x,y){

  transition=transitionTime*2;
  transitionFunc[0]=func;
  transitionFunc[1]=x;
  transitionFunc[2]=y;

}


function mouseOnC(x,y,w,h){return (mouseXs>x*cell&&mouseXs<x*cell+w*cell&&mouseY>y*cell&&mouseY<y*cell+h*cell)}

function dimensionarPantalla(){
  phone=height>width;
  edge=min(width,height)%16
  if(phone){
    size=width-edge;
    maxsize=height;
  }else{//computer
    size=height-edge;
    maxsize=width;
  }
  cell=floor(size/16);



}

function createCVButton(_x,_y,_w,_h,_m,_id,_a){
  cvButt.create({x:_x*cell,y:_y*cell,w:_w*cell,h:_h*cell,visible:function(){return menu==_m},action:function(){setMenu(_a)},text:_id})
}

function setUpUI(){
cvButt=new CVButtons()
//function cvButtonCreate(btton_props)
//function cvButtonRender()
                    //_x,_y,_w,_h,_m,_id,_a
//cvButtonCreate({x:5*cell,y:4*cell,w:6*cell,h:1*cell,visible:function(){return menu==0;},text="test"})
//cvButtonCreate()
  containers.push(new Container(4,3,8,6,0));//menu 0 MAIN
  createCVButton(5,4,6,1,0,'start',1);//start/continue
  createCVButton(5,5,6,1,0,'levels',20);//levels
  createCVButton(5,6,6,1,0,'yo que se',3);//controls
  createCVButton(5,7,6,1,0,'create',4);//create

  containers.push(new Container(4,3,8,6,1));//menu 1
  createCVButton(4,3,2,2,1,'back',0);//back


  for(let w=0;w<levels.length;w++){
    containers.push(new Container(1,1,14,14,20+w));//menu 2 LEVELS
    createCVButton(1,1,2,2,20+w,'back',0);//back from levels

    if(w>0)createCVButton(1,7,2,2,20+w,'prevW',19+w);//swipe world
    if(w<levels.length-1)createCVButton(13,7,2,2,20+w,'nextW',21+w);//swipe world

    for(let i=0;i<levels[w].length;i++){
      createCVButton(3+i%5*2,3+floor(i/5)%5*2,2,2,20+w,'level '+(i+1) ,1000+i+w*100);
    }

  }





  containers.push(new Container(4,3,8,6,3));//menu 3
  createCVButton(4,3,2,2,3,'back',0);//back
  //_x,_y,_w,_h,_m,_id,_a

  // containers.push(new Container(4,3,8,6,4));//menu 4
  createCVButton(14,0,2,2,4,'back',0);//back


}

function Button(_x,_y,_w,_h,_m,_id,_a){
  this.x=_x;//Xpos
  this.y=_y;//Ypos
  this.w=_w;//width
  this.h=_h;//height
  this.m=_m;//menu
  this.id=_id;//identifier
  this.a=_a;//action

  this.render = function(_menu){    if(_menu==this.m){
    push();
      if(mouseOnC(this.x,this.y,this.w,this.h)){fill(255,100,200);}else{fill(255);}
      rect(this.x*cell,this.y*cell,this.w*cell,this.h*cell);
      textAlign(CENTER,CENTER);
      fill(0)
      text('button #'+this.id,(this.x+this.w/2)*cell,(this.y+this.h/2)*cell)

    pop();
  }}

  this.press = function(_menu){     if(_menu==this.m){

    if(mouseOnC(this.x,this.y,this.w,this.h)){setMenu(this.a)}

  }}


}







function Container(_x,_y,_w,_h,_m){
  this.x=_x;//Xpos
  this.y=_y;//Ypos
  this.w=_w;//width
  this.h=_h;//height
  this.m=_m;//menu


  this.render = function(_menu){ if(_menu==this.m){
    push();
      fill(218,165,32)
      rect(this.x*cell,this.y*cell,this.w*cell,this.h*cell);
    pop();
  }}

}




// var elem = document.documentElement;
// function fullscreenIt(mode) {
// if(mode){
//   if (elem.requestFullscreen) {
//     elem.requestFullscreen();
//   } else if (elem.mozRequestFullScreen) { /* Firefox */
//     elem.mozRequestFullScreen();
//   } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
//     elem.webkitRequestFullscreen();
//   } else if (elem.msRequestFullscreen) { /* IE/Edge */
//     elem.msRequestFullscreen();
//   }
// }else {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.mozCancelFullScreen) {
//     document.mozCancelFullScreen();
//   } else if (document.webkitExitFullscreen) {
//     document.webkitExitFullscreen();
//   } else if (document.msExitFullscreen) {
//     document.msExitFullscreen();
//   }
// }
// }




//----------------------CODE-TESTS---------------------
// var _arr=['0potato','1bannana','2apple','3carrot','4umbrella','5astronaut'];
// _arr.splice(3,1);
// for (var i=0;i<_arr.length;i++){
//   console.log(_arr[i],i);
// }
