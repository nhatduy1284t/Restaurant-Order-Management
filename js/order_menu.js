console.log("Javascript loaded");

let navBtn = document.querySelector(".nav-btn");
let navbtnContainer = navBtn.parentElement;
let nav = document.querySelector("#nav");
let sideBar = document.querySelector(".sidebar")

navBtn.addEventListener('click', () => {
    console.log("nav hamburger clicked");
    //nav.classList.toggle("nav-on");
    sideBar.classList.toggle("nav-on");
    // mainWrapper.classList.toggle("wrapper-off");
    navBtn.classList.toggle("nav-btn-on");
    navbtnContainer.classList.toggle("nav-btn-container-on");

})