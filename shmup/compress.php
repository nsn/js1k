<?
/**
` _ % ~ 

`` `_ `% `~ 
_` __ _% _~
%~ %_ %% %~
~` ~_ ~% ~~

*/
$pre = "eval('eval(\'";
$post = "";
$map = array(
  'this.' => '``',
  'return' => '`_',
  'function' => '`%',
  'new Array(' => '`~',
  'c.shadow' => '_`',
  'c.stroke' => '__',
  'delete ' => '%~',
  'setTimeout(' => '%_',
  'new Date().getTime()' => '%%',
  'window.onkey' => '%~'
);
$repl = '.replace(/';
if ($fp=fopen("php://stdin","r")) {
  $string = fgets($fp,4096);
  $string.="\'";
  foreach ($map as $k => $v) {
    $string = str_replace($k,$v,$string);
    $post .= sprintf(".replace(/%s/g,\"%s\")",$v,$k);
  }
  $post = str_replace($repl,'9',$post);
  echo $pre.$string.$post.");'.replace(/9/g,\"$repl\"));";
}
?>
