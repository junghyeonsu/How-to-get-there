/*
스테이지 만들 때 바꿔 줘야하는 목록들
블럭추가, 블럭충돌설정,
블럭카운트 설정,
*/

/* 새로운 오브젝트 만들었을때,
   startGame 에 넣기,
   updataGameArea 에 넣기,
   공이랑 충돌 설정해주기 */
function startGame() {
  myball = new ball(40,40,5,30,340,"black"); /* width, height,ballRadius,x, y */
  goal = new goal(80,80,10,700,80);  /* width, height,ballRadius,x, y */
  startLocation = new start_location(40,40,5,30,340); /* width, height,ballRadius,x, y */
  /* don't touch !! */
  jump_location = new jump_location(40,40,5,150,110); /* width, height,ballRadius,x, y */

  obstacle_triangle_1 = new obstacle_triangle(-300,390); /* X , Y */
  obstacle_triangle_2 = new obstacle_triangle(-340,390);
  obstacle_triangle_3 = new obstacle_triangle(-380,390);
  obstacle_triangle_4 = new obstacle_triangle(-420,390);
  obstacle_triangle_5 = new obstacle_triangle(-460,390);

  obstacle_long_block_1 = new obstacle_long_block(400, 10, 0, 390); /* width, height,x, y */
  obstacle_long_block_2 = new obstacle_long_block(20, 100, -100, 200);
  obstacle_long_block_3 = new obstacle_long_block(20, 100, -100, 100);
  obstacle_long_block_4 = new obstacle_long_block(20, 100, -100, 100);
  obstacle_long_block_5 = new obstacle_long_block(20, 100, -100, 100);

  jumg_ball_1 = new jumg_ball(80,80,7,700, 300); /*width, height,ballRadius,x, y */
  ////////////////////////////////////////////
  ///스테이지마다바뀜//////////////////////////
                        /*width, height,x, y, text */
  block_1to1 = new block(60,60,-100,-100,"1-1"); //1-1번블럭
  block_1to2 = new block(60,60,-100,-100,"1-2"); //1-2번블럭
  block_1to3 = new block(60,60,-100,-100,"1-3"); //1-3번블럭
  block_1to4 = new block(60,60,-100,-100,"1-4"); //1-4번블럭
  block_1to5 = new block(60,60,-100,-100,"1-5"); //1-5번블럭

  block_2to1 = new block(200,10,-100,-100,"2-1"); //2-1번블럭
  block_2to2 = new block(200,10,-100,-100,"2-2"); //2-2번블럭
  block_2to3 = new block(200,10,-100,-100,"2-3"); //2-3번블럭
  block_2to4 = new block(200,10,-100,-100,"2-4"); //2-4번블럭
  block_2to5 = new block(200,10,-100,-100,"2-5"); //2-5번블럭
  ///스테이지마다바뀜//////////////////////////
  ///////////////////////////////////////////
}


function updateGameArea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    goal.update();

    if(myball.color == "blue"){
      jump_location.update();
      jump_location.x = myball.x;
      jump_location.y = myball.y-200;
    }

    ////////////////////////////////////////////
    ///스테이지마다바뀜//////////////////////////
    obstacle_triangle_1.update();
    obstacle_triangle_2.update();
    obstacle_triangle_3.update();
    obstacle_triangle_4.update();
    obstacle_triangle_5.update();

    obstacle_long_block_1.update();
    obstacle_long_block_2.update();
    obstacle_long_block_3.update();
    obstacle_long_block_4.update();
    obstacle_long_block_5.update();

    jumg_ball_1.update();
    ///스테이지마다바뀜//////////////////////////
    ///////////////////////////////////////////
    /* 스타트 버튼 클릭했을 떄 */
    if(is_start_click == true){
      /* 드래그 이벤트들 없애주기 */
      canvas.onmousedown=null;
      canvas.onmousemove=null;
      canvas.onmouseup=null;
      canvas.onmouseout=null;
      myball.newPos();
      myball.update();
    }else{
      startLocation.update();
    }
  ////////////////////////////////////////////
  ///스테이지마다바뀜//////////////////////////
    /* 블럭들에 대한 뷰 처리 */
    view_set(block_1to1_view,block_1to1);
    view_set(block_1to2_view,block_1to2);
    view_set(block_1to3_view,block_1to3);
    view_set(block_1to4_view,block_1to4);
    view_set(block_1to5_view,block_1to5);

    view_set(block_2to1_view,block_2to1);
    view_set(block_2to2_view,block_2to2);
    view_set(block_2to3_view,block_2to3);
    view_set(block_2to4_view,block_2to4);
    view_set(block_2to5_view,block_2to5);
    ///스테이지마다바뀜//////////////////////////
    ///////////////////////////////////////////
}



