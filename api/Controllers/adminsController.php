<?php

require_once("./models/adminsModel.php");
require_once("loginController.php");
class adminsController
{

    public $model;

    public function __construct()
    {
        $this->model = new adminsModel();

    }

    public function getAdmins()
    {
        $res = $this->model->get_admins();
        if ($res) {
            echo json_encode($res);
        } else {
            echo "no results";
        }


    }


    public function addAdmin()
    {
        $data = $this->model->add_admin($_POST['name'], $_POST['role'], $_POST['phone'], $_POST['email'], loginController::createHash($_POST['password']), $_POST['userName']);
        if ($data > 0) {
            $res = $this->model->get_admins();
            echo json_encode($res);
        } else {
            echo "error adding" . $_POST['name'];
        }

    }

    public function deleteAdmin()
    {

        $data = $this->model->delete_admin($_POST['id']);
        if ($data != 0) {
            $res = $this->model->get_admins();
            echo json_encode($res);
        } else {
            http_response_code(404);
        }

    }


    public function editAdmin()
    {

        $data = $this->model->edit_admin($_POST['name'], $_POST['role'], $_POST['phone'], $_POST['email'], loginController::createHash($_POST['password']), $_POST['userName'], $_POST['id']);
        if ($data != 0) {
            $res = $this->model->get_admins();
            echo json_encode($res);
        } else {
            http_response_code(404);
        }

    }

}




?>