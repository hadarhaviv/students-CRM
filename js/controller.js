var studentsArray;
var studentsDic;
var coursesDic;
var adminsDic;

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

function addStudent() {
    mainC_headline.innerHTML = "New Student"
    if (DOM.registration_form.style.display === 'none') {
        DOM.registration_form.style.display = 'flex';
    }
}

function createStudent() {
    createStudentService(DOM.fullName.value, DOM.email.value, DOM.phone.value, studentResCallback)
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
    card.style.display = "inline-block";
    card.querySelector("#card-name").innerHTML = entity.name;
    if (type == "student") {
        card.querySelector("#cardP").innerHTML = entity.phone;
        card.querySelector(".card-image").src = "images/student_icon.png"

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


// function deleteProduct() {
//     var currentProductID = event.target.parentElement.parentElement.id;
//     deleteProductService(currentProductID, function (res) {
//         drawProducts();
//     });
// }



