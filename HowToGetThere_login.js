$("#go").on("click",function(){

  //location.href="./stage1/HowToGetThere_stage1.html";

  $.post("./HowToGetThere_login.php",
  // 서버가 필요한 정보를 같이 보냄.
  {

  },
  function(data)
  {
    switch (parseInt(data)) {

      case 0:
      location.href="./stage1/HowToGetThere_stage1.html";
      break;

      case 1:
      location.href="./stage1/HowToGetThere_stage1.html";
      break;

      case 2:
      location.href="./stage2/HowToGetThere_stage2.html";
      break;

      case 3:
      location.href="./stage3/HowToGetThere_stage3.html";
      break;

      case 4:
      location.href="./stage4/HowToGetThere_stage4.html";
      break;

      case 5:
      location.href="./stage5/HowToGetThere_stage5.html";
      break;

      case 6:
      location.href="./stage6/HowToGetThere_stage6.html";
      break;

      case 7:
      location.href="./stage7/HowToGetThere_stage7.html";
      break;

      case 8:
      location.href="./stage8/HowToGetThere_stage8.html";
      break;

      case 9:
      location.href="./stage9/HowToGetThere_stage9.html";
      break;
      default:
      break;
    }
  })
});


$("#reset").on("click",function(){
  $.post("./HowToGetThere_reset.php",
  // 서버가 필요한 정보를 같이 보냄.
  {

  },
  function(data)
  {
    $("#resettext").css("opacity","1");
    setTimeout(function() {
        $("#resettext").css("opacity","0");
    }, 2000);
  })
});
