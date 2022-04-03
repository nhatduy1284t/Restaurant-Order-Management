import { editOrder, getFoodListFromLocalStorage, getOrders, updateOrder } from './ApiFunction.js';

let btnSaveOrderEdit = document.querySelector('.btn-save-order-edit');

//Events listener
btnSaveOrderEdit.addEventListener('click', async () => {
  let orderEdit = JSON.parse(localStorage.getItem('orderEdit'));
  console.log(orderEdit);
  await editOrder(orderEdit);
  await getOrders();
  fillDataTableOrder();
});
//Function
window.handleEditOrder = (id) => {
  let orders = JSON.parse(localStorage.getItem('orders'));
  let orderEdit = orders.find((order) => String(order.id) === String(id));

  fillDataTableOrderEdit(orderEdit);

  localStorage.setItem('orderEdit', JSON.stringify(orderEdit));
};

window.handleMinusButton = (foodId) => {
  let orderEdit = JSON.parse(localStorage.getItem('orderEdit'));
  let foodListOrderEdit = JSON.parse(orderEdit.foodList);
  for (const food of foodListOrderEdit) {
    if (food.id == foodId) {
      if (food.quantity >= 2) {
        food.quantity--;
      }
    }
  }
  orderEdit.foodList = JSON.stringify(foodListOrderEdit);
  localStorage.setItem('orderEdit', JSON.stringify(orderEdit));
  fillDataTableOrderEdit(orderEdit);
};

window.handlePlusButton = (foodId) => {
  let orderEdit = JSON.parse(localStorage.getItem('orderEdit'));
  let foodListOrderEdit = JSON.parse(orderEdit.foodList);
  for (const food of foodListOrderEdit) {
    if (food.id == foodId) {
      food.quantity++;
    }
  }
  orderEdit.foodList = JSON.stringify(foodListOrderEdit);
  localStorage.setItem('orderEdit', JSON.stringify(orderEdit));
  fillDataTableOrderEdit(orderEdit);
};

window.handleBtnDeleteFoodOrder = (foodId) => {
  let orderEdit = JSON.parse(localStorage.getItem('orderEdit'));
  let foodListOrderEdit = JSON.parse(orderEdit.foodList);

  foodListOrderEdit = foodListOrderEdit.filter((food) => {
    return String(food.id) !== String(foodId);
  });
  console.log(foodListOrderEdit);
  orderEdit.foodList = JSON.stringify(foodListOrderEdit);
  localStorage.setItem('orderEdit', JSON.stringify(orderEdit));
  fillDataTableOrderEdit(orderEdit);
};

window.handleAddFoodOrderEdit = (foodId) => {
  console.log(foodId);
  let orderEdit = JSON.parse(localStorage.getItem('orderEdit'));
  let foodListOrderEdit = JSON.parse(orderEdit.foodList);
  let flag = false;
  for (const food of foodListOrderEdit) {
    if (String(food.id) === String(foodId)) {
      console.log('ahah');
      food.quantity++;
      flag = true;
    }
  }
  if (!flag) {
    //If not exists in foodListOrderEdit then push
    let food = getFoodListFromLocalStorage().find((food) => String(foodId) === String(food.id));
    let foodAdd = {
      id: food.id,
      name: food.name,
      single_price: food.price,
      quantity: 1,
    };
    foodListOrderEdit.push(foodAdd);
  }
  console.log(foodListOrderEdit);
  orderEdit.foodList = JSON.stringify(foodListOrderEdit);
  localStorage.setItem('orderEdit', JSON.stringify(orderEdit));
  fillDataTableOrderEdit(orderEdit);
};

window.handleCompleteOrder = async (orderId) => {
  let orders = JSON.parse(localStorage.getItem('orders'));
  let orderCompleted = orders.find(order => order.id ==orderId)
  orderCompleted.status="1";
  await updateOrder(orderCompleted);
  await getOrders();
  fillDataTableOrder();
  
};

