<?php
header('Access-Control-Allow-Origin: *');
session_start();


if (isset($_REQUEST['controller']) && isset($_REQUEST['action'])) {
    $controller = $_REQUEST['controller'];
    $action = $_REQUEST['action'];
} else {
    $controller = 'students';
    $action = 'getStudents';
}

require_once('routes.php');


?>