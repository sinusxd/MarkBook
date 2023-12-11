window.onbeforeunload = loadLessons;
window.addEventListener('resize', handleResize);

let currentStudent = JSON.parse(localStorage.getItem('currentStudent'));
let user = JSON.parse(localStorage.getItem('user'));
document.addEventListener('DOMContentLoaded',function(){   
    if(localStorage.getItem('user') == null)
        this.location.assign('../login/index.html');
    if(user.group != null)
        this.location.assign('../main/main.html');
    document.querySelector('.userName p').textContent = user.surname + " " + user.name[0] + ". " + user.secondName[0] + '.';
    document.querySelector('.infoName').textContent = currentStudent.surname + " " + currentStudent.name[0] + ". " + currentStudent.secondName[0] + '.';
    document.querySelector('.group').textContent = currentStudent.group;
    document.querySelector('.course').textContent = currentStudent.course;
    document.querySelector('.logout').addEventListener('click',logout);
    document.querySelector('.logo').addEventListener('click',function(){
        window.location.assign('../tmain/tmain.html');
    });
    loadLessons();
});
// Function to handle window resize
function handleResize() {
    let table = document.querySelectorAll('tr');
    if (window.innerWidth <= 576) {
        for(let i = 0 ; i < table.length; ++i){
            table[i].style.display = "flex";
            table[i].style.flexDirection = "column";
            if(i == 0)
                continue;
            for(let j = 0 ; j < table[i].childNodes.length; ++j){
                table[i].childNodes[j].style.height = "2rem";
            }
        }
    } else {
        for(let i = 0 ; i < table.length; ++i){
            table[i].style.display = "table-row";
            table[i].style.flexDirection = "none";
        }
    }
}
function loadLessons(){
    currentStudent = JSON.parse(localStorage.getItem('currentStudent'));
    currentStudent = goToStudent(currentStudent.id);
    currentStudent = JSON.parse(localStorage.getItem('currentStudent'));
    let lessons = currentStudent.lessons;
    if(!lessons)
        return;
    for(let i = 0 ; i < lessons.length; ++i){
        let tr = document.createElement('tr');
        let lesson = lessons[i];
        for(let j = 0 ; j < 6; ++j){
            let td = document.createElement('td');
            if(j == 5){
                let button = document.createElement('button');
                let div = document.createElement('div');
                button.textContent = "-";;
                button.addEventListener('click',remove);
                div.appendChild(button);
                div.style.display = "flex";
                div.style.flexDirection = "row";
                div.style.position = "absolute";
                div.style.right = "1%";
                div.style.bottom = "20%";
                button.classList.add('buttons');
                td.append(div);
                td.style.position="relative";
            }
            tr.appendChild(td);
        }
        document.querySelector('tbody').appendChild(tr);
        tr = tr.childNodes;
        tr[0].textContent = lesson.date;
        tr[1].textContent = lesson.name;
        tr[2].textContent = lesson.type;
        tr[3].textContent = lesson.duration;
        tr[4].textContent = lesson.time;
        tr[5].prepend(lesson.mark);
    }
    
}
function goToStudent(id){
    let openDB = indexedDB.open("registrationDB",1);
    openDB.onsuccess = function (event) {
        let db = event.target.result;
        let transaction = db.transaction("users", "readonly");
        let objectStore = transaction.objectStore("users");
        let desiredId = id
        let getRequest = objectStore.get(desiredId);
        getRequest.onsuccess = function(event){
            let record = getRequest.result;
            localStorage.setItem('currentStudent',JSON.stringify(record));
        }
        db.close;
    };
    
}
function createInput(index){
    let input = document.createElement('input');
    input.addEventListener('blur',confirm);
    input.style.outline = "none";
    input.style.border = "none";
    input.style.width = "100%";
    input.style.height = "100%";
    if(index == 0){
        input.type = "date";
    }
    
    return input
}
function createButtons(){
    let button1 = document.createElement('button');
    let button2 = document.createElement('button');
    let div = document.createElement('div');
    button1.textContent = "+";
    button2.textContent = "-";
    button1.addEventListener('click',addToDB);
    button2.addEventListener('click',remove);
    div.appendChild(button1);
    div.appendChild(button2);
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.position = "absolute";
    div.style.right = "1%";
    div.style.bottom = "20%";
    button1.classList.add('buttons');
    button2.classList.add('buttons');
    return div;
}
function logout(){
    console.log('logout');
    localStorage.removeItem('user');
    window.location.href = "../login/index.html";
}

