<?php

  $fp = fopen("./data/stage.txt",'r+') or $result = "0";
  if($result == "0"){
    echo $result;
    fclose($fp);
  }else{
    $result = fgets($fp);
    echo $result;
    fclose($fp);
  }


?>
