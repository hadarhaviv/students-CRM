// var studentsArray;
var studentsDic;
var coursesDic;
var adminsDic;

function randomString() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4() + s4();
}

function cloneElement(currentElement) {
    var newElement = currentElement.cloneNode(true);
    currentElement.parentNode.replaceChild(newElement, currentElement);
    return newElement;
}

function clearInput() {
    var inputs = document.getElementsByClassName("form-group");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].children[0].lastElementChild.value = "";

    }
}

function displayCard(entity, type) {
    var card = document.getElementsByName("cardTemplate")[0].cloneNode(true);
    card.id = entity.id;
    card.style.display = "inline-block";
    card.querySelector("#card-name").innerHTML = entity.name;
    if (type == "student") {
        card.querySelector("#cardP").innerHTML = entity.phone;
        card.querySelector(".card-image").src = "images/student_icon.png";
        card.addEventListener("click", showStudentDetails)
    }
    if (type == "course") {
        card.querySelector("#cardP").innerHTML = entity.description;
        card.querySelector(".card-image").src = "images/course-icon.png"
        card.addEventListener("click", showCourseDetails)
    }
    if (type == "admin") {
        card.querySelector("#cardP").innerHTML = entity.phone;
        card.querySelector(".card-image").src = "images/course-icon.png"
        card.addEventListener("click", showAdminDetails)
    }
    if (entity.image) {
        card.querySelector(".card-image").src = "uploads/" + entity.image;
    }
    return card;
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
    if (DOM.deleteIcon) {
        DOM.deleteIcon.style.display = "none"
    }
    var currentID = event.currentTarget.id;
    getFormTemplate("studentForm", function () {
        mainC_headline.innerHTML = "Student Details";
        DOM.editIcon.style.display = "inline-block";
        DOM.editIcon = cloneElement(DOM.editIcon);
        DOM.editIcon.addEventListener("click", function () {
            editStudent(currentID);
        })
        DOM.fullName.value = studentsDic[currentID].name;
        DOM.fullName.disabled = true;
        DOM.email.value = studentsDic[currentID].email;
        DOM.email.disabled = true;
        DOM.phone.value = studentsDic[currentID].phone;
        DOM.phone.disabled = true;
        DOM.coursesSelect.disabled = true;
        createCoursesSelectDOM(currentID);
        if (studentsDic[currentID].image) {
            DOM.image.src = "uploads/" + studentsDic[currentID].image;
        }
        $('#courses-select').select2();

    });

}

function addStudent() {
    getFormTemplate("studentForm", function () {
        mainC_headline.innerHTML = "New Student";
        DOM.submitBTN.style.display = "inline-block";
        DOM.submitBTN.addEventListener("click", saveStudent)
        DOM.imageForm.style.display = "inline-block";
        createCoursesSelectDOM(null);
        $('#courses-select').select2();
    });
    clearInput();

}

function editStudent(currentID) {
    DOM.editIcon.style.display = "none"
    DOM.deleteIcon.style.display = "inline-block"
    DOM.imageForm.style.display = "inline-block";
    DOM.deleteIcon = cloneElement(DOM.deleteIcon);
    DOM.deleteIcon.addEventListener("click", function () {
        deleteStudent(currentID);
    })
    DOM.fullName.disabled = false;
    DOM.email.disabled = false;
    DOM.phone.disabled = false;
    DOM.coursesSelect.disabled = false;
    DOM.submitBTN.innerText = "Save"
    DOM.submitBTN.style.display = "inline-block";
    DOM.submitBTN = cloneElement(DOM.submitBTN);
    DOM.submitBTN.addEventListener("click", function () {
        saveStudent(event, currentID);
    })

}

function deleteStudent(currentID) {
    deleteStudentService(currentID, studentResCallback);
    DOM.registration_form.innerHTML = "";
    DOM.deleteIcon.style.display = "none"
    mainC_headline.innerHTML = "";

}

