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
        $data = $this->model->add_student($_POST['name'], $_POST['phone'], $_POST['email']);
        if ($data > 0) {
            $res = $this->model->get_students();
            echo json_encode($res);
        } else {
            echo "error adding" . $_POST['name'];
        }

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

        $data = $this->model->edit_student($_POST['id'], $_POST['name'], $_POST['phone'], $_POST['email']);
        if ($data != 0) {
            $res = $this->model->get_students();
            echo json_encode($res);
        } else {
            http_response_code(404);
        }

    }

    public function LinkStudentCourse()
    {

        $updateValues = 0;
        $courseArray = ($_POST["fk_course"]);
        for ($i=0; $i < count($courseArray); $i++) { 
            $data = $this->model->lnk_student_course($_POST['fk_student'], $_POST['fk_course'][$i]);    
            if ($data != 0) {
                echo $data . "value was updated ";
            }
            else{
                http_response_code(404);
                break;
            }
            
        }

    }

}




?>