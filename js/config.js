var config = function () {

    return {
        baseUrl: "http://localhost/studentsAdmin/api/index.php?",
        studentsController: "students",
        coursesController: "courses",
        getStudents: "getStudents",
        getCourses: "getCourses"


    }
}();

var DOM = function () {

    return {

        studentsContainer: document.getElementById("studentsContainer"),
        coursesContainer: document.getElementById("coursesContainer"),

    }
}();

var router = {};
router.home = function () {
    getStudents();
    getCourses();
}
router.addProduct = function () {
    getTemplate("addProduct");
}