function add(){
    let tr = document.createElement('tr');
    for(let i = 0 ; i < 6; ++i){
        let td = document.createElement('td');
        if(i == 0 ){
            td.addEventListener('click',edit);
        }
        if(i == 2){
            td.addEventListener('click',select);
        }
        if(i == 3){
            td.contentEditable = 'true';
            td.addEventListener('input',validateInput);
            td.addEventListener('blur',parseTime);
        }
        
        if(i == 1 || i == 4)
            td.contentEditable = 'true';

        if(i == 5){
            let button1 = document.createElement('button');
            let button2 = document.createElement('button');
            let div = document.createElement('div');
            button1.textContent = "+";
            button2.textContent = "-";
            button1.addEventListener('click',addToDB);
            button2.addEventListener('click',remove);
            div.appendChild(button1);
            div.appendChild(button2);
            div.style.display = "flex";
            div.style.flexDirection = "row";
            div.style.position = "absolute";
            div.style.right = "1%";
            div.style.bottom = "20%";
            button1.classList.add('buttons');
            button2.classList.add('buttons');
            td.append(div);
            td.style.position="relative";
            td.addEventListener('click',selectMark);
        }
        tr.appendChild(td);
    }
    document.querySelector('tbody').appendChild(tr);
    handleResize();
}

function edit(event){
    let target = event.target;
    let input = createInput(target.cellIndex);
    let textContent = target.textContent;
    if(target.cellIndex == 0)
        textContent = parseDate(textContent);
    input.value = textContent;  
    target.textContent = "";
    target.appendChild(input);
    input.focus();
}
function confirm(event){
    let input = event.target;
    let td = input.parentElement;
    let value = input.value;
    if(input.type == "date")
        if(value)
            value = formatDate(value);
    td.removeChild(input);
    td.textContent = value;
}
function formatDate(inputDate) {
    let parts = inputDate.split('-');
    let formattedDate = parts[2] + '.' + parts[1] + '.' + parts[0];
    return formattedDate;
}
function parseDate(inputDate) {
    let parts = inputDate.split('.');
    let parsedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
    return parsedDate;
}
function addToDB(event){    
    let target = event.target.parentNode.parentNode.parentNode.childNodes;
    let good = true;
    for(let i = 0 ; i < 6; ++i){
        if(!target[i].textContent || target[i].textContent == "+-"){
            good = false;
            target[i].classList.add('bad');
            setTimeout(()=>{target[i].classList.remove('bad');},1500);
        }
    }
    if(!good)
        return;
    target[5].querySelector('div').removeChild(target[5].querySelectorAll('button')[0]);
    for(let i = 0 ; i < 6; ++i){
        target[i].contentEditable = 'false';
        let newElement = target[i].cloneNode(true);
        target[i].parentNode.replaceChild(newElement, target[i]);
    }
    target[5].querySelector('div button').addEventListener('click',remove);
    let lesson = {
        date: target[0].textContent,
        name: target[1].textContent,
        type: target[2].textContent,
        duration: target[3].textContent,
        time: target[4].textContent,
        mark: target[5].textContent.split('-')[0]

    };
    let openDB = indexedDB.open("registrationDB",1);
    openDB.onsuccess = function(event){
        let db = event.target.result;
        let transaction = db.transaction("users","readwrite");
        let objectStore  = transaction.objectStore("users");
        let getRequest = objectStore.get(currentStudent.id);
        getRequest.onsuccess = function(event){
            let record = event.target.result;
            if(record.lessons == null)
                record.lessons = [];
            record.lessons.push(lesson);
            console.log(record);
            objectStore.put(record);
        };
    };
    
   
}
function remove(event){
    let target = event.target.parentNode.parentNode.parentNode.childNodes;
    let button2 = event.target;
    let td = button2.parentNode.parentNode; // Получаем ячейку с кнопками
    let tr = td.parentNode; // Получаем строку (родительскую ячейку)
    let tbody = document.querySelector('tbody');
    tbody.removeChild(tr);
    let openDB = indexedDB.open("registrationDB",1);
    let lesson = {
        date: target[0].textContent,
        name: target[1].textContent,
        type: target[2].textContent,
        duration: target[3].textContent.split(' ')[0],
        time: target[4].textContent,
        mark: target[5].textContent.split('+-')[0]

    };
    openDB.onsuccess = function(event){
        let db = event.target.result;
        let transaction = db.transaction("users","readwrite");
        let objectStore  = transaction.objectStore("users");
        let getRequest = objectStore.get(currentStudent.id);
        getRequest.onsuccess = function(event){
            let record = event.target.result;
            record.lessons.splice(record.lessons.indexOf(record),1);
            objectStore.put(record);
        };
    };
}