let renderMenu = () => {
  let foodList = getFoodListFromLocalStorage();
  console.log(foodList);
  let content = '';

  foodList.forEach((food) => {
    content += `       
        <div class="card d-flex align-items-center text-center">
        <img src="${food.image}" class="card-img-top" alt="Food image" />
        <div class="card-body">
            <h5 class="card-title">${food.name}</h5>
            <p class="card-text">${food.price}</p>
            <button class="btn btn-secondary" onclick="handleAddFoodOrderEdit(${food.id})">
                <i class="fa fa-shopping-basket"></i>
            </button>
        </div>
    </div>
        `;
  });

  document.querySelector('.food-menu').innerHTML = content;
};

let fillDataTableOrderEdit = (order) => {
  let tbodyCart = document.querySelector('.table-cart tbody');
  let foodListOrderEdit = JSON.parse(order.foodList);

  let total = calculateTotalPrice(foodListOrderEdit);
  let content = '';
  for (let food of foodListOrderEdit) {
    content += `
        <tr>
            <td>${food.name}</td>
            <td>
                <div
                    class="btn-group product-count"
                    role="group"
                    aria-label="Basic example"
                >
                    <button type="button" class="btn btn-secondary minus" onclick="handleMinusButton(${food.id})">-</button>
                    <button type="button" class="btn btn-light counter">${food.quantity}</button>
                    <button type="button" class="btn btn-secondary plus mr-2" onclick="handlePlusButton(${food.id})">+</button>
                    <button type="button" class="btn btn-danger" onclick="handleBtnDeleteFoodOrder(${food.id})">
                        <i class="fa-solid fa fa-times"></i>
                    </button>
                </div>
            </td>
            <td>${food.single_price}</td>
            <td>${food.single_price * food.quantity}</td>
        </tr>
        `;
  }
  document.querySelector('.total-price').innerHTML = total;
  tbodyCart.innerHTML = content;
};

let fillDataTableOrder = () => {
  let tbodyOrder = document.querySelector('.data .table-order tbody');
  let orders = JSON.parse(localStorage.getItem('orders'));
  let content = '';
  orders = orders.filter((order) => order.status == '0');
  //Just render pending orders
  orders.forEach((order) => {
    let foodListOrder = JSON.parse(order.foodList);
    content += `
        <tr>
                                    <th scope="row">${order.id}</th>
                                    <td>${(() => {
                                      let timeCreated = order.createdAt;
                                      let date = new Date(timeCreated);
                                      console.log(date.getMonth())
                                      return `${date.getDate()}-${date.getMonth() + 1} | ${date.getHours()}:${date.getMinutes()}`;
                                    })()}</td>
                                    <td>${order.userName}</td>
                                    <td>${calculateTotalPrice(foodListOrder)}đ</td>
                                    <td>
                                        <button
                                            class="btn btn-warning"
                                            data-toggle="modal"
                                            data-target=".bd-example-modal-xl"
                                            onclick = "handleEditOrder(${order.id})"
                                        >
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        
                                        <button onclick="handleCompleteOrder(${order.id})" class="btn-check-order btn btn-success"  data-placement="bottom" 
                                        data-trigger="hover" data-toggle="popover" title="Complete this order" data-content="Order is in pending state, click to complete this order.">
                                            <i class="fa fa-check"></i>
                                        </button>
                                    </td>
                                
        `;
  });

  //Jquery popup
  tbodyOrder.innerHTML = content;
  $(function () {
    $('[data-toggle="popover"]').popover();
  });
};

let calculateTotalPrice = (foodListOrder) => {
  let total = 0;
  for (let food of foodListOrder) {
    total += food.single_price * food.quantity;
  }

  return total;
};

//Run here
(async () => {
  await getOrders();
  renderMenu();
  fillDataTableOrder();

  //Jquery for button complete order popover

})();
