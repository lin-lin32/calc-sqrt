<?php

$a = isset($_POST['a']) ? $_POST['a'] : null;
$b = isset($_POST['b']) ? $_POST['b'] : null;
$c = isset($_POST['c']) ? $_POST['c'] : null;
$res = array();

header('Content-type: application/json');

if($a == 0) {
    http_response_code(400);
    echo json_encode(array('error' => '"a" can not be zero'));

    return;
}

$res['discr'] = $b * $b - 4 * $a * $c;

if($res['discr'] >= 0) {
    $res['x1'] = (-$b + sqrt($res['discr'])) / (2 * $a);
    $res['x2'] = (-$b - sqrt($res['discr'])) / (2 * $a);
}

echo json_encode($res);
