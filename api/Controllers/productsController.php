<?php

require_once("./models/ProductsModel.php");
class ProductsController
{

    public $model;

    public function __construct()
    {
        $this->model = new ProductsModel();

    }

    public function getProducts()
    {
        if (isset($_GET["productId"])) {
            echo json_encode($this->model->get_products($_GET["productId"]));
        } else {
            echo json_encode($this->model->get_products());
        }

    }
    public function deleteProduct()
    {

        $data = $this->model->delete_product($_POST["productId"]);
        if ($data != 0) {
            echo json_encode($data);
        } else {
            http_response_code(404);
        }

    }

    public function addProduct()
    {
        $data = $this->model->add_product($_POST['name'], $_POST['category_id'], $_POST['price'], $_POST['amount'], $_POST['pic']);

    }


}




?>