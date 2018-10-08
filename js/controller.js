// var studentsArray;
var studentsDic;
var coursesDic;
var adminsDic;

function clearInput() {
    var inputs = document.getElementsByClassName("form-group");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].children[0].lastElementChild.value = "";

    }
}
//students

var studentResCallback = function (res) {
    studentsDic = res;
    studentsContainer.innerHTML = "";
    for (var id in studentsDic) {
        studentsContainer.appendChild(displayCard(studentsDic[id], "student"));
    }
}

function getStudents() {
    getStudentsService(studentResCallback);
}

function showStudentDetails(event) {
    var currentID = event.currentTarget.id;
    getFormTemplate("studentForm", function () {
        mainC_headline.innerHTML = "Student Details";
        DOM.editIcon.style.display = "inline-block";
        DOM.editIcon.addEventListener("click", function () {
            editStudent(currentID);
        })
        DOM.fullName.value = studentsDic[currentID].name;
        DOM.fullName.disabled = true;
        DOM.email.value = studentsDic[currentID].email;
        DOM.email.disabled = true;
        DOM.phone.value = studentsDic[currentID].phone;
        DOM.phone.disabled = true;

    });

}

function addStudent() {
    getFormTemplate("studentForm", function () {
        mainC_headline.innerHTML = "New Student";
        DOM.submitBTN.style.display = "inline-block";
        DOM.submitBTN.addEventListener("click", saveStudent)
    });
    clearInput();

}

function editStudent(currentID) {
    DOM.editIcon.style.display = "none"
    DOM.deleteIcon.style.display = "inline-block"
    DOM.deleteIcon.addEventListener("click", function () {
        deleteStudent(currentID);
    })
    DOM.fullName.disabled = false;
    DOM.email.disabled = false;
    DOM.phone.disabled = false;
    DOM.submitBTN.innerText = "Save"
    DOM.submitBTN.style.display = "inline-block";
    DOM.submitBTN.addEventListener("click", function () {
        saveStudent(event, currentID);
    })

}

function deleteStudent(currentID) {
    deleteStudentService(currentID, studentResCallback);
    DOM.registration_form.innerHTML = "";
    DOM.deleteIcon.style.display = "none"

}
function saveStudent(event, currentID) {
    if (currentID) {
        editStudentService(currentID, DOM.fullName.value, DOM.email.value, DOM.phone.value, studentResCallback)
    }
    else {
        createStudentService(DOM.fullName.value, DOM.email.value, DOM.phone.value, studentResCallback);
    }

    clearInput();
}




function addCourse() {
    mainC_headline.innerHTML = "New Course";
    getFormTemplate("CourseForm");

}

function getCourses() {
    getCoursesService(function (res) {
        coursesDic = res;
        for (var id in coursesDic) {
            DOM.coursesContainer.appendChild(displayCard(coursesDic[id], "courses"));
        }

    })

}



function displayCard(entity, type) {
    var card = document.getElementsByName("cardTemplate")[0].cloneNode(true);
    card.id = entity.id;
    card.style.display = "inline-block";
    card.querySelector("#card-name").innerHTML = entity.name;
    if (type == "student") {
        card.querySelector("#cardP").innerHTML = entity.phone;
        card.querySelector(".card-image").src = "images/student_icon.png"
        card.addEventListener("click", showStudentDetails)

    }
    else {
        card.querySelector("#cardP").innerHTML = entity.description;
        card.querySelector(".card-image").src = "images/course-icon.png"

    }
    return card;
}


function getAdmins() {
    getAdminsService(function (res) {
        adminsDic = res;
        for (var id in adminsDic) {
            DOM.adminContainer.appendChild(displayCard(adminsDic[id], "student"));
        }

    })
}






