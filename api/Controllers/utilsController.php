<?php

define('SITE_ROOT', realpath(dirname(dirname(dirname(__FILE__)))));


class utilsController
{

    public function uploadImage()
    {
        $target_dir = SITE_ROOT . "\\uploads\\";
        $target_file = $target_dir . $_POST['filename'];

        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "The file " . basename($_FILES["fileToUpload"]["name"]) . " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}