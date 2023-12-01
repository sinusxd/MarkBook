document.addEventListener('DOMContentLoaded', function() {
    let email = document.getElementById('email');
    let password = document.getElementById("password");

    email.addEventListener('focus', function(event) {
        password.style.borderTop = "none";
        email.style.borderBottom = "1px solid rgb(172, 172, 172)";
        email.style.borderColor = "blue";
    });
    email.addEventListener('blur', function(event) {
        email.style.borderColor = "rgb(172, 172, 172)";
        email.style.borderBottom = "none";
        password.style.borderTop = "1px solid rgb(172, 172, 172)";
    });
    password.addEventListener('focus', function(event) {
        password.style.borderColor = "blue";
    });
    password.addEventListener('blur', function(event) {
        password.style.borderColor = "rgb(172, 172, 172)";
    });
});