// 7프레임씩 캔버스 갱신
setInterval(updateGameArea, 7);

/* ball = player */
function ball(width, height,ballRadius,x, y,color) {
  this.width = width;
  this.height = height;
  this.ballRadius = ballRadius;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = -1;
  this.gravity = 0.06;
  this.gravitySpeed = -0.1;
  this.bounce = 0.4;
  this.color = color;


  this.update = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
  }

  this.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;

    /* 오른쪽 밖으로 나갔을 때 처리 */
    if(this.x-2 > canvas.width-ballRadius) {
        is_start_click = false;
        alert("아웃되었습니다.");
        document.location.reload();
      }

    /* 왼쪽 밖으로 나갔을 때 처리 */
    if(this.x+2 < 0) {
        is_start_click = false;
        alert("아웃되었습니다.");
        document.location.reload();
      }

    /* 골인 지점에 도달했을 경우! */
    if(isBall_circle_Colliding(myball,goal)){
       is_start_click = false; //공을 캔버스에서 그리는 걸 멈추게한다.
       $.post("./HowToGetThere_stage4.php",
       // 서버가 필요한 정보를 같이 보냄.
       {

       },
       function(data)
       {
         alert("Clear!");
         location.href=".././stage5/HowToGetThere_stage5.html";
       }
     );
      }

    /* 점프 공에 부딪혔을 때 */
    if(isBall_circle_Colliding(myball,jumg_ball_1)){
        myball.color = "blue";
      }


    /* 삼각형 장애물 부딪혔을 떄 */
    if(ball_Collision_obstacle_triangle(myball,obstacle_triangle_1) ||
       ball_Collision_obstacle_triangle(myball,obstacle_triangle_2) ||
       ball_Collision_obstacle_triangle(myball,obstacle_triangle_3) ||
       ball_Collision_obstacle_triangle(myball,obstacle_triangle_4) ||
       ball_Collision_obstacle_triangle(myball,obstacle_triangle_5) ||
       ball_Collision_Block(myball,obstacle_long_block_1) ||
       ball_Collision_Block(myball,obstacle_long_block_2) ||
       ball_Collision_Block(myball,obstacle_long_block_3) ||
       ball_Collision_Block(myball,obstacle_long_block_4) ||
       ball_Collision_Block(myball,obstacle_long_block_5)
        ){
      is_start_click = false; //공을 캔버스에서 그리는 걸 멈추게한다.
      alert("fail!");
      document.location.reload();
    }

    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  }

  /* 지면 튀김 처리 */
  this.hitBottom = function() {
    var rockbottom = 430 - this.height;
    ball_bound_from(rockbottom+this.ballRadius,this);  // 공과 바닥에 대한 충돌처리
    ////////////////////////////////////////////
    ///스테이지마다바뀜//////////////////////////
    ball_Collision_Block(this,block_1to1);// 공과, myblock에 대한 충돌처리
    ball_Collision_Block(this,block_1to2);
    ball_Collision_Block(this,block_1to3);
    ball_Collision_Block(this,block_1to4);
    ball_Collision_Block(this,block_1to5);

    ball_Collision_Block(this,block_2to1);
    ball_Collision_Block(this,block_2to2);
    ball_Collision_Block(this,block_2to3);
    ball_Collision_Block(this,block_2to4);
    ball_Collision_Block(this,block_2to5);
    ///스테이지마다바뀜//////////////////////////
    ///////////////////////////////////////////
  }

  this.changeleft = function(){
    this.speedX = -2;
  }

  this.changeright = function(){
    this.speedX = 2;
  }

  this.stop = function(){
    this.speedX = 0;
  }
}/* end ball */




