let allRecords = [];
let id = [];
function pasteStudents(){
    for(let i = 0 ; i < allRecords.length; ++i){
        if(!allRecords[i].group)
            continue;
        let tr = document.createElement('tr');
        tr.addEventListener('click',goToStudent);
        let td = document.createElement('td');
        td.textContent = i + 1;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = allRecords[i].surname + " " + allRecords[i].name + " " + allRecords[i].secondName;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = allRecords[i].course;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = allRecords[i].group;
        tr.appendChild(td);
        tr.id = allRecords[i].id;
        document.querySelector('tbody').appendChild(tr);
    }
}
function goToStudent(event){
    let target = event.target.parentNode;
    let desiredId = target.id - 1;
    let record = allRecords[desiredId];
    localStorage.setItem('currentStudent',JSON.stringify(record));
    window.location.href = '../edit/edit.html';
}
document.addEventListener('DOMContentLoaded', function(){
    if(localStorage.getItem('user') == null)
        this.location.assign('../login/index.html');
    let user = JSON.parse(localStorage.getItem('user'));
    if(user.group != null)
        this.location.assign('../main/main.html');
    document.querySelector('.userName p').textContent = user.surname + " " + user.name[0] + ". " + user.secondName[0] + ".";
    document.querySelector('.logout').addEventListener('click',logout);
    let openDB = indexedDB.open("registrationDB", 1);
    openDB.onupgradeneeded = function (event) {
        let db = event.target.result;
        if (!db.objectStoreNames.contains("users")) {
            db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
        }
    };
    openDB.onsuccess = function (event) {
        let db = event.target.result;
        let transaction = db.transaction("users", "readonly");
        let objectStore = transaction.objectStore("users");
        let getAllRequest = objectStore.openCursor();
        getAllRequest.onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {
                id.push(cursor.key);
                allRecords.push(cursor.value);
                cursor.continue();
            } else {
                transaction.oncomplete = function () {
                    db.close();
                    pasteStudents();
                };
            }
        };
        getAllRequest.onerror = function () {
            console.error("Ошибка при получении записей");
        };
    };


});
function logout(){
    localStorage.removeItem('user');
    window.location.href = "../login/index.html";
}   