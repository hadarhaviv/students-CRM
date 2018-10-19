//students

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

function createStudentService(name, email, phone, coursesList, imageFileName, callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.studentsController + "&action=" + config.addStudent,
        method: "POST",
        data: {
            'name': name,
            'email': email,
            'phone': phone,
            'coursesList': coursesList,
            'imageFileName': imageFileName
        },
        success: function (res) {
            callback(JSON.parse(res));

        },
        error: function (res) {

        }

    })
}

function editStudentService(id, name, email, phone, coursesList, imageFileName, callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.studentsController + "&action=" + config.editStudent,
        method: "POST",
        data: {
            'id': id,
            'name': name,
            'email': email,
            'phone': phone,
            'coursesList': coursesList,
            'imageFileName': imageFileName
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

//courses

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


function deleteCourseService(id, callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.coursesController + "&action=" + config.deleteCourse,
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

function editCourseService(id, courseName, description, studentsList, imageFileName, callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.coursesController + "&action=" + config.editCourse,
        method: "POST",
        data: {
            'id': id,
            'name': courseName,
            'desc': description,
            'studentsList': studentsList,
            'imageFileName': imageFileName
        },
        success: function (res) {
            callback(JSON.parse(res));

        },
        error: function (res) {

        }

    })
}

function createCourseService(courseName, description, studentsList, imageFileName, callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.coursesController + "&action=" + config.addCourse,
        method: "POST",
        data: {
            'name': courseName,
            'description': description,
            'studentsList': studentsList,
            'imageFileName': imageFileName
        },
        success: function (res) {
            callback(JSON.parse(res));

        },
        error: function (res) {

        }

    })
}


//admins

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

function deleteAdminService(id, callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.adminsController + "&action=" + config.deleteAdmin,
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

function editAdminService(id, aName, email, phone, role, callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.adminsController + "&action=" + config.editAdmin,
        method: "POST",
        data: {
            'id': id,
            'name': aName,
            'phone': phone,
            'email': email,
            'role': role

        },
        success: function (res) {
            callback(JSON.parse(res));

        },
        error: function (res) {

        }

    })
}

function createAdminService(aName, email, phone, userName, password, role, callback) {
    $.ajax({
        url: config.baseUrl + "controller=" + config.adminsController + "&action=" + config.addAdmin,
        method: "POST",
        data: {
            'name': aName,
            'email': email,
            'phone': phone,
            'userName': userName,
            'password': password,
            'role': role
        },
        success: function (res) {
            callback(JSON.parse(res));

        },
        error: function (res) {

        }

    })
}


//general services
function uploadImage(filename) {
    DOM.imageUploadFileName.value = filename;

    $.ajax({
        url: 'http://localhost/studentsAdmin/api/index.php?controller=utils&action=uploadImage',
        type: 'POST',
        data: new FormData($('#IMGForm')[0]),
        processData: false,
        contentType: false,
        success: function () {
            console.log("image was uploaded.");
        }
    });
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
            DOM.imageUploadFileName = document.getElementById("imageUploadFileName");
            DOM.image = document.getElementById("image");
            switch (param) {
                case "studentForm":
                    DOM.fullName = document.getElementById("full_name");
                    DOM.email = document.getElementById("email");
                    DOM.phone = document.getElementById("phone");
                    DOM.coursesSelect = document.getElementById("courses-select");

                    callback();
                    break;

                case "courseForm":
                    DOM.courseName = document.getElementById("course_name");
                    DOM.description = document.getElementById("description");
                    DOM.studentsSelect = document.getElementById("students-select");

                    callback();
                    break;

                case "adminForm":
                    DOM.fullName = document.getElementById("full_name");
                    DOM.email = document.getElementById("email");
                    DOM.phone = document.getElementById("phone");
                    DOM.userName = document.getElementById("userName");
                    DOM.password = document.getElementById("password");
                    DOM.role = document.getElementById("role");
                    callback();
                    break;
            }

        },
        error: function (error) {
            console.log(error)
        }
    })
}



