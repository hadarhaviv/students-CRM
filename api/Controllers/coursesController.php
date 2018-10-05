<?php

require_once("./models/coursesModel.php");
class coursesController
{

    public $model;

    public function __construct()
    {
        $this->model = new coursesModel();

    }

    public function getCourses()
    {
        $res = $this->model->get_courses();
        if ($res) {
            echo json_encode($res);
        } else {
            echo "no results";
        }


    }


    public function addCourse()
    {
        $data = $this->model->add_course($_POST['name'], $_POST['description']);
        if ($data > 0) {
            $res = $this->model->get_courses();
            echo json_encode($res);
        } else {
            echo "error adding" . $_POST['name'];
        }

    }

    public function deleteCourse()
    {

        $data = $this->model->delete_course($_POST['id']);
        if ($data != 0) {
            $res = $this->model->get_courses();
            echo json_encode($res);
        } else {
            http_response_code(404);
        }

    }

    public function editCourse()
    {

        $data = $this->model->edit_course($_POST['id'], $_POST['name'], $_POST['desc']);
        if ($data != 0) {
            $res = $this->model->get_courses();
            echo json_encode($res);
        } else {
            http_response_code(404);
        }

    }

}




?>