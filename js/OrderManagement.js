import { getFoodListFromLocalStorage } from "./ApiFunction.js";


console.log('OrderManagement loaded');

let foodList = getFoodListFromLocalStorage();
console.log(foodList);

let renderMenu = () => {
    let content ='';

    foodList.forEach(food => {
        content += `       
        <div class="card d-flex align-items-center text-center">
        <img src="${food.image}" class="card-img-top" alt="Food image" />
        <div class="card-body">
            <h5 class="card-title">${food.name}</h5>
            <p class="card-text">${food.price}</p>
            <button class="btn btn-secondary">
                <i class="fa fa-shopping-basket"></i>
            </button>
        </div>
    </div>
        `
    })

    document.querySelector('.food-menu').innerHTML=content;
}


renderMenu();