function saveStudent(event, currentID) {
    var filename = "";
    let coursesList = [];

    for (let i = 0; i < DOM.coursesSelect.selectedOptions.length; i++) {
        coursesList.push(DOM.coursesSelect.selectedOptions[i].dataset.value);
    }


    if (DOM.fileToUpload.value) {
        filename = randomString() + ".jpg";
        uploadImage(filename);
    }

    else if (currentID) {
        filename = studentsDic[currentID]["image"];
    }


    if (currentID) {

        editStudentService(currentID, DOM.fullName.value, DOM.email.value, DOM.phone.value, coursesList, filename, studentResCallback)
    }
    else {
        createStudentService(DOM.fullName.value, DOM.email.value, DOM.phone.value, coursesList, filename, studentResCallback);
    }
    DOM.registration_form.innerHTML = "";
    DOM.deleteIcon.style.display = "none"
    mainC_headline.innerHTML = "";

}

function createCoursesSelectDOM(currentID) {
    for (let key in coursesDic) {

        var option = document.createElement("option");
        option.dataset.value = key;
        option.innerHTML = coursesDic[key]["name"];
        if (currentID) {
            if (studentsDic[currentID]["courses"].includes(key)) {
                option.selected = true;
            }
        }

        DOM.coursesSelect.appendChild(option);

    }
}

//courses


function getCourses() {
    getCoursesService(coursesResCallback);

}

var coursesResCallback = function (res) {
    coursesDic = res;
    coursesContainer.innerHTML = "";
    for (var id in coursesDic) {
        coursesContainer.appendChild(displayCard(coursesDic[id], "course"));
    }
}

function createStudentsSelectDOM(currentID) {
    for (let key in studentsDic) {

        var option = document.createElement("option");
        option.dataset.value = key;
        option.innerHTML = studentsDic[key]["name"];
        if (currentID) {
            if (coursesDic[currentID]["students"].includes(key)) {
                option.selected = true;
            }
        }

        DOM.studentsSelect.appendChild(option);

    }
}

function showCourseDetails(event) {
    if (DOM.deleteIcon) {
        DOM.deleteIcon.style.display = "none"
    }
    var currentID = event.currentTarget.id;
    getFormTemplate("courseForm", function () {
        mainC_headline.innerHTML = "Course Details";
        DOM.editIcon.style.display = "inline-block";
        DOM.editIcon = cloneElement(DOM.editIcon);
        DOM.editIcon.addEventListener("click", function () {
            editCourse(currentID);
        })
        DOM.courseName.value = coursesDic[currentID].name;
        DOM.courseName.disabled = true;
        DOM.description.value = coursesDic[currentID].description;
        DOM.description.disabled = true;
        DOM.studentsSelect.disabled = true;

        if (coursesDic[currentID].image) {
            DOM.image.src = "uploads/" + coursesDic[currentID].image;
        }

        createStudentsSelectDOM(currentID);
        $('#students-select').select2();

    });


}

function addCourse() {
    getFormTemplate("courseForm", function () {
        mainC_headline.innerHTML = "New Course";
        DOM.submitBTN.style.display = "inline-block";
        DOM.submitBTN.addEventListener("click", saveCourse)
        createStudentsSelectDOM(null);
        $('#students-select').select2();


    });
    clearInput();

}

function saveCourse(event, currentID) {

    let studentsList = [];

    for (let i = 0; i < DOM.studentsSelect.selectedOptions.length; i++) {
        studentsList.push(DOM.studentsSelect.selectedOptions[i].dataset.value);
    }

    // if image is being uploaded
    var filename = "";

    if (DOM.fileToUpload.value) {
        filename = randomString() + ".jpg";
        uploadImage(filename);
    }
    else if (currentID) {
        filename = coursesDic[currentID]["image"];
    }

    //check if edit or create
    if (currentID) {
        editCourseService(currentID, DOM.courseName.value, DOM.description.value, studentsList, filename, coursesResCallback);
    }
    else {
        createCourseService(DOM.courseName.value, DOM.description.value, studentsList, filename, coursesResCallback);
    }


    DOM.registration_form.innerHTML = "";
    DOM.deleteIcon.style.display = "none"
    mainC_headline.innerHTML = "";
}


function deleteCourse(currentID) {
    deleteCourseService(currentID, coursesResCallback);
    DOM.registration_form.innerHTML = "";
    DOM.deleteIcon.style.display = "none"
    mainC_headline.innerHTML = "";

}

