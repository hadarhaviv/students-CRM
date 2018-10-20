<?php

require_once("./models/adminsModel.php");
require_once("loginController.php");
require_once("utilsController.php");
class adminsController
{

    public $model;

    public function __construct()
    {
        $this->model = new adminsModel();

    }


    public function getAdmins()
    {
        if (utilsController::isAuthorized(utilsController::LEVEL_2)) {

            $res = $this->model->get_admins(utilsController::isAuthorized(utilsController::LEVEL_1));
            if ($res) {
                echo json_encode($res);
            } else {
                echo "no results";
            }

        } else {
            http_response_code(401);
        }

    }


    public function addAdmin()
    {
        if (utilsController::isAuthorized(utilsController::LEVEL_2)) {
            if (!($_POST['role'] == 1 && $_SESSION["currentUser"]->role == 2)) {
                $data = $this->model->add_admin($_POST['name'], $_POST['role'], $_POST['phone'], $_POST['email'], $_POST['imageFileName'], loginController::createHash($_POST['password']), $_POST['userName']);
                if ($data > 0) {
                    $res = $this->model->get_admins(utilsController::isAuthorized(utilsController::LEVEL_1));
                    echo json_encode($res);
                } else {
                    echo "error adding" . $_POST['name'];
                }
            }

        } else {
            http_response_code(401);
        }

    }

    public function deleteAdmin()
    {

        $data = $this->model->delete_admin($_POST['id']);
        if ($data != 0) {
            $res = $this->model->get_admins(utilsController::isAuthorized(utilsController::LEVEL_1));
            echo json_encode($res);
        } else {
            http_response_code(404);
        }

    }


    public function editAdmin()
    {
        if (utilsController::isAuthorized(utilsController::LEVEL_2)) {
            if (!($_POST['role'] == 1 && $_SESSION["currentUser"]->role == 2)) {
                $data = $this->model->edit_admin($_POST['name'], $_POST['role'], $_POST['phone'], $_POST['email'], $_POST['imageFileName'], $_POST['id']);
                if ($data != 0) {
                    $res = $this->model->get_admins(utilsController::isAuthorized(utilsController::LEVEL_1));
                    echo json_encode($res);
                } else {
                    http_response_code(404);
                }
            }

        }
    }
}




?>