/* block 생성자  */
function block(width, height,x, y, text) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.text = text;

  this.update = function() {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.font = '9pt Kremlin Pro Web';
      ctx.fillStyle = "gray";
      ctx.fillText(this.text , this.x , this.y);
      ctx.closePath();
  }
}

/* 삼각형 장애물 생성자  */
function obstacle_triangle(x,y) {
//  this.height = height;
  this.x = x;
  this.y = y;

  this.update = function() {
      ctx.beginPath();
      ctx.moveTo(this.x,this.y);
      ctx.lineTo(this.x+10,this.y+10);
      ctx.lineTo(this.x-10,this.y+10);
      ctx.closePath();
      ctx.fillStyle = "red";
      ctx.fill();
  }
}

/* 막대기 장애물 생성자  */
function obstacle_long_block(width, height,x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;

  this.update = function() {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
  }
}

/* 점프 볼 생성자 */
function jumg_ball(width, height,ballRadius,x, y) {
  this.width = width;
  this.height = height;
  this.ballRadius = ballRadius;
  this.x = x;
  this.y = y;

  this.update = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.font = '10pt Kremlin Pro Web';
      ctx.fillStyle = "skyblue";
      ctx.fillText("Jump" , this.x-15 , this.y-10);
      ctx.closePath();
    }
  }



//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ html ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//

/* Block count 선언 */
var block_1_count = $("#block_1_use").html();
var block_2_count = $("#block_2_use").html();

/* 블럭을 다 사용했으면 스타트 버튼을
  띄우기 위해 사용하는 변수 */
var start_check = parseInt(block_1_count)+parseInt(block_2_count);
////////////////////////////////////////////
///스테이지마다바뀜//////////////////////////
/* Block view 설정 */
var block_1to1_view = false;
var block_1to2_view = false;
var block_1to3_view = false;
var block_1to4_view = false;
var block_1to5_view = false;

var block_2to1_view = false;
var block_2to2_view = false;
var block_2to3_view = false;
var block_2to4_view = false;
var block_2to5_view = false;
///스테이지마다바뀜//////////////////////////
///////////////////////////////////////////

/* 블럭 1 클릭했을 떄 */
$("#block_1").on('click',function(){
  /* 블럭을 다 사용했을 때 */
  if(block_1_count==0){
    alert("block_1을 이미 다 사용하셨습니다.");
    return;
  }

  /* 마지막 블럭 사용했을 때 css 변경 시켜주기 */
  if(block_1_count==1){
    block_1to1.x = 200;
    block_1to1.y = 200;
    block_1to1_view = true;
    $("#block_1").css("color","gray");
    $("#block_1").css("text-decoration","line-through");
    start_check--;
  }


  ////////////////////////////////////////////
  ///스테이지마다바뀜//////////////////////////
  /* 첫번째 블럭 사용하기 */
  if(block_1_count==2){
    block_1to2.x = 0;
    block_1to2.y = 0;
    block_1to2_view = true;
    start_check--;
  }

  if(block_1_count==3){
    block_1to3.x = 50;
    block_1to3.y = 50;
    block_1to3_view = true;
    start_check--;
  }

  if(block_1_count==4){
    block_1to4.x = 100;
    block_1to4.y = 100;
    block_1to4_view = true;
    start_check--;
  }

  if(block_1_count==5){
    block_1to5.x = 150;
    block_1to5.y = 150;
    block_1to5_view = true;
    start_check--;
  }
  ///스테이지마다바뀜//////////////////////////
  ///////////////////////////////////////////

  /* 블럭을 모두 사용했는지 확인 하는 if문 */
  if(start_check == 0){
    $("#start").css('display','block');
  }

  /* 클릭할 때 마다 count 를 1 씩 줄여준다 */
  block_1_count--;
  $("#block_1_use").html(block_1_count);
});


