window.addEventListener('resize', handleResize);
function pasteLessons(){
    let user = JSON.parse(localStorage.getItem('user'));
    let lessons = user.lessons;
    for(let i = 0 ; i < lessons.length; ++i){
        let lesson = lessons[i];
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = lesson.date;
        tr.append(td);
        td = document.createElement('td');
        td.textContent = lesson.name;
        tr.append(td);
        td = document.createElement('td');
        td.textContent = lesson.type;
        tr.append(td);
        td = document.createElement('td');
        td.textContent = lesson.duration;
        tr.append(td);
        td = document.createElement('td');
        td.textContent = lesson.time;
        tr.append(td);
        td = document.createElement('td');
        td.textContent = lesson.mark;
        tr.append(td);
        document.querySelector('tbody').append(tr);
    }
    handleResize();
}

document.addEventListener('DOMContentLoaded',function(){
    if(localStorage.getItem('user') == null)
        window.location.href = "../login/index.html";
    let user = JSON.parse(localStorage.getItem('user'));
    if(user.group == null)
        this.location.assign('../tmain/tmain.html');
    document.querySelector('.userName p').textContent = user.surname + " " + user.name[0] + ". " + user.secondName[0] + '.';
    document.querySelector('.info p').textContent = user.surname + " " + user.name[0] + ". " + user.secondName[0] + '.';
    document.querySelector('.group').textContent = user.group;
    document.querySelector('.course').textContent = user.course;
    document.querySelector('.logout').addEventListener('click',logout);
    pasteLessons();
        
});
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

function logout(){
    localStorage.removeItem('user');
    window.location.href = "../login/index.html";
}   