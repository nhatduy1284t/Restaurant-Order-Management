import { getOrders } from "./ApiFunction.js";

console.log("Profile loaded");
let user;
if(localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'));
}

let userId= document.querySelector('.user-id');
let userName= document.querySelector('.user-name');
let userRole= document.querySelector('.user-role');
let tbodyMyOrders = document.querySelector('.table-my-orders tbody')

let renderProfile = () => {
    userId.innerHTML=user.id;
    userName.innerHTML=user.username;
    if(user.type ==0) {
        userRole.innerHTML='Customer';
    }
    else {
        userRole.innerHTML='Admin';
    }
}

let calculateTotalPriceOfOrder =(foodList) => {
    let sum =0;
    for (const food of foodList) {
        sum+= food.single_price * food.quantity;
    }
    return sum;
}

let renderMyOrders = async () => {
    let content='';
    let arrOrders = (await getOrders()).data.data;
    let arrMyOrders = arrOrders.filter(order => order.userId== user.id);
    for (const order of arrMyOrders) {
        let foodListOrder = JSON.parse(order.foodList);
        let total = calculateTotalPriceOfOrder(foodListOrder);
        let dateOrder = new Date(order.createdAt);
        content +=
        `
        <tr>
            <td scope="row">${order.id}</td>
            <td>${total}</td>
            <td>${dateOrder.getDate()}-${dateOrder.getMonth() +1} | ${dateOrder.getHours()}:${dateOrder.getMinutes()}</td>
        </tr>
        `
        
    }

    tbodyMyOrders.innerHTML=content;
}


(async () => {
    renderProfile();
    renderMyOrders();
})();
