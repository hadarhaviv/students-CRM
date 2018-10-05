var studentsArray;
var studentsDic;
var coursesDic;
var adminsDic;

function getStudents() {
    getStudentsService(function (res) {
        studentsDic = res;
        for (var id in studentsDic) {
            var studentsContainer = document.getElementById("studentsContainer")
            studentsContainer.appendChild(displayCard(studentsDic[id], "student"));
        }

    })

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


// function addProduct() {
//     var pName = getElementById("pName");
//     var pCategory = getElementById("pCategory");
//     var pPrice = getElementById("pPrice");
//     var pAmount = getElementById("pAmount");
//     var pPic = getElementById("pPic");
//     addProductService(pName.value, pCategory.value, pPrice.value, pAmount.value, pPic.value, function (res) {
//         drawProducts();
//     });
// }

