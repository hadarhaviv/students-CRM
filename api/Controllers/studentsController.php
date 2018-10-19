<?php

require_once("./models/studentsModel.php");
class studentsController
{

    public $model;

    public function __construct()
    {
        $this->model = new studentsModel();

    }

    public function getStudents()
    {
        $res = $this->model->get_students();
        if ($res) {
            echo json_encode($res);
        } else {
            echo "no results";
        }


    }


    public function addStudent()
    {

        $insertId = $this->model->add_student($_POST['name'], $_POST['phone'], $_POST['email'], $_POST['imageFileName']);
        if (isset($_POST['coursesList'])) {
            foreach ($_POST['coursesList'] as $course) {
                $data = $this->model->lnk_student_course($insertId, $course);
            }
        }

        if ($insertId == null) {
            http_response_code(304);
        }
        $res = $this->model->get_students();
        echo json_encode($res);

    }


    public function deleteStudent()
    {

        $data = $this->model->delete_student($_POST['id']);
        if ($data > 0) {
            $res = $this->model->get_students();
            echo json_encode($res);
        } else {
            http_response_code(404);
        }

    }

    public function editStudent()
    {

        $affectedRows = 0;
        $data = $this->model->edit_student($_POST['id'], $_POST['name'], $_POST['phone'], $_POST['email'], $_POST['imageFileName']);
        $affectedRows += $data;

        $data = $this->model->delete_courses_lnk($_POST['id']);
        $affectedRows += $data;

        if (isset($_POST['coursesList'])) {
            foreach ($_POST['coursesList'] as $course) {
                $data = $this->model->lnk_student_course($_POST['id'], $course);
                $affectedRows += $data;
            }
        }

        if ($affectedRows == 0) {
            http_response_code(304);
        }

        $res = $this->model->get_students();
        echo json_encode($res);

    }


}




?>