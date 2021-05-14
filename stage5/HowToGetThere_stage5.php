<?php

  $fp = fopen("../data/stage.txt",'w+');
  $str = "6"."\n";
  trim($str);
  echo $str;
  fwrite($fp,$str);
  fclose($fp);

?>
