import { createUser, getAccounts } from "./ApiFunction.js";

console.log("homepage.js loaded");

if(localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.getItem('user'));
    document.querySelector(".btn-display-login").innerHTML = `Hello ${user.username}!`;
}

let btnDisplayRegisterForm = document.querySelector(".btn-display-register-form");
let registerFormWrapper = document.querySelector(".form-register-wrapper");
let loginFormWrapper = document.querySelector(".form-login-wrapper");
let btnGoBackLogin = document.querySelector(".btn-go-back-login");
let btnCloseForm = document.querySelector(".modal-login .close");

let formLogin = document.querySelector(".form-login");
let formRegister = document.querySelector(".form-register");

let inputConfirmPassword = document.querySelector(".form-register #confirmPassword");

btnDisplayRegisterForm.addEventListener("click", () => {
    registerFormWrapper.classList.remove("d-none");
    loginFormWrapper.classList.add("d-none");
});

btnGoBackLogin.addEventListener("click", () => {
    registerFormWrapper.classList.add("d-none");
    loginFormWrapper.classList.remove("d-none");
});

btnCloseForm.addEventListener("click", () => {
    registerFormWrapper.classList.add("d-none");
    loginFormWrapper.classList.remove("d-none");
});

formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    let user = {};
    let arrInput = document.querySelectorAll(".form-register input");
    for (let input of arrInput) {
        user[input.name] = input.value;
    }
    user.type = "0";

    if (user.confirmPassword !== user.password) {
        return;
    }
    console.log(user);
    await createUser(user);
});

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    let user = {};
    let arrInput = document.querySelectorAll(".form-login input");
    for (let input of arrInput) {
        user[input.name] = input.value;
    }

    let res = await getAccounts();
    let accounts = res.data.data;

    for (let account of accounts) {
        console.log(`${account.username.toLowerCase()} ${user.username.toLowerCase()}`);
        if (account.username.toLowerCase() === user.username.toLowerCase()) {
            if (account.password === user.password) {
                localStorage.setItem("user", JSON.stringify(account));
                alert(`Chào ngài ${account.username} !`);
                btnCloseForm.click();
                document.querySelector(".btn-display-login").innerHTML = `Hello ${account.username}!`;
                return;
            }
        }
    }

    alert("Wrong user name or password!");
});

inputConfirmPassword.addEventListener("input", () => {
    let password = document.querySelector(".form-register #passwordRegister").value;
    let confirmPassword = inputConfirmPassword.value;
    if (confirmPassword !== password) {
        inputConfirmPassword.classList.add("is-invalid");
    } else {
        inputConfirmPassword.classList.remove("is-invalid");
    }
});
