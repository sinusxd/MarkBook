let clicked = 0;
function createCourse(){
    let input = document.createElement('input');
    input.placeholder = "Курс";
    input.id = "course";
    input.type = "number";
    input.required = true;
    return input;
}

function createGroup(){
    let input = document.createElement('input');
    input.placeholder = "Номер группы XXXX-XX-XX";
    input.id = "group";
    input.type = "text";
    input.pattern="^[А-Я]{4}-\\d{2}-\\d{2}$";
    input.required = true;
    input.style.transition = "background-color 0.5s";
    return input;
}
let course = createCourse();
let group = createGroup();
group.addEventListener('input', function (event) {
    let inputValue = event.target.value;
    let regex = /^[А-Я]{4}-\d{2}-\d{2}$/;
    if(regex.test(inputValue)){
        event.target.style.backgroundColor = "#98FB98";
    }
    else{
        if(inputValue == "")
            event.target.style.backgroundColor = "white";
        else
            event.target.style.backgroundColor = "#F08080";
    }

});
document.addEventListener('DOMContentLoaded', function () {
    let teacher = document.querySelector('.teacher');
    let student = document.querySelector('.student');

    teacher.addEventListener('click', function () {
        let form = document.getElementById('login_form');
        if (!clicked) {
            if(form.contains(course))
                form.removeChild(course);
            if(form.contains(group))
                form.removeChild(group);
            teacher.style.backgroundColor = "rgb(29,78,216)";
            student.style.backgroundColor = "rgb(37,99,235)";
            clicked = 1;
        } else {
            teacher.style.backgroundColor = "rgb(37,99,235)";
            clicked = 0;
        }
    });

    student.addEventListener('click', function () {
        let form = document.getElementById('login_form');
        if (clicked) {
            student.style.backgroundColor = "rgb(29,78,216)";
            teacher.style.backgroundColor = "rgb(37,99,235)";
            clicked = 0;
            form.insertBefore(course, document.getElementById("email"));
            form.insertBefore(group, document.getElementById("email"));
        } 
        else {
            if(form.contains(course))
                form.removeChild(course);
            if(form.contains(group))
                form.removeChild(group);
            student.style.backgroundColor = "rgb(37,99,235)";
            clicked = 1;
        }
    });
});

// Open or create the IndexedDB database
const openDB = indexedDB.open("registrationDB", 1);
openDB.onupgradeneeded = function (event) {
    const db = event.target.result;
    console.log('upgrade');
    try {
        // Create an object store named "users" only if it doesn't exist
        if (!db.objectStoreNames.contains("users")) {
            const objectStore = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });

            // Define the properties of the object store
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("surname", "surname", { unique: false });
            objectStore.createIndex("secondName", "secondName", { unique: false });
            objectStore.createIndex("course", "course", { unique: false });
            objectStore.createIndex("group", "group", { unique: false });
            objectStore.createIndex("email", "email", { unique: true });
            objectStore.createIndex("password", "password", { unique: false });
            objectStore.createIndex("role", "role", { unique: false });
            objectStore.createIndex("lessons", "lessons", { unique: false });
        }
    } catch (error) {
        console.error("Error creating object store:", error);
    }
};
// Set the onsuccess event handler before opening the database
openDB.onsuccess = function (event) {
    console.log('success');
    const db = event.target.result;

    // Perform registration when the form is submitted
    function start() {
        console.log('start');
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const secondName = document.getElementById("secondName").value;
        const course = document.getElementById("course")?.value;
        const group = document.getElementById("group")?.value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("repeatPassword").value;
        let role;

        if (clicked) {
            role = "Teacher";
        } else {
            role = "Student";
        }

        // Check if passwords match
        if (password !== repeatPassword) {
            alert("Passwords do not match");
            return;
        }

        // Start a transaction and get the object store
        const transaction = db.transaction(["users"], "readwrite");
        const objectStore = transaction.objectStore("users");

        // Add a new user to the object store
        const newUser = {
            name: name,
            surname: surname,
            secondName: secondName,
            course: course,
            group: group,
            email: email,
            password: password,
            role: role,
            lessons:null,
        };
        console.log(newUser);

        const addUserRequest = objectStore.add(newUser);

        // Handle the success or error of the transaction
        addUserRequest.onsuccess = function () {
            console.log("Registration successful!");
            window.location.href = "../login/index.html";
        };

        addUserRequest.onerror = function () {
            alert("Error in registration. Please try again.");
        };

        // Close the transaction
        transaction.oncomplete = function () {
            db.close();
        };
    }
    
    // Assuming you have a form with an id "login_form"
    const loginForm = document.getElementById("login_form");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        start();
    });
};
