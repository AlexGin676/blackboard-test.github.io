<?php

foreach(glob('uploads/*') as $file)
{
 if(is_file($file)) unlink($file);
}

foreach(glob('json/*') as $file)
{
 if(is_file($file)) unlink($file);
}
// remove stuff from JSON
$data = file_get_contents('data.json'); 
$data = json_decode($data);

unset($data);

$data = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents('data.json', $data);


header("Location: index.html")
?>