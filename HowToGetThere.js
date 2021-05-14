/* 마우스 x축 위치 출력 하는 함수 */
//alert(getMousePos(event).x);


$(".go_home_button").on('click',function(){
  location.href="../HowToGetThere_login.html";
});

/* 클리어 된 스테이지 클릭했을 떄 */
$(".unclear_stage").on('click',function(){
  alert("클리어하지 못한 스테이지는 이동할 수 없습니다.");
});

var start = document.getElementById("start");

/* 스타트 버튼 클릭했을 때 */
document.getElementById("start").addEventListener("click",function(){
  $("#start").css('display','none');
  is_start_click = true;
})

/* 캔버스 그리기 */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var rigthKeyPress = false;
var leftKeyPress = false;
var is_start_click = false;

/* 목표 지점 만들기 */
function goal(width, height,ballRadius,x, y) {
  this.width = width;
  this.height = height;
  this.ballRadius = ballRadius;
  this.x = x;
  this.y = y;

  this.update = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "Gold";
      ctx.fill();
      ctx.font = '10pt Kremlin Pro Web';
      ctx.fillStyle = "OrangeRed";
      ctx.fillText("Goal" , this.x-15 , this.y-10);
      ctx.closePath();
  }
}

/* 시작 부분 알려주는 ball */
function start_location(width, height,ballRadius,x, y) {
  this.width = width;
  this.height = height;
  this.ballRadius = ballRadius;
  this.x = x;
  this.y = y;

  this.update = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.font = '15pt Kremlin Pro Web';
      ctx.fillStyle = "red";
      ctx.fillText("Player" , this.x-25 , this.y-15);
      //ctx.fillText("↓" , this.x-10 , this.y-15);
      ctx.closePath();
  }
}


/* 점프 위치 알려주는 볼 ball */
function jump_location(width, height,ballRadius,x, y) {
  this.width = width;
  this.height = height;
  this.ballRadius = ballRadius;
  this.x = x;
  this.y = y;

  this.update = function() {
      ctx.beginPath();
      ctx.strokeStyle = "skyblue";
      ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
      ctx.stroke();
      ctx.font = '8pt Kremlin Pro Web';
      ctx.fillStyle = "skyblue";
      ctx.fillText("jump here" , this.x-25 , this.y-20);
      ctx.closePath();
  }
}


/* 공 튀기는 함수 */
/* here 에는 공이 부딪히는 y축을 입력해주면 된다. */
function ball_bound_from(here,myball){
  if (myball.y > here) {
    myball.y = here;
    myball.gravitySpeed = -(myball.gravitySpeed * myball.bounce);
    myball.speedY = -1;
  }
}


/* 공이 블럭의 각 부분에 부딪혔을 때 */
function ball_Collision_Block(myball,myblock){
  /* 왼쪽 부분 충돌 */
  if( isBall_Segment_Colliding(myblock.x, myblock.y+myblock.height , myblock.x, myblock.y , myball.x, myball.y, myball.ballRadius) ){
    myball.speedX = -1;
    return true;
  }

  /* 오른쪽 부분 충돌 */
  if( isBall_Segment_Colliding(myblock.x+myblock.width, myblock.y+myblock.height , myblock.x+ myblock.width , myblock.y , myball.x, myball.y, myball.ballRadius) ){
    myball.speedX = 1;
    return true;
  }

  /* 아래쪽 부분 충돌 */
  // 아래부분 충돌은 반대로 튀겨줘야 하기 때문에 ball_bound_from 함수 말고 따로 설정해준다.
  if( isBall_Segment_Colliding(myblock.x, myblock.y+myblock.height , myblock.x+ myblock.width,  myblock.y+myblock.height , myball.x, myball.y, myball.ballRadius) ){
      myball.y = myblock.y + myblock.height + myball.ballRadius;
      myball.speedY = 1;
      return true;
  }

  /* 위쪽 부분 충돌 */
  if( isBall_Segment_Colliding(myblock.x, myblock.y , myblock.x+ myblock.width,  myblock.y , myball.x, myball.y, myball.ballRadius) ){
    ball_bound_from(myblock.y- myball.ballRadius,myball);
    return true;
  }
}


