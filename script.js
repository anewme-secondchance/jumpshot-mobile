/*=====================================
JUMPSHOT COFFEE APP
=====================================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let shots = Number(localStorage.getItem("shots")) || 0;

let profile = JSON.parse(localStorage.getItem("profile")) || {};

updateShotDisplays();

/*=====================================
SAVE DATA
=====================================*/

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

}

function saveFavorites(){

localStorage.setItem("favorites",JSON.stringify(favorites));

}

function saveShots(){

localStorage.setItem("shots",shots);

updateShotDisplays();

}

function saveProfileData(){

localStorage.setItem("profile",

JSON.stringify(profile));

}

/*=====================================
SHOTS
=====================================*/

function addShots(amount){

shots += amount;

saveShots();

showConfetti();

}

function updateShotDisplays(){

const big=document.getElementById("shotCount");

const small=document.getElementById("shotCountSmall");

if(big){

big.textContent=shots;

}

if(small){

small.textContent=shots;

}

updateProgress();

}

/*=====================================
PROGRESS BAR
=====================================*/

function updateProgress(){

const progress=

document.getElementById("progressFill");

if(!progress) return;

let percent=(shots%500)/500*100;

progress.style.width=percent+"%";

}

/*=====================================
FAVORITES
=====================================*/

function addFavorite(item){

if(!favorites.includes(item)){

favorites.push(item);

saveFavorites();

alert(item+" added to Favorites ❤️");

}

}

/*=====================================
ADD TO CART
=====================================*/

function addToCart(name,price,shotValue){

cart.push({

name:name,

price:price,

shots:shotValue

});

saveCart();

addShots(shotValue);

updateCart();

showConfetti();

alert(name+" added to your cart!");

}

/*=====================================
UPDATE CART
=====================================*/

function updateCart(){

const cartContainer=document.getElementById("cartItems");

const subtotal=document.getElementById("cartSubtotal");

const total=document.getElementById("cartTotal");

if(!cartContainer) return;

cartContainer.innerHTML="";

let totalPrice=0;

cart.forEach((item,index)=>{

totalPrice+=item.price;

cartContainer.innerHTML+=`

<div class="drink-card">

<div class="drink-info">

<h2>${item.name}</h2>

<h3>$${item.price.toFixed(2)}</h3>

<p>Earned ${item.shots} Shots</p>

<div class="drink-buttons">

<button

class="favorite-btn"

onclick="removeItem(${index})">

🗑 Remove

</button>

</div>

</div>

</div>

`;

});

if(subtotal){

subtotal.textContent="$"+totalPrice.toFixed(2);

}

if(total){

total.textContent="$"+totalPrice.toFixed(2);

}

}

/*=====================================
REMOVE ITEM
=====================================*/

function removeItem(index){

cart.splice(index,1);

saveCart();

updateCart();

}

/*=====================================
CLEAR CART
=====================================*/

function clearCart(){

cart=[];

saveCart();

updateCart();

}

/*=====================================
CHECKOUT
=====================================*/

function checkout(){

if(cart.length===0){

alert("Your cart is empty.");

return;

}

alert(

"Thank you for choosing JumpShot Coffee!\n\nYour order has been received."

);

cart=[];

saveCart();

updateCart();

}

/*=====================================
LOAD APP
=====================================*/

document.addEventListener("DOMContentLoaded",()=>{

updateCart();

updateShotDisplays();

});