function editCourse(currentID) {
    DOM.editIcon.style.display = "none"
    DOM.deleteIcon.style.display = "inline-block";
    DOM.imageForm.style.display = "inline-block";
    DOM.deleteIcon = cloneElement(DOM.deleteIcon);
    DOM.deleteIcon.addEventListener("click", function () {
        deleteCourse(currentID);
    })
    DOM.studentsSelect.disabled = false;
    DOM.courseName.disabled = false;
    DOM.description.disabled = false;
    DOM.submitBTN.innerText = "Save"
    DOM.submitBTN.style.display = "inline-block";
    DOM.submitBTN = cloneElement(DOM.submitBTN);
    DOM.submitBTN.addEventListener("click", function () {
        saveCourse(event, currentID);
    })

}

//admins

var adminsResCallback = function (res) {
    adminsDic = res;
    adminContainer.innerHTML = "";
    for (var id in adminsDic) {
        adminContainer.appendChild(displayCard(adminsDic[id], "admin"));
    }
}

function getAdmins() {
    getAdminsService(adminsResCallback);

}


function addAdmin() {
    getFormTemplate("adminForm", function () {
        mainC_headline.innerHTML = "New Admin";
        DOM.submitBTN.style.display = "inline-block";
        DOM.imageForm.style.display = "inline-block";
        DOM.passC.style.display = "inline-block";
        DOM.uNameC.style.display = "inline-block";
        DOM.submitBTN.addEventListener("click", saveAdmin)
    });
    clearInput();

}


function showAdminDetails(event) {
    if (DOM.deleteIcon) {
        DOM.deleteIcon.style.display = "none"
    }
    var currentID = event.currentTarget.id;
    getFormTemplate("adminForm", function () {
        mainC_headline.innerHTML = "Admin Details";
        DOM.editIcon.style.display = "inline-block";
        DOM.editIcon = cloneElement(DOM.editIcon);
        DOM.editIcon.addEventListener("click", function () {
            editAdmin(currentID);
        })
        DOM.fullName.value = adminsDic[currentID].name;
        DOM.fullName.disabled = true;
        DOM.email.value = adminsDic[currentID].email;
        DOM.email.disabled = true;
        DOM.phone.value = adminsDic[currentID].phone;
        DOM.phone.disabled = true;
        DOM.userName.value = adminsDic[currentID].userName;
        DOM.userName.disabled = true;
        DOM.password.value = adminsDic[currentID].password;
        DOM.password.disabled = true;
        DOM.role.value = adminsDic[currentID].roleID;
        DOM.role.disabled = true;
        if (adminsDic[currentID].image) {
            DOM.image.src = "uploads/" + adminsDic[currentID].image;
        }

    });

}

function editAdmin(currentID) {
    DOM.editIcon.style.display = "none"
    DOM.deleteIcon.style.display = "inline-block";
    DOM.imageForm.style.display = "inline-block";
    DOM.deleteIcon = cloneElement(DOM.deleteIcon);
    DOM.deleteIcon.addEventListener("click", function () {
        deleteAdmin(currentID);
    })
    DOM.fullName.disabled = false;
    DOM.email.disabled = false;
    DOM.phone.disabled = false;
    DOM.userName.disabled = false;
    DOM.password.disabled = false;
    DOM.role.disabled = false;
    DOM.submitBTN.innerText = "Save"
    DOM.submitBTN.style.display = "inline-block";
    DOM.submitBTN = cloneElement(DOM.submitBTN);
    DOM.submitBTN.addEventListener("click", function () {
        saveAdmin(event, currentID);
    })

}

function saveAdmin(event, currentID) {
    var filename = "";
    if (DOM.fileToUpload.value) {
        filename = randomString() + ".jpg";
        uploadImage(filename);
    }
    else if (currentID) {
        filename = adminsDic[currentID]["image"];
    }

    if (currentID) {
        editAdminService(currentID, DOM.fullName.value, DOM.email.value, DOM.phone.value, DOM.role.value, filename, adminsResCallback);
    }
    else {
        createAdminService(DOM.fullName.value, DOM.email.value, DOM.phone.value, DOM.userName.value, DOM.password.value, DOM.role.value, filename, adminsResCallback);
    }
    DOM.registration_form.innerHTML = "";
    DOM.deleteIcon.style.display = "none"
    mainC_headline.innerHTML = "";

}


function deleteAdmin(currentID) {
    deleteAdminService(currentID, adminsResCallback);
    DOM.registration_form.innerHTML = "";
    DOM.deleteIcon.style.display = "none"

}