/* 블럭 2 클릭했을 떄 */
$("#block_2").on('click',function(){
  /* 블럭을 다 사용했을 때 */
  if(block_2_count==0){
    alert("block_2를 이미 다 사용하셨습니다.");
    return;
  }

  /* 마지막 블럭 사용했을 때 css 변경 시켜주기 */
  if(block_2_count==1){
    block_2to1.x = 200;
    block_2to1.y = 200;
    block_2to1_view = true;
    $("#block_2").css("color","gray");
    $("#block_2").css("text-decoration","line-through");
    start_check--;
  }


  ////////////////////////////////////////////
  ///스테이지마다바뀜//////////////////////////
  /* 첫번째 블럭 사용하기 */
  if(block_2_count==2){
    block_2to2.x = 50;
    block_2to2.y = 50;
    block_2to2_view = true;
    start_check--;
  }

  if(block_2_count==3){
    block_2to3.x = 100;
    block_2to3.y = 100;
    block_2to3_view = true;
    start_check--;
  }

  if(block_2_count==4){
    block_2to4.x = 300;
    block_2to4.y = 300;
    block_2to4_view = true;
    start_check--;
  }

  if(block_2_count==5){
    block_2to5.x = 250;
    block_2to5.y = 250;
    block_2to5_view = true;
    start_check--;
  }
  ///스테이지마다바뀜//////////////////////////
  ///////////////////////////////////////////

  /* 블럭을 모두 사용했는지 확인 하는 if문 */
  if(start_check == 0){
    $("#start").css('display','block');
  }

  /* 클릭할 때 마다 count 를 1 씩 줄여준다 */
  block_2_count--;
  $("#block_2_use").html(block_2_count);
});





/* 드래그 하기 */

var isDragging=false;
var startX,startY;   //마우스 x,y축이 클릭되는 지점
var offsetX,offsetY; //페이지 기준 캔버스가 어디위치하는지 계산하는 변수

///////바꿔줘야하는부분///////
var block_1to1_drag = false;
var block_1to2_drag = false;
var block_1to3_drag = false;
var block_1to4_drag = false;
var block_1to5_drag = false;

var block_2to1_drag = false;
var block_2to2_drag = false;
var block_2to3_drag = false;
var block_2to4_drag = false;
var block_2to5_drag = false;
////////////////////////////

reOffset();
function reOffset(){
    var BB=canvas.getBoundingClientRect();
    offsetX=BB.left;
    offsetY=BB.top;
}

canvas.onmousedown=handleMouseDown;
canvas.onmousemove=handleMouseMove;
canvas.onmouseup=handleMouseUp;
canvas.onmouseout=handleMouseOut;

/* 네모 블럭안에 마우스가 있는지 확인하는 함수 */
function isMouseInBlock(mouseX,mouseY,block){
        var rLeft=block.x;
        var rRight=block.x+block.width;
        var rTop=block.y;
        var rBott=block.y+block.height;
        if(mouseX>rLeft && mouseX<rRight && mouseY>rTop && mouseY<rBott){
            return(true);
        }
    return(false);
}

