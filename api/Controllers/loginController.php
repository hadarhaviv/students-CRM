<?php

require_once("./models/loginModel.php");
class loginController
{

    public $model;

    public function __construct()
    {
        $this->model = new loginModel();

    }

    public function login()
    {
        $res = $this->model->loginAction($_POST['userName'], $_POST['password']);
        if ($res) {
            echo "authorized";
        } else {
            http_response_code(401);
        }

    }

    public function checkLogin()
    {
        if (isset($_SESSION)) {
            if (isset($_SESSION["currentUser"]->isLoggedIn)) {
                echo json_encode($_SESSION);
            } else {
                http_response_code(401);
            }
        } else {
            http_response_code(401);
        }

    }

    public function logout()
    {
        session_unset();
        echo true;

    }

    public static function createHash($pass)
    {
        return password_hash($pass, PASSWORD_DEFAULT);
    }


}




?>