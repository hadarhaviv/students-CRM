<?php
//$controller = somthing and $action = somthing
$controllers = array("students" => ["getStudents", "addStudent", "deleteStudent", "editStudent", "LinkStudentCourse"], "courses" => ["getCourses", "addCourse", "deleteCourse", "editCourse"], "admins" => ["getAdmins", "addAdmin", "editAdmin", "deleteAdmin"], "login" => ["login", "logout", "checkLogin", "createHash"], "utils" => ["uploadImage"]);

if (array_key_exists($controller, $controllers)) { //do we have such controller
    if (in_array($action, $controllers[$controller])) { //do we have such action
        navigate($controller, $action);
    } else {
        navigate($controller, "output");
    }
} else {
    navigate("error", "no_controller");
}

//error , no_action
function navigate($controllerName, $action)
{

    require_once("./Controllers/" . $controllerName . "Controller.php");
    $controllerName = $controllerName . "Controller";
    $controller = new $controllerName();

    $controller->{$action}();




}


?>