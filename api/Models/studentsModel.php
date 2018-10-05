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
            if (isset($data[$i]->course_name)) {
                $students[$currentID]["courses"][] = $data[$i]->course_name;
            }

        }
        if (count($students) > 0) {
            return $students;
        } else {
            return false;
        }
    }

    public function add_student($sName, $phone, $email)
    {
        $stmt = $this->dbc->Prepare(ADD_USER);
        $stmt->bind_param("sss", $sName, $phone, $email);
        $stmt->execute();
        return $stmt->affected_rows;
    }


    public function delete_student($id)
    {
        $q = str_replace("p1", $id, DELETE_STUDENT);
        $data = $this->dbc->Prepare($q);
        $data->execute();
        return $data->affected_rows;

    }


    public function edit_student($id, $sName, $phone, $email)
    {
        $q = EDIT_STUDENT;
        $data = $this->dbc->Prepare($q);
        $data->bind_param('sssi', $sName, $phone, $email, $id);
        $data->execute();
        return $data->affected_rows;

    }

}
?>