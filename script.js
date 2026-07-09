/*========================================
JUMPSHOT COFFEE
SCRIPT.JS
========================================*/

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {

    loadShots();
    loadFavorites();
    displayCart();
    updateProgress();
    updateFavoriteCount();
    loadProfile();
    setupContactForm();

}

/*========================================
REWARDS
========================================*/

function loadShots() {

    const shots = Number(localStorage.getItem("shots")) || 0;

    document.querySelectorAll("#shotCount").forEach(counter => {

        counter.textContent = shots;

    });

}

function addShots(points) {

    let shots = Number(localStorage.getItem("shots")) || 0;

    shots += points;

    localStorage.setItem("shots", shots);

    loadShots();

    updateProgress();

}

function updateProgress() {

    const shots = Number(localStorage.getItem("shots")) || 0;

    const percent = Math.min((shots / 500) * 100, 100);

    document.querySelectorAll("#progressFill").forEach(bar => {

        bar.style.width = percent + "%";

    });

}

/*========================================
FAVORITES
========================================*/

function loadFavorites() {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    document.querySelectorAll(".favorite-btn").forEach(button => {

        const card = button.closest(".drink-card");

        if (!card) return;

        const item = card.querySelector("h2").textContent;

        if (favorites.includes(item)) {

            button.textContent = "❤️ Favorited";

        }

        button.addEventListener("click", () => {

            if (!favorites.includes(item)) {

                favorites.push(item);

                localStorage.setItem("favorites", JSON.stringify(favorites));

                button.textContent = "❤️ Favorited";

                updateFavoriteCount();

            }

        });

    });

}

function updateFavoriteCount() {

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const counter = document.getElementById("favoriteCount");

    if (counter) {

        counter.textContent = favorites.length;

    }

}

/*========================================
CART
========================================*/

function getCart() {

    return JSON.parse(localStorage.getItem("cart")) || [];

}

function saveCart(cart) {

    localStorage.setItem("cart", JSON.stringify(cart));

}

function setupCartButtons() {

    document.querySelectorAll(".order-btn-small").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".drink-card");

            const name = card.querySelector("h2").textContent;

            const price = card.querySelector("h3").textContent;

            let cart = getCart();

            const existing = cart.find(item => item.name === name);

            if (existing) {

                existing.quantity++;

            } else {

                cart.push({

                    name: name,
                    price: price,
                    quantity: 1

                });

            }

            saveCart(cart);

            displayCart();

        });

    });

}


/*========================================
DISPLAY CART
========================================*/

function displayCart() {

    const container = document.getElementById("cartItems");

    if (!container) return;

    const cart = getCart();

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML = `

        <div class="empty-cart">

            <h3>Your cart is empty.</h3>

            <p>Browse the menu to start your order.</p>

        </div>

        `;

        updateTotals();

        return;

    }

    cart.forEach((item, index) => {

        container.innerHTML += `

        <div class="cart-item">

            <h2>${item.name}</h2>

            <p>${item.price}</p>

            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">−</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">+</button>

            </div>

            <button onclick="removeCartItem(${index})">

                🗑 Remove

            </button>

        </div>

        `;

    });

    updateTotals();

}

/*========================================
REMOVE CART ITEM
========================================*/

function removeCartItem(index){

    let cart = getCart();

    cart.splice(index,1);

    saveCart(cart);

    displayCart();

}

/*========================================
QUANTITY
========================================*/

function increaseQuantity(index){

    let cart = getCart();

    cart[index].quantity++;

    saveCart(cart);

    displayCart();

}

function decreaseQuantity(index){

    let cart = getCart();

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart(cart);

    displayCart();

}

/*========================================
CART TOTALS
========================================*/

function updateTotals(){

    const cart = getCart();

    let total = 0;

    let items = 0;

    cart.forEach(item=>{

        const price = parseFloat(item.price.replace(/[^0-9.]/g,""));

        if(!isNaN(price)){

            total += price * item.quantity;

        }

        items += item.quantity;

    });

    const cartCount = document.getElementById("cartCount");
    const subtotal = document.getElementById("subtotal");
    const cartTotal = document.getElementById("cartTotal");
    const estimatedShots = document.getElementById("estimatedShots");

    if(cartCount){

        cartCount.textContent = items;

    }

    if(subtotal){

        subtotal.textContent = "$" + total.toFixed(2);

    }

    if(cartTotal){

        cartTotal.textContent = "$" + total.toFixed(2);

    }

    if(estimatedShots){

        estimatedShots.textContent = Math.round(total * 25);

    }

}

/*========================================
CHECKOUT
========================================*/

function checkout(){

    const cart = getCart();

    if(cart.length === 0){

        alert("Your cart is empty.");

        return;

    }

    let total = 0;

    cart.forEach(item=>{

        const price = parseFloat(item.price.replace(/[^0-9.]/g,""));

        if(!isNaN(price)){

            total += price * item.quantity;

        }

    });

    addShots(Math.round(total * 25));

    localStorage.removeItem("cart");

    displayCart();

    alert("Thank you for visiting JumpShot Coffee!");

}

/*========================================
CHECKOUT BUTTON
========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    setupCartButtons();

    const checkoutButton = document.querySelector(".checkout-btn");

    if(checkoutButton){

        checkoutButton.addEventListener("click",checkout);

    }

});

/*========================================
PROFILE
========================================*/

function loadProfile(){

    const customerName = document.getElementById("customerName");

    const customerEmail = document.getElementById("customerEmail");

    if(customerName){

        customerName.textContent =

        localStorage.getItem("customerName") || "Guest";

    }

    if(customerEmail){

        customerEmail.textContent =

        localStorage.getItem("customerEmail") || "Not Available";

    }

}

/*========================================
CONTACT FORM
========================================*/

function setupContactForm(){

    const form = document.getElementById("contactForm");

    if(!form) return;

    form.addEventListener("submit",function(e){

        e.preventDefault();

        alert("Thank you for contacting JumpShot Coffee!");

        form.reset();

    });

}

/*========================================
SAVE PROFILE
========================================*/

function saveProfile(name,email){

    localStorage.setItem("customerName",name);

    localStorage.setItem("customerEmail",email);

    loadProfile();

}

/*========================================
CLEAR CART
========================================*/

function clearCart(){

    localStorage.removeItem("cart");

    displayCart();

}

/*========================================
UTILITY FUNCTIONS
========================================*/

function formatMoney(amount){

    return "$" + amount.toFixed(2);

}

function getShotsEarned(total){

    return Math.round(total * 25);

}


