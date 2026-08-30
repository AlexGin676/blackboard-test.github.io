<?php
// на какие данные рассчитан этот скрипт
header("Content-Type: application/json");
// получаем данные от страницы
$data = file_get_contents("php://input");
// открываем наш файл с данными
$file = file_get_contents('data.json');  
// remove data from JSON
$oldData = json_decode($data);

unset($oldData);

$oldData = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents('data.json', $oldData);


// записываем в него то, что пришло от страницы
file_put_contents('data.json',$data);  
// тут же заново считываем все данные, чтобы убедиться, что всё записалось правильно
$file = file_get_contents('data.json'); 
// и сразу отправляем их на страницу, чтобы это увидел пользователь
echo $data;
// освобождаем память 
unset($file);        
?>