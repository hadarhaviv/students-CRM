var config = function () {

    return {
        baseUrl: "http://localhost/studentsAdmin/api/index.php?",
        studentsController: "students",
        coursesController: "courses",
        adminsController: "admins",
        getStudents: "getStudents",
        deleteStudent: "deleteStudent",
        addStudent: "addStudent",
        editStudent: "editStudent",
        getCourses: "getCourses",
        deleteCourse: "deleteCourse",
        editCourse: "editCourse",
        addCourse: "addCourse",
        getAdmins: "getAdmins",


    }
}();

var DOM = function () {

    return {

        SCA_Container: document.getElementById("SCA_Container"),
        form_Headline: document.getElementById("form_Headline"),
        registration_form: document.getElementById("registration_form"),
        mainC_headline: document.getElementById("mainC_headline"),
        editIcon: document.getElementById("editIcon")



    }
}();

var router = {};
router.home = function () {
    getTemplate("mainView");


}
router.admin = function () {
    getTemplate("adminView");
}





