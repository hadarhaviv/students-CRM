<?php
require_once("./config/queries.php");
require_once("Model.php");
class adminsModel extends Model
{


    public function get_admins()
    {
        $admins = array();
        $data = $this->dbc->Select(GET_ALL_ADMINS);
        for ($i = 0; $i < count($data); $i++) {
            $currentID = $data[$i]->id;
            $admins[$currentID]["id"] = $data[$i]->id;
            $admins[$currentID]["name"] = $data[$i]->name;
            $admins[$currentID]["phone"] = $data[$i]->phone;
            $admins[$currentID]["email"] = $data[$i]->email;
            $admins[$currentID]["role_name"] = $data[$i]->role_name;
        }
        if (count($admins) > 0) {
            return $admins;
        } else {
            return false;
        }
    }


    public function add_admin($aName, $role, $phone, $email, $password, $userName)
    {
        $stmt = $this->dbc->Prepare(ADD_ADMIN);
        $stmt->bind_param("sissss", $aName, $role, $phone, $email, $password, $userName);
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


    public function edit_admin($aName, $fk_role, $phone, $email, $password, $userName, $id)
    {
        $q = EDIT_ADMIN;
        $data = $this->dbc->Prepare($q);
        $data->bind_param('sissssi', $aName, $fk_role, $phone, $email, $password, $userName, $id);
        $data->execute();
        return $data->affected_rows;

    }

}
?>