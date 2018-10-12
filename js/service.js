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

function createStudentService(name, email, phone, callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.studentsController + "&action=" + config.addStudent,
        method: "POST",
        data: {
            'name': name,
            'email': email,
            'phone': phone,
        },
        success: function (res) {
            callback(JSON.parse(res));

        },
        error: function (res) {

        }

    })
}

function editStudentService(id, name, email, phone, callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.studentsController + "&action=" + config.editStudent,
        method: "POST",
        data: {
            'id': id,
            'name': name,
            'email': email,
            'phone': phone,
        },
        success: function (res) {
            callback(JSON.parse(res));

        },
        error: function (res) {

        }

    })
}

function deleteStudentService(id, callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.studentsController + "&action=" + config.deleteStudent,
        method: "POST",
        data: {
            'id': id
        },
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

function getAdminsService(callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.adminsController + "&action=" + config.getAdmins,
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
        url: "http://localhost/studentsAdmin/templates/" + param + ".html",
        success: function (response) {
            DOM.SCA_Container.innerHTML = response;
            for (let i = 0; i < DOM.SCA_Container.childElementCount; i++) {
                var currentChild = DOM.SCA_Container.children[i];
                switch (currentChild.id) {
                    case "studentCol":
                        DOM.studentsContainer = document.getElementById("studentsContainer");
                        getStudents();
                        break;
                    case "courseCol":
                        DOM.coursesContainer = document.getElementById("coursesContainer");
                        getCourses();
                        break;
                    case "adminCol":
                        DOM.adminContainer = document.getElementById("adminContainer");
                        getAdmins();
                        break;

                }

            }

        },
        error: function (error) {
            console.log(error)
        }
    })
}

function getFormTemplate(param, callback) {
    $.ajax({
        method: "GET",
        url: "http://localhost/studentsAdmin/templates/" + param + ".html",
        success: function (response) {
            DOM.registration_form.innerHTML = response;
            DOM.submitBTN = document.getElementById("submit_button");
            DOM.deleteIcon = document.getElementById("deleteIcon");
            switch (param) {
                case "studentForm":
                    DOM.fullName = document.getElementById("full_name");
                    DOM.email = document.getElementById("email");
                    DOM.phone = document.getElementById("phone");

                    callback();
                    break;
                case "courseForm":
                    DOM.courseName = document.getElementById("course_name");
                    DOM.description = document.getElementById("description");
                    callback();
                    break;
            }

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

