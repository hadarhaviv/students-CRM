function getStudentsService(callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.studentsController + "&action=" + config.getStudents,
        method: "GET",
        success: function (res) {
            callback(JSON.parse(res));

        },
        error: function (res) {

        }

    })
}

function getCoursesService(callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.coursesController + "&action=" + config.getCourses,
        method: "GET",
        success: function (res) {
            callback(JSON.parse(res));

        },
        error: function (res) {

        }

    })
}



function getTemplate(param) {
    $.ajax({
        method: "GET",
        url: "http://localhost/myStore/templates/" + param + ".html",
        success: function (response) {
            DOM.main.innerHTML = response;
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function addProductService(callback) {
    $.ajax({
        method: "POST",
        url: config.dbServiceURL + config.postComment,
        data: {
            'name': name,
            'category_id': category_id,
            'price': price,
            'amount': amount,
            'pic': pic,
        },
        success: function (response) {
            console.log(JSON.parse(response));

        },
        error: function (error) {
            console.log(error)
        }
    })
}

function deleteProductService(productID, callback) {
    $.ajax({
        method: "POST",
        url: config.baseUrl + "controller=" + config.productController + "&action=" + config.deleteProduct,
        data: {
            'productId': productID,
        },
        success: function (response) {
            callback(JSON.parse(response));

        },
        error: function (error) {
            console.log(error)
        }
    })
}

