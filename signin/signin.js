function start(){
    var request = indexedDB.open("myDatabase", 1);

    // Обработчик события успешного открытия или создания базы данных
    request.onsuccess = function(event) {
    var db = event.target.result;
    console.log("База данных открыта успешно");

    // Здесь вы можете выполнять операции с базой данных
    // Например, добавление данных
    var transaction = db.transaction(["myObjectStore"], "readwrite");
    var objectStore = transaction.objectStore("myObjectStore");
    var data = { id: 1, name: "John Doe", age: 30 };
    var request = objectStore.add(data);

    request.onsuccess = function(event) {
        console.log("Данные успешно добавлены в базу данных");
    };

    // Закрываем транзакцию после завершения операции
    transaction.oncomplete = function(event) {
        console.log("Транзакция завершена");
    };
    };

    // Обработчик события обновления базы данных
    request.onupgradeneeded = function(event) {
    var db = event.target.result;

    // Создаем объектное хранилище (Object Store) для хранения данных
    var objectStore = db.createObjectStore("myObjectStore", { keyPath: "id" });

    // Можем добавить индексы для улучшения производительности запросов
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("age", "age", { unique: false });

    console.log("База данных обновлена успешно");
    };

    // Обработчик события ошибки открытия или создания базы данных
    request.onerror = function(event) {
    console.error("Ошибка открытия базы данных: " + event.target.errorCode);
    };
}
