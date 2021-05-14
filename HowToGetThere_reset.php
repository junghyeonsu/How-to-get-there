<?php

  $fp = fopen("./data/stage.txt",'w+');
  fwrite($fp,"1");
  fclose($fp);

?>
