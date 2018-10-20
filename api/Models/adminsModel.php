<?php
require_once("./config/queries.php");
require_once("Model.php");
class adminsModel extends Model
{


    public function get_admins($owner)
    {
        $admins = array();
        if ($owner) {
            $data = $this->dbc->Select(GET_ALL_ADMINS);
        } else {
            $data = $this->dbc->Select(GET_ADMINS_NO_OWNER);
        }
        for ($i = 0; $i < count($data); $i++) {
            $currentID = $data[$i]->id;
            $admins[$currentID]["id"] = $data[$i]->id;
            $admins[$currentID]["name"] = $data[$i]->name;
            $admins[$currentID]["phone"] = $data[$i]->phone;
            $admins[$currentID]["email"] = $data[$i]->email;
            $admins[$currentID]["roleID"] = $data[$i]->fk_role;
            $admins[$currentID]["userName"] = $data[$i]->user_name;
            $admins[$currentID]["image"] = $data[$i]->image;

        }
        if (count($admins) > 0) {
            return $admins;
        } else {
            return false;
        }
    }


    public function add_admin($aName, $role, $phone, $email, $password, $userName, $imageFilename)
    {
        $stmt = $this->dbc->Prepare(ADD_ADMIN);
        $stmt->bind_param("sisssss", $aName, $role, $phone, $email, $password, $userName, $imageFilename);
        $stmt->execute();
        return $stmt->affected_rows;
    }

    public function delete_admin($id)
    {
        $q = str_replace("p1", $id, DELETE_ADMIN);
        $data = $this->dbc->Prepare($q);
        $data->execute();
        return $data->affected_rows;

    }


    public function edit_admin($aName, $fk_role, $phone, $email, $imageFilename, $id)
    {
        $q = EDIT_ADMIN;
        $data = $this->dbc->Prepare($q);
        $data->bind_param('sisssi', $aName, $fk_role, $phone, $email, $imageFilename, $id);
        $data->execute();
        return $data->affected_rows;

    }

}
?>