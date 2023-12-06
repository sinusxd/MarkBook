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
// Function to perform login when the form is submitted
function login() {
    console.log('login');
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Open the IndexedDB database
    const openDB = indexedDB.open("registrationDB", 1);

    // Set the onsuccess event handler before opening the database
    openDB.onsuccess = function (event) {
        console.log('success');
        const db = event.target.result;

        // Start a transaction and get the object store
        const transaction = db.transaction(["users"], "readonly");
        const objectStore = transaction.objectStore("users");

        // Create a request to get the user by email
        const getUserRequest = objectStore.index("email").get(email);

        // Handle the success or error of the request
        getUserRequest.onsuccess = function () {
            const user = getUserRequest.result;

            if (user) {
                // User found, check the password
                if (user.password === password) {
                    // Passwords match, login successful
                    console.log("Login successful!");
                    // Redirect to another page or perform other actions
                    localStorage.setItem('user',user);
                } else {
                    alert("Incorrect password. Please try again.");
                }
            } else {
                alert("User not found. Please check your email.");
            }
        };

        getUserRequest.onerror = function () {
            alert("Error in login. Please try again.");
        };

        // Close the transaction
        transaction.oncomplete = function () {
            db.close();
        };
    };
}

function goToMain(user){
    
}
