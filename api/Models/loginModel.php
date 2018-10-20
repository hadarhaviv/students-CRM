<?php
require_once("./config/queries.php");
require_once("Model.php");

class LoginModel extends Model
{

    public function loginAction($userName, $password)
    {

        $q = "SELECT * FROM ADMIN where user_name = '$userName'";
        $loggedInUser = $this->dbc->Select($q);
        if (count($loggedInUser) > 0) {
            $_SESSION['currentUser'] = new \stdClass();
            if (password_verify($password, $loggedInUser[0]->password)) {
                $_SESSION['currentUser']->id = $loggedInUser[0]->id;
                $_SESSION['currentUser']->user_name = $loggedInUser[0]->user_name;
                $_SESSION['currentUser']->isLoggedIn = true;
                $_SESSION['currentUser']->role = $loggedInUser[0]->fk_role;

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

}
?>