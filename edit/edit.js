document.addEventListener('DOMContentLoaded',function(){
    let user = JSON.parse(localStorage.getItem('user'));
    document.querySelector('.userName p').textContent = user.surname + " " + user.name[0] + ". " + user.secondName[0] + '.';
    document.querySelector('.infoName').textContent = user.surname + " " + user.name[0] + ". " + user.secondName[0] + '.';
    document.querySelector('.group').textContent = user.group;
    document.querySelector('.course').textContent = user.course;
    document.querySelector('.logout').addEventListener('click',logout);
});

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
            td.addEventListener('input',parseTime);
        }
        
        if(i == 1 || i == 4)
            td.contentEditable = 'true';

        if(i == 5){
            let button1 = document.createElement('button');
            let button2 = document.createElement('button');
            button1.textContent = "+";
            button2.textContent = "-";
            button1.onclick = "addToDB";
            button2.addEventListener('click',remove);
            td.appendChild(button1);
            td.appendChild(button2);
        }
        tr.appendChild(td);
    }
    document.querySelector('tbody').appendChild(tr);
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
function check(event){
    let target = event.target;
    if(target.cellIndex == 5){
        let sanitizedValue = target.textContent.replace(/[^2-5]/g, '');
        sanitizedValue = sanitizedValue.slice(0, 1);
        event.target.textContent = sanitizedValue;
        if(event.target.textContent == 5)
            event.target.textContent += " (Отлично)"
        if(event.target.textContent == 4)
            event.target.textContent += " (Хорошо)"
        if(event.target.textContent == 3)
            event.target.textContent += " (Удовлетворительно)"
        if(event.target.textContent == 2)
            event.target.textContent += " (Неудовлетворительно)"

    }
}
function addToDB(){

}
function remove(event){
    let button2 = event.target;
    let td = button2.parentNode; // Получаем ячейку с кнопками
    let tr = td.parentNode; // Получаем строку (родительскую ячейку)
    let tbody = document.querySelector('tbody');
    tbody.removeChild(tr);
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
function parseTime(event){
    console.log('change');
    let number = event.target.textContent;
    function formatHours(number) {
        if (!/^-?\d*\.?\d+$/.test(number)) {
            return "Неверный формат числа";
        }
    
        let hours = parseFloat(number);
    
        if (isNaN(hours)) {
            return "Не является числом";
        }
    
        let hoursText = hours === 1 ? "час" : "часов";
        return `${hours} ${hoursText}`;
    }
    number = formatHours(number);
    event.target.textContent = number;
}