function select(event){
    let target = event.target;
    if(target.querySelector('select'))
        return;
    
    if(target.textContent == "Экзамен" || target.textContent == "Зачёт"){
        target.textContent = "";
    }
        
    let sel = document.createElement('select');
    let optionStart = document.createElement('option');
    optionStart.value = "Вид контроля";
    optionStart.textContent = "Вид контроля";
    let option1 = document.createElement('option');
    let option2 = document.createElement('option');
    option1.value = "Экзамен";
    option1.textContent = "Экзамен";
    option2.value = "Зачёт";
    option2.textContent = "Зачёт";
    sel.appendChild(optionStart);
    sel.appendChild(option1);
    sel.appendChild(option2);
    sel.style.border = "none";
    sel.style.outline = "none";
    target.appendChild(sel);
    sel.addEventListener('change',function(event){
        let target = event.target;
        let parent = target.parentNode;
        parent.textContent = target.value;
    });
}
function validateInput(event) {
    let nonNumberPattern = /\D/;
    let target = event.target;
    target.textContent = target.textContent.replace(nonNumberPattern,'');
}
function parseTime(event){
    let target = event.target;
    if(!target.textContent)
        return;
    let hours = parseInt(target.textContent,10);
    let lastDigit = hours % 10;
    let lastTwoDigits = hours % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        target.textContent = `${hours} часов`;
    } else if (lastDigit === 1) {
        target.textContent = `${hours} час`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        target.textContent = `${hours} часа`;
    } else {
        target.textContent = `${hours} часов`;
    }
}

function selectMark(event){
    let target = event.target;
    if(target.nodeName == "BUTTON")
        return;
    if (target.nodeName == "SELECT")
        target = target.parentNode;
    if(target.querySelector('select'))
        return;
    
    let exam = target.parentNode.querySelectorAll('td')[2];

    if(!exam.textContent || exam?.querySelector('select')?.value == "Вид контроля"){
        exam.classList.add('bad');
        setTimeout(()=>{exam.classList.remove('bad');},1500);
        return;
    }
    else{
        target.innerHTML = "";
    }
    if(exam.textContent == "Зачёт"){
        let sel = document.createElement('select');
        let optionStart = document.createElement('option');
        optionStart.value = "Оценка";
        optionStart.textContent = "Оценка";
        let option1 = document.createElement('option');
        let option2 = document.createElement('option');
        option1.value = "Зачёт";
        option1.textContent= "Зачёт";
        option2.value = "Незачёт";
        option2.textContent= "Незачёт";
        sel.appendChild(optionStart);
        sel.appendChild(option1);
        sel.appendChild(option2);
        sel.style.border = "none";
        sel.style.outline = "none";
        target.prepend(sel);
        sel.parentNode.style.justifyContent = "flex-start";
        sel.parentNode.style.gap = "5px";
        sel.addEventListener('change',function(event){
            let target = event.target;
            let parent = target.parentNode;
            parent.removeChild(target);
            let buttons = createButtons();
            parent.innerHTML = "";
            parent.textContent = target.value;
            parent.style.position = "relative";
            parent.appendChild(buttons);
            
        });
    }
    if(exam.textContent == "Экзамен"){
        let sel = document.createElement('select');
        let optionStart = document.createElement('option');
        optionStart.value = "Оценка";
        optionStart.textContent = "Оценка";
        let option1 = document.createElement('option');
        let option2 = document.createElement('option');
        let option3 = document.createElement('option');
        let option4 = document.createElement('option');
        option1.value = "Отлично";
        option1.textContent= "Отлично";
        option2.value = "Хорошо";
        option2.textContent= "Хорошо";
        option3.value = "Удовлетворительно";
        option3.textContent= "Удовлетворительно";
        option4.value = "Неудовлетворительно";
        option4.textContent= "Неудовлетворительно";
        sel.appendChild(optionStart);
        sel.appendChild(option1);
        sel.appendChild(option2);
        sel.appendChild(option3);
        sel.appendChild(option4);
        sel.style.border = "none";
        sel.style.outline = "none";
        target.prepend(sel);
        sel.parentNode.style.justifyContent = "flex-start";
        sel.parentNode.style.gap = "5px";
        sel.addEventListener('change',function(event){
            let target = event.target;
            let parent = target.parentNode;
            parent.removeChild(target);
            let buttons = createButtons();
            parent.innerHTML = "";
            parent.style.position = "relative";
            parent.textContent = target.value;
            parent.appendChild(buttons);
        });
    }
}