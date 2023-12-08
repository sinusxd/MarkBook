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
            button1.onclick = "addToDB";
            button2.addEventListener('click',remove);
            div.appendChild(button1);
            div.appendChild(button2);
            div.style.display = "flex";
            div.style.flexDirection = "row";
            button1.classList.add('buttons');
            button2.classList.add('buttons');
            td.append(div);
            td.style.display = "flex";
            td.style.flexDirection = "row";
            td.style.justifyContent = "flex-end";
            td.addEventListener('click',selectMark);
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
function addToDB(){

}
function remove(event){
    let button2 = event.target;
    let td = button2.parentNode.parentNode; // Получаем ячейку с кнопками
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
            parent.textContent = target.value;
            parent.appendChild(buttons);
        });
    }
}