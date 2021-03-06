<?php
require_once("./config/queries.php");
require_once("Model.php");
class studentsModel extends Model
{


    public function get_students()
    {
        $students = array();
        $data = $this->dbc->Select(GET_ALL_STUDENTS);
        for ($i = 0; $i < count($data); $i++) {
            $currentID = $data[$i]->id;
            if (!isset($students[$currentID])) {
                $students[$currentID]["id"] = $data[$i]->id;
                $students[$currentID]["name"] = $data[$i]->name;
                $students[$currentID]["phone"] = $data[$i]->phone;
                $students[$currentID]["email"] = $data[$i]->email;
                $students[$currentID]["image"] = $data[$i]->image;
                $students[$currentID]["courses"] = array();

            }
            if (isset($data[$i]->course_id)) {
                $students[$currentID]["courses"][] = $data[$i]->course_id;
            }
        }
        return $students;
    }

    public function add_student($sName, $phone, $email, $imageFilename)
    {
        $stmt = $this->dbc->Prepare(ADD_USER);
        $stmt->bind_param("ssss", $sName, $phone, $email, $imageFilename);
        $stmt->execute();
        return $stmt->insert_id;
    }


    public function delete_student($id)
    {
        $q = str_replace("p1", $id, DELETE_STUDENT);
        $data = $this->dbc->Prepare($q);
        $data->execute();
        return $data->affected_rows;

    }


    public function edit_student($id, $sName, $phone, $email, $imageFilename)
    {
        $q = EDIT_STUDENT;
        $data = $this->dbc->Prepare($q);
        $data->bind_param('ssssi', $sName, $phone, $email, $imageFilename, $id);
        $data->execute();
        return $data->affected_rows;

    }


    public function lnk_student_course($fk_student, $fk_course)
    {
        $q = STUDENT_LNK_COURSE;
        $data = $this->dbc->Prepare($q);
        $data->bind_param('ii', $fk_student, $fk_course);
        $data->execute();
        return $data->affected_rows;

    }

    public function delete_courses_lnk($fk_student)
    {
        $q = DELETE_LNK_BY_STUDENT;
        $data = $this->dbc->Prepare($q);
        $data->bind_param('i', $fk_student);
        $data->execute();
        return $data->affected_rows;
    }
}
?>