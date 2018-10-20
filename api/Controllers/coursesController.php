<?php

require_once("./models/coursesModel.php");
require_once("utilsController.php");
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
        $insertId = $this->model->add_course($_POST['name'], $_POST['description'], $_POST['imageFileName']);
        if (isset($_POST['studentsList'])) {
            foreach ($_POST['studentsList'] as $student) {
                $data = $this->model->lnk_student_course($student, $insertId);
            }
        }


        if ($insertId == null) {
            http_response_code(304);
        }
        $res = $this->model->get_courses();
        echo json_encode($res);

    }

    public function deleteCourse()
    {
        if (isset($_SESSION["currentUser"]->isLoggedIn) && !(($_SESSION["currentUser"]->role) == 3)) {
            $data = $this->model->delete_course($_POST['id']);
            if ($data != 0) {
                $res = $this->model->get_courses();
                echo json_encode($res);
            } else {
                http_response_code(404);
            }
        } else {
            http_response_code(401);
        }

    }

    public function editCourse()
    {
        if (isset($_SESSION["currentUser"]->isLoggedIn) && !(($_SESSION["currentUser"]->role) == 3)) {

            $affectedRows = 0;
            $data = $this->model->edit_course($_POST['id'], $_POST['name'], $_POST['desc'], $_POST['imageFileName']);
            $affectedRows += $data;

            $data = $this->model->delete_students_lnk($_POST['id']);
            $affectedRows += $data;

            if (isset($_POST['studentsList'])) {
                foreach ($_POST['studentsList'] as $student) {
                    $data = $this->model->lnk_student_course($student, $_POST['id']);
                    $affectedRows += $data;
                }
            }

            if ($affectedRows == 0) {
                http_response_code(304);
            }

            $res = $this->model->get_courses();
            echo json_encode($res);
        } else {
            http_response_code(401);
        }



    }
}




?>