import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { Cart_Total } from '../data/cart.js';
//import '../data/cart-class.js'

async function loadPage(){
  try{
    // 'throw error1';
    await loadProductsFetch();

  await new Promise((resolve,reject) => {
    // throw error2;
    loadProducts(() => {
      // reject ('error3');
      resolve('value3');
    })
  })
  } 
  catch(error){
    console.log('Unexpected error. Please try again later.');
  }



  renderOrderSummary();
  renderPaymentSummary();
};
loadPage();
Cart_Total();



