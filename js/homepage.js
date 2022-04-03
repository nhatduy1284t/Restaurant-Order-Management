import { createUser, getAccounts } from './ApiFunction.js';

console.log('homepage.js loaded');
//Global variables
let accounts = (await getAccounts()).data.data;

if (localStorage.getItem('user')) {
  document.querySelector('.btn-display-login').innerHTML = `Log out`;
}

let btnDisplayRegisterForm = document.querySelector('.btn-display-register-form');
let btnDisplayLogin = document.querySelector('.btn-display-login');
let registerFormWrapper = document.querySelector('.form-register-wrapper');
let loginFormWrapper = document.querySelector('.form-login-wrapper');
let btnGoBackLogin = document.querySelector('.btn-go-back-login');
let btnCloseForm = document.querySelector('.modal-login .close');
let formLogin = document.querySelector('.form-login');
let formRegister = document.querySelector('.form-register');
let inputConfirmPassword = document.querySelector('.form-register #confirmPassword');

let btnMenuLink = document.querySelector('.btn-menu-link');

btnDisplayRegisterForm.addEventListener('click', () => {
  registerFormWrapper.classList.remove('d-none');
  loginFormWrapper.classList.add('d-none');
});

btnGoBackLogin.addEventListener('click', () => {
  registerFormWrapper.classList.add('d-none');
  loginFormWrapper.classList.remove('d-none');
});

btnCloseForm.addEventListener('click', () => {
  registerFormWrapper.classList.add('d-none');
  loginFormWrapper.classList.remove('d-none');
});

formRegister.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('submited');
  let user = {};
  let arrInput = document.querySelectorAll('.form-register input');
  for (let input of arrInput) {
    user[input.name] = input.value;
  }
  user.type = '0';

  //Validate
  if (user.confirmPassword !== user.password) {
    return;
  }
 
  
  for (const account of accounts) {
      console.log(account)
      if(account.username == user.username) {
          alert('User name already existed !');
          return;
      }
  }

  accounts.push(user);
  await createUser(user);
});

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  let user = {};
  let arrInput = document.querySelectorAll('.form-login input');
  for (let input of arrInput) {
    user[input.name] = input.value;
  }


  for (let account of accounts) {
    console.log(`${account.username.toLowerCase()} ${user.username.toLowerCase()}`);
    if (account.username.toLowerCase() === user.username.toLowerCase()) {
      if (account.password === user.password) {
        localStorage.setItem('user', JSON.stringify(account));
        alert(`Hello ${account.username} !`);
        btnCloseForm.click();
        document.querySelector('.btn-display-login').innerHTML = `Log out`;
        return;
      }
    }
  }

  alert('Wrong user name or password!');
});

inputConfirmPassword.addEventListener('input', () => {
  let password = document.querySelector('.form-register #passwordRegister').value;
  let confirmPassword = inputConfirmPassword.value;
  if (confirmPassword !== password) {
    inputConfirmPassword.classList.add('is-invalid');
  } else {
    inputConfirmPassword.classList.remove('is-invalid');
  }
});

btnMenuLink.addEventListener('click', () => {
  if (!localStorage.getItem('user')) {
    alert('You have to login to access to this page.');
    return;
  }
  // let user = JSON.parse( localStorage.getItem('user'));
  window.location.href = './order_menu.html';
});

btnDisplayLogin.addEventListener('click', () => {
  //if already login
  if (localStorage.getItem('user')) {
    if (confirm('Do you want to log out?')) {
      localStorage.removeItem('user');
      document.querySelector('.btn-display-login').innerHTML = `Login`;
    }
    window.location.href = './homepage.html';
  }
});

