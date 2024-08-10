export let cart;
loadFromStorage();


export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId,quantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    if(quantity===undefined){
      matchingItem.quantity += 1;
    }
    else{
      matchingItem.quantity= +quantity;
    }
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function totalCartQuantity(){
  let cartQuantity=0;
  cart.forEach((cartItem) => {
    cartQuantity=cartQuantity+cartItem.quantity;
  });
  return cartQuantity;
}

export function Cart_Total(){
  document.querySelector(".js-cart-quantity").innerHTML=totalCartQuantity();
}


export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
};




export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load',() => {
    console.log(xhr.response);
    fun();
  });
  
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
};

export function resetCart() {
  cart = [];
  saveToStorage();
}

export function updateButton(productId,index){
  document.getElementsByClassName('js-update-link')[index].classList.add('display-none');
  document.getElementsByClassName('js-updated')[index].classList.remove('display-none');
  document.getElementsByClassName('quantity-label')[index].classList.add('display-none');

  document.getElementsByClassName('js-save-link')[index].classList.remove('display-none');

}
export function saveButton(productId,index){
  const val=document.getElementsByClassName('js-updated')[index].firstElementChild.value;
  document.getElementsByClassName('quantity-label')[index].classList.remove('display-none');
  console.log(val);
  document.getElementsByClassName('quantity-label')[index].innerHTML=val;

  document.getElementsByClassName('js-update-link')[index].classList.remove('display-none');
  document.getElementsByClassName('js-updated')[index].classList.add('display-none');
  document.getElementsByClassName('js-save-link')[index].classList.add('display-none');

  

  return val;

}
