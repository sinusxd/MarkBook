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
});


function logout(){
    localStorage.removeItem('user');
    window.location.href = "../login/index.html";
}