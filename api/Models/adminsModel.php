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
            $admins[$currentID]["roleID"] = $data[$i]->fk_role;
            $admins[$currentID]["userName"] = $data[$i]->user_name;
            $admins[$currentID]["password"] = $data[$i]->password;
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


    public function edit_admin($aName, $fk_role, $phone, $email, $id)
    {
        $q = EDIT_ADMIN;
        $data = $this->dbc->Prepare($q);
        $data->bind_param('sissi', $aName, $fk_role, $phone, $email, $id);
        $data->execute();
        return $data->affected_rows;

    }

}
?>