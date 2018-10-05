var config = function () {

    return {
        baseUrl: "http://localhost/studentsAdmin/api/index.php?",
        studentsController: "students",
        coursesController: "courses",
        adminsController: "admins",
        getStudents: "getStudents",
        getCourses: "getCourses",
        getAdmins: "getAdmins",


    }
}();

var DOM = function () {

    return {

        SC_Container: document.getElementById("SC_Container")

    }
}();

var router = {};
router.home = function () {
    getTemplate("mainView");


}
router.admin = function () {
    getTemplate("adminView");
}





