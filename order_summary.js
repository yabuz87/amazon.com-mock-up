// import { formatNumber } from "./util/utility";

 export function totalItem(cart)
{
    let total=0;
    cart.forEach((item) =>{
    total+=item.quantity;
 })
 return total;
}
export function totalPriceOfItem(cart,products)
{
    let totalPrice=0;
    cart.forEach((item=>
    {
            products.forEach((product)=>
                {
            if(item.id===product.id)
            {
                const price=decimalNumber(product.priceCents);
                totalPrice+=price*(item.quantity);
            }
                 });
    }));
    return totalPrice.toFixed(2);
}
function decimalNumber(PriceCents)
{
    return (PriceCents/100).toFixed(2);
}
export function shippingtotal(cart,deliveryOption)
{
    var shipping=0;
    cart.forEach((item)=>{
        deliveryOption.forEach((option)=>{
            
            
        
            if(item.deliveryOptionId===option.id)
            {
                switch(option.id)
                {
                    case '1':shipping+=0;
                    break;
                    case '2':shipping+=4.99;
                    break;
                    case '3': shipping+=9.99;
                    break;
                    default: shipping+=0;
                        break;
                }  
            }
            });
    });
    return shipping;
}
export function sum(a,b)
{
    let an=parseFloat(a);
   let bn=parseFloat(b);
    return (an+bn).toFixed(2);

}
export function extratax(total){
             return (total*0.1).toFixed(2);
            
}