function handleMouseDown(e){

    e.preventDefault();
    e.stopPropagation();

    startX=parseInt(getMousePos(event).x-offsetX);
    startY=parseInt(getMousePos(event).y-offsetY);



    ////////////////////////////////////////////
    ///스테이지마다바뀜//////////////////////////
    if(isMouseInBlock(startX,startY,block_1to1)){
          block_1to1_drag = true;
          isDragging=true;
          return;
    }
    if(isMouseInBlock(startX,startY,block_1to2)){
          block_1to2_drag = true;
          isDragging=true;
          return;
    }
    if(isMouseInBlock(startX,startY,block_1to3)){
          block_1to3_drag = true;
          isDragging=true;
          return;
    }
    if(isMouseInBlock(startX,startY,block_1to4)){
          block_1to4_drag = true;
          isDragging=true;
          return;
    }
    if(isMouseInBlock(startX,startY,block_1to5)){
          block_1to5_drag = true;
          isDragging=true;
          return;
    }


    if(isMouseInBlock(startX,startY,block_2to1)){
          block_2to1_drag = true;
          isDragging=true;
          return;
    }
    if(isMouseInBlock(startX,startY,block_2to2)){
          block_2to2_drag = true;
          isDragging=true;
          return;
    }
    if(isMouseInBlock(startX,startY,block_2to3)){
          block_2to3_drag = true;
          isDragging=true;
          return;
    }
    if(isMouseInBlock(startX,startY,block_2to4)){
          block_2to4_drag = true;
          isDragging=true;
          return;
    }
    if(isMouseInBlock(startX,startY,block_2to5)){
          block_2to5_drag = true;
          isDragging=true;
          return;
    }
    ///////////////////////////////////////////
    //////////////////////////////////////////
}


function handleMouseUp(e){
    // return if we're not dragging
    if(!isDragging){return;}
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // the drag is over -- clear the isDragging flag
    isDragging=false;



    /////////////////////
    ///스테이지마다바뀜///
    block_1to1_drag = false;
    block_1to2_drag = false;
    block_1to3_drag = false;
    block_1to4_drag = false;
    block_1to5_drag = false;

    block_2to1_drag = false;
    block_2to2_drag = false;
    block_2to3_drag = false;
    block_2to4_drag = false;
    block_2to5_drag = false;
    /////////////////////
    /////////////////////
}


function handleMouseOut(e){
    // return if we're not dragging
    if(!isDragging){return;}
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // the drag is over -- clear the isDragging flag
    isDragging=false;


    /////////////////////
    ///스테이지마다바뀜///
    block_1to1_drag = false;
    block_1to2_drag = false;
    block_1to3_drag = false;
    block_1to4_drag = false;
    block_1to5_drag = false;

    block_2to1_drag = false;
    block_2to2_drag = false;
    block_2to3_drag = false;
    block_2to4_drag = false;
    block_2to5_drag = false;
    /////////////////////
    /////////////////////
}


function handleMouseMove(e){

    if(!isDragging){return;}

    e.preventDefault();
    e.stopPropagation();

    mouseX=parseInt(getMousePos(event).x-offsetX);
    mouseY=parseInt(getMousePos(event).y-offsetY);

    var dx=mouseX-startX;
    var dy=mouseY-startY;


    /////////////////////
    ///스테이지마다바뀜///
    if(block_1to2_drag){
      block_1to2.x+=dx;
      block_1to2.y+=dy;
    }

    if(block_1to1_drag){
      block_1to1.x+=dx;
      block_1to1.y+=dy;
    }

    if(block_1to3_drag){
      block_1to3.x+=dx;
      block_1to3.y+=dy;
    }

    if(block_1to4_drag){
      block_1to4.x+=dx;
      block_1to4.y+=dy;
    }

    if(block_1to5_drag){
      block_1to5.x+=dx;
      block_1to5.y+=dy;
    }


    if(block_2to1_drag){
      block_2to1.x+=dx;
      block_2to1.y+=dy;
    }

    if(block_2to2_drag){
      block_2to2.x+=dx;
      block_2to2.y+=dy;
    }

    if(block_2to3_drag){
      block_2to3.x+=dx;
      block_2to3.y+=dy;
    }

    if(block_2to4_drag){
      block_2to4.x+=dx;
      block_2to4.y+=dy;
    }

    if(block_2to5_drag){
      block_2to5.x+=dx;
      block_2to5.y+=dy;
    }
    /////////////////////
    /////////////////////

    startX=mouseX;
    startY=mouseY;
}
