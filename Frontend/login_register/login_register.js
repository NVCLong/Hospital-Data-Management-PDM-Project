let registerBtn = document.getElementById('registerBtn');
let loginBtn = document.getElementById('loginBtn');
let usernameField = document.getElementById('usernameField');
let title = document.getElementById('title');

loginBtn.onclick = function() {
    usernameField.style.maxHeight = '0';
    title.innerHTML = 'LOGIN';
    registerBtn.classList.add('disable');
    loginBtn.classList.remove('disable');
}

registerBtn.onclick = function() {
    usernameField.style.maxHeight = '60px';
    title.innerHTML = 'REGISTER';
    registerBtn.classList.remove('disable');
    loginBtn.classList.add('disable');
}
