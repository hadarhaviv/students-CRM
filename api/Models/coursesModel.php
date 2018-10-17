<?php
require_once("./config/queries.php");
require_once("Model.php");
class coursesModel extends Model
{


    public function get_courses()
    {

        $courses = array();
        $data = $this->dbc->Select(GET_ALL_COURSES);
        for ($i = 0; $i < count($data); $i++) {
            $currentID = $data[$i]->id;
            if (!isset($courses[$currentID])) {
                $courses[$currentID]["id"] = $data[$i]->id;
                $courses[$currentID]["name"] = $data[$i]->name;
                $courses[$currentID]["description"] = $data[$i]->description;
                $courses[$currentID]["image"] = $data[$i]->image;
                $courses[$currentID]["students"] = array();

            }
            if (isset($data[$i]->student_id)) {
                $courses[$currentID]["students"][] = $data[$i]->student_id;
            }
        }
        if (count($courses) > 0) {
            return $courses;
        } else {
            return false;
        }
    }


    public function add_course($cName, $description, $imageFilename)
    {
        $stmt = $this->dbc->Prepare(ADD_COURSE);
        $stmt->bind_param("sss", $cName, $description, $imageFilename);
        $stmt->execute();
        return $stmt->insert_id;
    }


    public function delete_course($id)
    {
        $q = str_replace("p1", $id, DELETE_COURSE);
        $data = $this->dbc->Prepare($q);
        $data->execute();
        return $data->affected_rows;

    }

    public function edit_course($id, $cName, $description, $imageFilename)
    {
        $q = EDIT_COURSE;
        $data = $this->dbc->Prepare($q);
        $data->bind_param('sssi', $cName, $description, $imageFilename, $id);
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


    public function delete_students_lnk($fk_course)
    {
        $q = DELETE_LNK_BY_COURSE;
        $data = $this->dbc->Prepare($q);
        $data->bind_param('i', $fk_course);
        $data->execute();
        return $data->affected_rows;
    }
}
?>