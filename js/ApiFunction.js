import { ACCOUNTS, ORDERS, RESTAURANT, URL } from "./Settings.js";

export async function updateFoodListLocalStorageFromDatabase(token = "") {
    //Function to fill up localstorage with data from database
    let result = await fetch(`${URL}/${RESTAURANT}`, {
        headers: { Authorization: `${token}` },
    })
        .then((res) => res.json())
        .catch((err) => {
            console.log("Wrong token");
        });
    console.log('updated',result)
    await localStorage.setItem("foodList", JSON.stringify(result.data));
}

export function getFoodListFromLocalStorage() {
    if (localStorage.getItem("foodList")) {
        return JSON.parse(localStorage.getItem("foodList"));
    }
}

export async function deleteFood(foodId) {
    try {
        const res = await axios.delete(`${URL}/${RESTAURANT}/${foodId}`);
        console.log(res);
      } catch (error) {
        console.log('Error: ' + error);
      }
}

export async function postFood(food) {
    try {
        const res = await axios.post(`${URL}/${RESTAURANT}`,food);
        console.log(res);
        alert('Add food successfully');
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export async function updateFood(food) {
    try {
        const res = await axios.put(`${URL}/${RESTAURANT}/${food.id}`,food);
        console.log(res);
        alert('Edit food successfully');
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export async function createUser(user) {
    try {
        const res = await axios.post(`${URL}/${ACCOUNTS}`,user);
        console.log(res);
        alert('Your account is created successfully!');
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export async function getAccounts() {
    try {
        const res = await axios.get(`${URL}/${ACCOUNTS}`);
        return res;
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export async function createOrder(order) {
    try {
        const res = await axios.post(`${URL}/${ORDERS}`,order);
        console.log(res);
        alert('Your order is created successfully!');
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export async function getOrders() {
    try {
        const res = await axios.get(`${URL}/${ORDERS}`);
        localStorage.setItem('orders',JSON.stringify( res.data.data));
        console.log(res)
        return res;
    } catch (error) {
        console.log('Error: ' + error);
    }
} 

export async function editOrder(order) {
    try {
        const res = await axios.put(`${URL}/${ORDERS}/${order.id}`,order);
        console.log(res);
        alert('Edit order successfully!');
    } catch (error) {
        console.log('Error: ' + error.response);
    }
}