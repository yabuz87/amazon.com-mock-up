import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from './deliveryOption.js';
import { products } from '../homePage/product.js';
import { formatNumber } from '../util/utility.js';
import { calculateCartQuantity, cart, removeCart, saveToStorage, updateDeliveryOption } from './cart.js';
import { extratax, shippingtotal, sum, totalItem, totalPriceOfItem } from './order_summary.js';

function renderOrderSummary() {
    let checkout = '';
    let renderSummary = '';

    cart.forEach((cartItem) => {
        let matchProduct = products.find(product => product.id === cartItem.id);
        if (!matchProduct) return;

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOp = deliveryOptions.find(op => op.id === deliveryOptionId);
        if (!deliveryOp) return;

        const today = dayjs();
        let deliveryDate = today.add(deliveryOp.deliveryDay, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const totalItemPrice = totalPriceOfItem(cart, products);
        const shipping = shippingtotal(cart, deliveryOptions);
        const totalPrice = sum(shipping, totalItemPrice);

        checkout += `
            <div class="main-container main-container-${matchProduct.id}">
                <div class="date-title">Delivery-date: ${dateString}</div>
                <div class="container-detail">
                    <div>
                        <img class="" src="/${matchProduct.image}">
                    </div>     
                    <div class="container-detail-middle">
                        <div class="item-name-div">${matchProduct.name}</div>
                        <div class="price-div">$${formatNumber(matchProduct.priceCents)}</div>
                        <div class="spans-${matchProduct.id}">
                            Quantity: ${cartItem.quantity} 
                            <span class="update-span" id='update-${matchProduct.id}' data-product-id='${matchProduct.id}'>update</span> 
                            <span class="update-input-span update-input-${matchProduct.id}"></span> 
                            <span class="delete-span" data-product-id="${matchProduct.id}">delete</span>
                        </div>
                    </div>
                    <div class=delivery-div>
                        <p>Choose the delivery option</p>
                        ${deliveryOptionHTML(matchProduct, cartItem)}
                    </div>
                </div>
            </div>`;

        renderSummary = `
            <div class="summary-title">Order Summary</div>
            <div>
                <div>Item(<span>${totalItem(cart)}</span>)</div>
                <div>$${totalItemPrice}</div>
            </div>
            <div>
                <div>Shipping & handling</div>
                <div>$${shipping}</div>
            </div>
            <div>
                <div>Total before tax:</div>
                <div>$${totalPrice}</div>
            </div>
            <div>
                <div>Estimated tax(10%):</div>
                <div>$${extratax(totalPrice)}</div>
            </div>
            <div class="summary-total">
                <div>Order total:</div>
                <div>$${sum(extratax(totalPrice), totalPrice)}</div>
            </div>
            <div>
                <button class="place-order-button">Place your order</button>
            </div>`;
    });

    document.querySelector('.Review-flex').innerHTML = checkout;
    document.querySelector('.summary-div').innerHTML = renderSummary;

    document.querySelectorAll('.delete-span').forEach((deleteButton) => {
        deleteButton.addEventListener("click", () => {
            const productId = deleteButton.dataset.productId;
            removeCart(productId);
            const container = document.querySelector(`.main-container-${productId}`);
            container.remove();
            updateCartQuantity();
            renderOrderSummary();
        });
    });

    document.querySelectorAll('.update-span').forEach((updateButton) => {
        let productId = updateButton.dataset.productId;
        let itemChosen;
        updateButton.addEventListener('click', () => {
            itemChosen = cart.find(item => item.id === productId);
            document.querySelector(`#update-${productId}`).innerHTML = '';
            document.querySelector(`.update-input-${productId}`).innerHTML = `
                <input type='text' class='js-input-update input-${productId}'>
                <label for='productId' class='save-input-button save-button-${productId}'>Save</label>`;
            document.querySelectorAll(`.save-button-${productId}`).forEach((saveButton) => {
                saveButton.addEventListener('click', () => {
                    let inputValue = parseInt(document.querySelector(`.input-${productId}`).value);
                    while (true) {
                        if (!isNaN(inputValue) && inputValue >= 0) {
                            break;
                        }
                        alert("Please enter a valid input");
                        inputValue = parseInt(prompt("Enter the Number"));
                    }
                    itemChosen.quantity += inputValue;
                    saveToStorage();
                    updateCartQuantity();
                    document.querySelector(`.update-input-${productId}`).innerHTML = '';
                    document.querySelector(`#update-${productId}`).innerHTML = 'update'; 
                    renderOrderSummary();
                });
            });
        });
    });

    const myInput = document.querySelectorAll(".js-option-input");
    myInput.forEach((element) => {
        const { productId, deliveryOptionId } = element.dataset;
        element.addEventListener('click', () => {
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
        });
    });
}

function updateCartQuantity() {
    let num = calculateCartQuantity();
    if (num === 1 || num === 0) {
        document.querySelector('.span-inside-h3').innerHTML = `${num} item`;
    } else {
        document.querySelector('.span-inside-h3').innerHTML = `${num} items`;
    }
}

function deliveryOptionHTML(matchProduct, cartItem) {
    let theHTML = '';
    deliveryOptions.forEach((option) => {
        const today = dayjs();
        let deliveryDate = today.add(option.deliveryDay, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        let isChecked = option.id === cartItem.deliveryOptionId;
        const priceString = option.priceCent === 0 ? 'Free ' : `$${formatNumber(option.priceCent)}- `;
        theHTML += `
            <div class="js-option-input" data-product-id="${matchProduct.id}" data-delivery-option-id="${option.id}">
                <input class="option-input" type="radio" ${isChecked ? 'checked' : ''} name="${matchProduct.id}">
                <label>${dateString}<span class="span-inside-delivery-option">${priceString}Shipping</span></label>
            </div>`;
    });
    return theHTML;
}

// Initial render
renderOrderSummary();
