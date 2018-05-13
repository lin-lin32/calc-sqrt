<?php

$jsonParams = file_get_contents('php://input');
$data = json_decode($jsonParams, true);
$a = $data['a'];
$b = $data['b'];
$c = $data['c'];
//$a = 1;
//$b = 55;
//$c = 3;
$res = array();

if(json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    return;
}

$res['discr'] = $b * $b - 4 * $a * $c;

if($res['discr'] >= 0) {
    $res['x1'] = (-$b + sqrt($res['discr'])) / (2 * $a);
    $res['x2'] = (-$b - sqrt($res['discr'])) / (2 * $a);
}

header('Content-type: application/json');
echo json_encode($res);
