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

    document.querySelector('.reg').onclick = function (){
        location.assign('../signin/signin.html');
    }
});

function login() {
    console.log('login');
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const openDB = indexedDB.open("registrationDB", 1);
    openDB.onsuccess = function (event) {
        console.log('success');
        const db = event.target.result;
        const transaction = db.transaction(["users"], "readonly");
        const objectStore = transaction.objectStore("users");
        const getUserRequest = objectStore.index("email").get(email);
        getUserRequest.onsuccess = function () {
            const user = getUserRequest.result;
            if (user) {
                if (user.password === password) {
                    console.log("Login successful!");
                    localStorage.setItem('user',JSON.stringify(user));
                    if(user.group == null)
                        window.location.hre = "../tmain/tmain.html"
                    window.location.href = "../main/main.html";
                } else {
                    alert("Неверный пароль. Попробуйте снова.");
                }
            } else {
                alert("Пользователь не найден. Проверьте вашу почту.");
            }
        };
        getUserRequest.onerror = function () {
            alert("Ошибка при входе. Попробуйте снова.");
        };
        transaction.oncomplete = function () {
            db.close();
        };
    };
}

