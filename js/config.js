var config = function () {

    return {
        baseUrl: "http://localhost/studentsAdmin/api/index.php?",
        studentsController: "students",
        coursesController: "courses",
        adminsController: "admins",
        getStudents: "getStudents",
        addStudent: "addStudent",
        getCourses: "getCourses",
        getAdmins: "getAdmins",


    }
}();

var DOM = function () {

    return {

        SC_Container: document.getElementById("SC_Container"),
        form_Headline: document.getElementById("form_Headline"),
        registration_form: document.getElementById("registration_form"),
        mainC_headline: document.getElementById("mainC_headline"),



    }
}();

var router = {};
router.home = function () {
    getTemplate("mainView");


}
router.admin = function () {
    getTemplate("adminView");
}





