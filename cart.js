 export let cart;
   loadFromStorage();
//this one is to check wether it is working or not in github
export function loadFromStorage()
 {
    cart=JSON.parse(localStorage.getItem('cart'))
if(!cart){
   cart=[
    {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:3,
        deliveryOptionId:'1'
    },
    {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionId:'1'
    },
    {
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity:1,
        deliveryOptionId:'1'
    }
];
 }

 }
export function calculateCartQuantity()
{  var total=0;
    cart.forEach((item) => {
        total+=item.quantity

    })
    return total;
}
export function removeCart(productId) {
    let newCart = cart.filter((item) => item.id !== productId);
     cart=newCart;
     saveToStorage();
}
  export function saveToStorage()
{
    localStorage.setItem('cart',JSON.stringify(cart));
}


 export function addToCart(productId)
{
    let matchingProduct;
   let num=document.querySelector(`.js-product-${productId}`).value;
   let newnum=parseInt(num);
   cart.forEach((item)=>{
   
      if(productId===item.id)
      {
        matchingProduct=item;
      }
   }); 
   
   if(matchingProduct){
    matchingProduct.quantity+=newnum;
      addedMessage(productId);
     
     
   }
   else {
      cart.push({
          id:productId,
          quantity:newnum,
          deliveryOptionId:'1'

      });
      // clearTimeout();
      addedMessage(productId);
     
   }
    
   saveToStorage();
}

 export function addedMessage(productId){
  
    setTimeout(()=>{
       document.querySelector(`.js-cart-added-${productId}`).innerHTML=``;
    },2000);
    document.querySelector(`.js-cart-added-${productId}`).innerHTML=`<div><img src='/images/icons/checkmark.png' class="checkmark-img"></div><div class="added-text"> Added</div>`;
   
   
  }
 export function updateDeliveryOption(productId,deliveryId)
  {
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId===cartItem.id)
        {
            matchingItem=cartItem;
        }
    });
    matchingItem.deliveryOptionId=deliveryId;
    saveToStorage();
    
  };
