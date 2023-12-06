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
        if(i !=0){
            td.contentEditable='true';
            td.addEventListener('input',check);
        }
        else td.addEventListener('click',edit);
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