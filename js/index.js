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
        }
    })
}

