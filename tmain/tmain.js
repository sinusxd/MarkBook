let allRecords = [];
function pasteStudents(){
    for(let i = 0 ; i < allRecords.length; ++i){
        let tr = document.createElement('tr');
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
        document.querySelector('tbody').appendChild(tr);
        console.log('i');
    }
}
document.addEventListener('DOMContentLoaded', function(){
    let user = JSON.parse(localStorage.getItem('user'));
        // Открываем или создаем базу данных
    let openDB = indexedDB.open("registrationDB", 1);

    // Обработчик события, вызываемый при обновлении базы данных
    openDB.onupgradeneeded = function (event) {
        let db = event.target.result;

        // Создаем объектное хранилище, если оно не существует
        if (!db.objectStoreNames.contains("users")) {
            db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
        }
    };

    // Обработчик события, вызываемый при успешном открытии базы данных
    openDB.onsuccess = function (event) {
        let db = event.target.result;

        // Начинаем транзакцию для чтения
        let transaction = db.transaction("users", "readonly");
        let objectStore = transaction.objectStore("users");

        // Открываем курсор для перебора всех записей
        let getAllRequest = objectStore.openCursor();

        // Обработчик события при успешном открытии курсора
        getAllRequest.onsuccess = function (event) {
            let cursor = event.target.result;

            // Если есть записи, добавляем их в массив
            if (cursor) {
                allRecords.push(cursor.value);
                cursor.continue();
            } else {
                // Курсор закончил перебор записей
                console.log("Все записи:", allRecords);

                // Завершаем транзакцию
                transaction.oncomplete = function () {
                    db.close();
                    pasteStudents();
                };
            }
        };

        // Обработчик события при ошибке открытия курсора
        getAllRequest.onerror = function () {
            console.error("Ошибка при получении записей");
        };
    };


});