var userDetails = {};
window.onload = function () {
    init();
}

function init() {
    checkLogin(function (res) {
        if (!res) {
            window.location.href = "Login.html";
        }
        else {
            router.home();
            userDetails.role = res["currentUser"]["role"];
            userDetails.id = res["currentUser"]["id"];
            userDetails.user_name = res["currentUser"]["user_name"];
            DOM.userNav.innerHTML = "Hi, " + userDetails.user_name;

            //if sales man
            if (userDetails.role == 3) {
                DOM.adminTab.style.display = "none";
            }

        }

    })
}

