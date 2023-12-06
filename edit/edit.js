document.addEventListener('DOMContentLoaded',function(){
    let user = JSON.parse(localStorage.getItem('user'));
    document.querySelector('.userName p').textContent = user.surname + " " + user.name[0] + ". " + user.secondName[0] + '.';
    document.querySelector('.infoName').textContent = user.surname + " " + user.name[0] + ". " + user.secondName[0] + '.';
    document.querySelector('.group').textContent = user.group;
    document.querySelector('.course').textContent = user.course;
    document.querySelector('.logout').addEventListener('click',logout);
    let tds = document.querySelectorAll('td');
    for(let i = 0 ; i < tds.length; ++i){
        tds[i].addEventListener('click',edit);
    }
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
        td.contentEditable='true';
        tr.appendChild(td);
    }
    document.querySelector('tbody').appendChild(tr);
}

function edit(event){
    let target = event.target;
    let input = createInput(target.cellIndex);
    let textContent = target.textContent;
    input.value = textContent;  
    target.textContent = "";
    target.appendChild(input);
    input.focus();
}
function confirm(event){
    let input = event.target;
    let td = input.parentElement;
    let value = input.value;
    td.textContent = value;
}
function formatDate(inputDate) {
    const parts = inputDate.split('-');
    const formattedDate = parts[1] + '.' + parts[2] + '.' + parts[0];
    return formattedDate;
}