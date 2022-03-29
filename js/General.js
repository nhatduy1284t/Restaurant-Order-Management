console.log('General loaded');
let renderNavBar =() => {
    let user = localStorage.getItem('user');
    if(user.type==0) {
        return;
    }
    let navBarGeneral= document.querySelector('#nav ul');
    let content ='';
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
    `
    navBarGeneral.innerHTML+=content;
}

// renderNavBar();

let displayNavbar =()=> {
    let user = JSON.parse(localStorage.getItem('user'));

    if(user.type==0) {
        let navbar= document.querySelector('#nav ul');
        navbar.lastElementChild.remove();

    }

}

displayNavbar();

