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
            if (isset($data[$i]->student_name)) {
                $courses[$currentID]["students"][] = $data[$i]->student_name;
            }
        }
        if (count($courses) > 0) {
            return $courses;
        } else {
            return false;
        }
    }


    public function add_course($cName, $description)
    {
        $stmt = $this->dbc->Prepare(ADD_COURSE);
        $stmt->bind_param("ss", $cName, $description);
        $stmt->execute();
        return $stmt->affected_rows;
    }


    public function delete_course($id)
    {
        $q = str_replace("p1", $id, DELETE_COURSE);
        $data = $this->dbc->Prepare($q);
        $data->execute();
        return $data->affected_rows;

    }

    public function edit_course($id, $cName, $description)
    {
        $q = EDIT_COURSE;
        $data = $this->dbc->Prepare($q);
        $data->bind_param('ssi', $cName, $description, $id);
        $data->execute();
        return $data->affected_rows;

    }

}
?>