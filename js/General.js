console.log("General loaded");

//Every website has this general component
document.querySelector('head title').innerHTML="ITEC Restaurant";
document.querySelector('head').innerHTML+=`<link rel="shortcut icon" href="../images/logo.png" />`;


let navBtn = document.querySelector(".nav-btn");
let navbtnContainer = navBtn.parentElement;
let nav = document.querySelector("#nav");
let sideBar = document.querySelector(".sidebar");

let renderNavBar = () => {
    let user = localStorage.getItem("user");
    if (user.type == 0) {
        return;
    }
    let navBarGeneral = document.querySelector("#nav ul");
    let content = "";
    content = `
    <li class="nav-item">
         <a class="nav-link" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
        Management
         </a>
        <div class="collapse" id="collapseExample">
            <div class="card card-body">
                <a class="nav-link" href="./FoodManagement.html">Foods</a>
                <a class="nav-link" href="./OrderManagement.html">Orders</a>
            </div>
        </div>
    </li>
    `;
    navBarGeneral.innerHTML += content;
};

// renderNavBar();

let displayNavbar = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user.type == 0) {
        let navbar = document.querySelector("#nav ul");
        navbar.lastElementChild.remove();
    }
};

displayNavbar();


navBtn.addEventListener('click', () => {
    console.log("nav hamburger clicked");
    //nav.classList.toggle("nav-on");
    sideBar.classList.toggle("nav-on");
    // mainWrapper.classList.toggle("wrapper-off");
    navBtn.classList.toggle("nav-btn-on");
    navbtnContainer.classList.toggle("nav-btn-container-on");
})



