import{cart,addToCart,calculateCartQuantity} from './cart.js';
import { products} from './product.js';
import { formatNumber } from './util/utility.js';
var productHTML='';


function updateCartQuantity()
{
   let cartQuantity=calculateCartQuantity();
   

   if(cartQuantity==0)
   {
      document.querySelector(".js-cart-quantity").innerHTML='';
      return;
   }
document.querySelector(".js-cart-quantity").innerHTML=cartQuantity;
}

products.forEach((product)=>{
    productHTML+=` <div class="single-content">
       <div class="image-content" ><img src="/${product.image}" alt="" class="product-image"></div>
<div><p class="product-name">${product.name}</div>
        <div class="rating"><img src="/images/ratings/rating-${product.rating.stars*10}.png" alt="" class="rating-png"><div class="rating-number"><span>${product.rating.count}</span></div></div>
       <div class="cost" >$${formatNumber(product.priceCents)}</div>
       <div><select name="1" id="selector" class="js-product-${product.id}"><option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
    </select></div>
         <div class="cart-added js-cart-added-${product.id}"></div>
      <div class="add-button-div"> <button class="add-to-cart-button" data-product-id='${product.id}'>Add to Cart</button></div>

    </div>`
});


 document.querySelector(".js-container").innerHTML=productHTML;
 updateCartQuantity();


 document.querySelectorAll('.add-to-cart-button').forEach((button)=>{
    button.addEventListener('click', ()=>{
         const productId=button.dataset.productId;
         addToCart(productId);
        updateCartQuantity();
        console.log(productId);
        document.querySelector(`.js-product-${productId}`).value=1;

      
    });
  
 });
 
 
 
