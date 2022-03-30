import Order from "../model/Order.js";
import { createOrder } from "./ApiFunction.js";

console.log("Javascript loaded");

let navBtn = document.querySelector(".nav-btn");
let navbtnContainer = navBtn.parentElement;
let nav = document.querySelector("#nav");
let sideBar = document.querySelector(".sidebar");
let foodGroup = document.querySelector(".food-card-group");
let checkOutBtn = document.querySelector(".checkout");
let table = document.querySelector(".cart table tbody");

let foodList = [];
let orderFoodList = [];

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

checkOutBtn.addEventListener("click", () => {
    let orderDetail = [];
    
    orderFoodList.forEach(el => {
        let f_id = el.food_id;
        let food = {
            id: el.id,
            name: foodList[f_id].name,
            single_price: foodList[f_id].price,
            quantity: Number(el.quantity)
        }
        orderDetail.push(food);
    })


    /**/
    let order  = new Order;
    let user =JSON.parse(localStorage.getItem('user'));
    order.foodList = JSON.stringify(orderDetail);
    order.userId = String(user.id);
    order.userName = String(user.username);
    createOrder(order)
    /**/
    resetCart();
})

window.resetCart =() => {
    table.innerHTML = "";
    document.querySelector(".sub-total h5").textContent = 0;
    orderFoodList = [];
}

//Function
async function loadData() {
    let data = await fetch("https://testapi.io/api/nhatduy1284t/resource/restaurant")
                    .then(res => res.json())
                    .then(json => json.data);
    let output = "";
    let num = 0;

    data.forEach (el => {
        let foodCard = `<div class="card d-flex align-items-center text-center">
                            <img src="${el.image}" class="card-img-top" alt="Food image">
                            <div class="card-body" data-id=${num}>
                                <h5 class="card-title">${el.name}</h5>
                                <p class="card-text">${el.price}</p>
                                <button type="button" class="btn btn-secondary px-5 rounded-pill" onclick="addCart(${num},${el.id})"><i class="fa-solid fa-cart-shopping"></i></button>
                            </div>
                        </div>`;
        output += foodCard;

        let food = {
            name: el.name,
            price: Number(el.price),
            id:el.id
        }

        foodList.push(food);
        num++;
    })

    foodGroup.innerHTML = output;
}

window.addCart = (num,idOfFood)=> {
    
    console.log(`num: ${num}\tname: ${foodList[num].name}\tprice: ${foodList[num].price}`);
    // let table = document.querySelector(".card table tbody");
    // table.innerHTML +=
    console.log(checkFoodExistInCart(num), num);
    if (checkFoodExistInCart(num)) {
        // let foodEl = orderFoodList.find(el =>  {
        //     if (el.food_id == num)
        //         return true;
        // });
        let foodEl = orderFoodList.find(el => el.food_id == num);
        foodEl.quantity++;  
    }
    else {
        let price = foodList[num].price;
        let name = foodList[num].name;
        let orderFood = {
            food_id: num,
            quantity: 1,
            id:idOfFood
        }
    
        orderFoodList.push(orderFood);
    }

    console.log(orderFoodList);

    renderOrder();
}

//add event listner
//call renderOrder()

function renderOrder() {
    let output = "";
    let total = 0;
    orderFoodList.forEach(el => {
        let n = el.food_id;

        output +=  `<tr data-id=${n}>
                        <td>${foodList[n].name}</td>
                        <td><input class="food-quantity text-center" style="width:50px" type="text" value="${el.quantity}"  onkeypress="return isNumberKey(event)"></td>
                        <td>${el.quantity * foodList[n].price}</td>
                    </tr>`;

        total += Number(el.quantity) * foodList[n].price;
    })

    table.innerHTML = output;
    addEventForQuantityChange();
    document.querySelector(".sub-total h5").textContent = total;
}

function checkFoodExistInCart(foodId) {
    for (let i = 0; i < orderFoodList.length; i++) {
        if (orderFoodList[i].food_id == foodId)
            return true;
    }

    return false;
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function addEventForQuantityChange() {
    let quantities = document.querySelectorAll(".food-quantity");
    quantities.forEach(el => {
        console.log(el)
        el.addEventListener("focusout", (e) => {
            let id = e.target.closest("tr").getAttribute("data-id");
            console.log(e.target.value);

            let foodEl = orderFoodList.find(el => el.food_id == id)
            foodEl.quantity = e.target.value;
            renderOrder();
        })
    })
}