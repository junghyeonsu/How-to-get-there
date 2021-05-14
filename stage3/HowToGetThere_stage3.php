<?php

  $fp = fopen("../data/stage.txt",'w+');
  $str = "4"."\n";
  trim($str);
  echo $str;
  fwrite($fp,$str);
  fclose($fp);

?>