/* 대쉬 공이 블럭의 각 부분에 부딪혔을 때 */
function dash_Collision_Block(myball,myblock){
  /* 왼쪽 부분 충돌 */
  if( isBall_Segment_Colliding(myblock.x, myblock.y+myblock.height , myblock.x, myblock.y , myball.x, myball.y, myball.ballRadius) ){
    return true;
  }

  /* 오른쪽 부분 충돌 */
  if( isBall_Segment_Colliding(myblock.x+myblock.width, myblock.y+myblock.height , myblock.x+ myblock.width , myblock.y , myball.x, myball.y, myball.ballRadius) ){
    return true;
  }

  /* 아래쪽 부분 충돌 */
  // 아래부분 충돌은 반대로 튀겨줘야 하기 때문에 ball_bound_from 함수 말고 따로 설정해준다.
  if( isBall_Segment_Colliding(myblock.x, myblock.y+myblock.height , myblock.x+ myblock.width,  myblock.y+myblock.height , myball.x, myball.y, myball.ballRadius) ){
      return true;
  }

  /* 위쪽 부분 충돌 */
  if( isBall_Segment_Colliding(myblock.x, myblock.y , myblock.x+ myblock.width,  myblock.y , myball.x, myball.y, myball.ballRadius) ){
    return true;
  }
}



/* 공이 삼각형 장애물에 부딪혔을 때 */
function ball_Collision_obstacle_triangle(myball,obstacle){
  // 3개의 선에 대해서 처리 해줘야함
  if(isBall_Segment_Colliding(obstacle.x , obstacle.y , obstacle.x+10 , obstacle.y+10 , myball.x, myball.y, myball.ballRadius )){
    return true;
  }
  if(isBall_Segment_Colliding(obstacle.x+10 , obstacle.y+10 , obstacle.x-10 , obstacle.y+10 , myball.x, myball.y, myball.ballRadius )){
    return true;
  }
  if(isBall_Segment_Colliding(obstacle.x , obstacle.y , obstacle.x-10 , obstacle.y+10 , myball.x, myball.y, myball.ballRadius )){
    return true;
  }
}


/* 선분이랑 원 충돌 */
/* ball_Collision_Block 함수 안에 쓰였음 */
// [x0,y0] to [x1,y1] define a line segment
// [cx,cy] is circle centerpoint, cr is circle radius
function isBall_Segment_Colliding(x0,y0,x1,y1,cx,cy,cr){

    // calc delta distance: source point to line start
    var dx=cx-x0;
    var dy=cy-y0;

    // calc delta distance: line start to end
    var dxx=x1-x0;
    var dyy=y1-y0;

    // Calc position on line normalized between 0.00 & 1.00
    // == dot product divided by delta line distances squared
    var t=(dx*dxx+dy*dyy)/(dxx*dxx+dyy*dyy);

    // calc nearest pt on line
    var x=x0+dxx*t;
    var y=y0+dyy*t;

    // clamp results to being on the segment
    if(t<0){x=x0;y=y0;}
    if(t>1){x=x1;y=y1;}

    return( (cx-x)*(cx-x)+(cy-y)*(cy-y) < cr*cr );
}


/* 원이랑 원 충돌 */
// circle objects: { x:, y:, radius: }
// return true if the 2 circles are colliding
// c1 and c2 are circles as defined above
function isBall_circle_Colliding(c1,c2){
    var dx=c2.x-c1.x;
    var dy=c2.y-c1.y;
    var rSum=c1.ballRadius+c2.ballRadius;
    return(dx*dx+dy*dy<=rSum*rSum);
}


/* view 설정 해주는 함수 */
/* view 가 true 이면 block 을 업데이트 시작해준다 */
function view_set(view,block){
  if(view == true){
  block.update();
  }
}



/* 마우스 위치 알아내는 함수 */
function getMousePos(event) {
    return {
        x: event.clientX,
        y: event.clientY
    };
}


/* keydown */
document.addEventListener('keydown', function(e){
  if(e.keyCode == 39) {
      myball.changeright();
  }
  /* 왼쪽 방향키 */
  else if(e.keyCode == 37) {
      myball.changeleft();
  }
  /* 스페이스바 */
  else if(e.keyCode == 32){
    if(myball.color == "blue"){
      myball.y -= 200;
      myball.color = "black";
    }else if(myball.color == "orange"){
      myball.color = "black";
    }
  }
});


/* keyup */
document.addEventListener("keyup", function(e){
  if(e.keyCode == 39 || e.keyCode == 37) {
      myball.stop();
  }
});





/* block_intro_modal */
$("#block_intro_button").on('click',function(){
  $("#block_intro_modal").fadeIn(500);
});

$(".block_intro_close").on('click',function(){
  $("#block_intro_modal").fadeOut(500);
});

/* game_intro_modal */
$("#game_intro_button").on('click',function(){
  $("#game_intro_modal").fadeIn(500);
});

$(".block_intro_close").on('click',function(){
  $("#game_intro_modal").fadeOut(500);
});

/*
$(".reset_button").on('click',function(){
  ctx.restore();
});
*/
