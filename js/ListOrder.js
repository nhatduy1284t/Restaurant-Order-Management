console.log("Javascript loaded");

let navBtn = document.querySelector(".nav-btn");
let navbtnContainer = navBtn.parentElement;
let nav = document.querySelector("#nav");
let sideBar = document.querySelector(".sidebar");
let foodGroup = document.querySelector(".food-card-group");

let foodList = [];

//Startup
loadData();


//console.log(card);


// foodGroup.addEventListener("click", e => console.log(e.target))

//Event
navBtn.addEventListener('click', () => {
    console.log("nav hamburger clicked");
    //nav.classList.toggle("nav-on");
    sideBar.classList.toggle("nav-on");
    // mainWrapper.classList.toggle("wrapper-off");
    navBtn.classList.toggle("nav-btn-on");
    navbtnContainer.classList.toggle("nav-btn-container-on");
})

// foodGroup.addEventListener("mouseover", (e) => {
//     console.log(e.target);
//     // card.classList.toggle("animate__pulse");
// })

//Function
window.myfunction = () => {
    console.log('haha')
}
async function loadData() {
    let data = await fetch("https://testapi.io/api/nhatduy1284t/resource/restaurant")
                    .then(res => res.json())
                    .then(json => json.data);
    let output = "";
    let num = 0;

    data.forEach (el => {
        let foodCard = `<div class="card d-flex align-items-center text-center" onclick=myfunction() data-id=${num}>
                            <img src="${el.image}" class="card-img-top" alt="Food image">
                            <div class="card-body">
                                <h5 class="card-title">${el.name}</h5>
                                <p class="card-text">${el.price}</p>
                            </div>
                        </div>`;
        output += foodCard;

        let food = {
            id: num,
            name: el.name,
            price: parseInt(el.price)
        }
        foodList.push(food);

        num++;
    })

    foodGroup.innerHTML = output;
}


let card = document.querySelectorAll(".card");
console.log(card)
card.forEach(el => {
    el.addEventListener("click", el => {
        console.log(el);
    })
    //console.log(el.classList);
    
});