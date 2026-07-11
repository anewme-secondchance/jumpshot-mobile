/*=========================================
JUMPSHOT COFFEE
SCRIPT.JS
=========================================*/

"use strict";

/*=========================================
LOCAL STORAGE KEYS
=========================================*/

const CART_KEY = "jumpshot_cart";
const FAVORITES_KEY = "jumpshot_favorites";
const SHOTS_KEY = "jumpshot_shots";
const PROFILE_KEY = "jumpshot_profile";

/*=========================================
APP DATA
=========================================*/

let cart =
JSON.parse(localStorage.getItem(CART_KEY)) || [];

let favorites =
JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

let shots =
Number(localStorage.getItem(SHOTS_KEY)) || 0;

let profile =
JSON.parse(localStorage.getItem(PROFILE_KEY)) || {

name: "Coffee Fan",

email: "guest@jumpshotcoffee.com",

level: "Rookie"

};

/*=========================================
SAVE DATA
=========================================*/

function saveCart(){

localStorage.setItem(

CART_KEY,

JSON.stringify(cart)

);

}

function saveFavorites(){

localStorage.setItem(

FAVORITES_KEY,

JSON.stringify(favorites)

);

}

function saveShots(){

localStorage.setItem(

SHOTS_KEY,

shots

);

}

function saveProfile(){

localStorage.setItem(

PROFILE_KEY,

JSON.stringify(profile)

);

}

/*=========================================
TOAST MESSAGE
=========================================*/

function showToast(message){

const toast = document.createElement("div");

toast.className = "toast";

toast.textContent = message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},300);

},2500);

}

/*=========================================
ADD TO CART
=========================================*/

function addToCart(

name,

price,

rewardShots

){

cart.push({

name,

price,

rewardShots,

qty:1

});

shots += rewardShots;

saveCart();

saveShots();

updateCartBadge();

updateRewardDisplay();

showToast(

`${name} added to cart!`

);

}

/*=========================================
REMOVE ITEM
=========================================*/

function removeItem(index){

cart.splice(index,1);

saveCart();

renderCart();

updateCartBadge();

}

/*=========================================
CLEAR CART
=========================================*/

function clearCart(){

cart=[];

saveCart();

renderCart();

updateCartBadge();

showToast(

"Cart Cleared"

);

}

/*=========================================
CART BADGE
=========================================*/

function updateCartBadge(){

const badges =

document.querySelectorAll(

".cart-count"

);

badges.forEach(badge=>{

badge.textContent = cart.length;

});

}

/*=========================================
TOTAL
=========================================*/

function getCartTotal(){

let total = 0;

cart.forEach(item=>{

total += item.price * item.qty;

});

return total.toFixed(2);

}

/*=========================================
FAVORITES
=========================================*/

function addFavorite(drink){

if(!favorites.includes(drink)){

favorites.push(drink);

saveFavorites();

showToast(

`${drink} added to Favorites ❤️`

);

}else{

showToast(

`${drink} is already in Favorites.`

);

}

renderFavorites();

}

function removeFavorite(drink){

favorites = favorites.filter(

item => item !== drink

);

saveFavorites();

renderFavorites();

showToast(

`${drink} removed.`

);

}

function renderFavorites(){

const list =

document.getElementById("favoritesList");

if(!list) return;

list.innerHTML="";

if(favorites.length===0){

list.innerHTML=

"<p>No favorite drinks yet.</p>";

return;

}

favorites.forEach(drink=>{

const card =

document.createElement("div");

card.className="favorite-card";

card.innerHTML=`

<h3>${drink}</h3>

<button
class="order-btn-small"
onclick="removeFavorite('${drink}')">

Remove

</button>

`;

list.appendChild(card);

});

}

/*=========================================
PROFILE
=========================================*/

function loadProfile(){

const name=

document.getElementById("profileName");

const email=

document.getElementById("profileEmail");

const level=

document.getElementById("playerRank");

if(name){

name.textContent=profile.name;

}

if(email){

email.textContent=profile.email;

}

if(level){

level.textContent=profile.level;

}

}

function updateProfileLevel(){

if(shots>=5000){

profile.level="Champion";

}

else if(shots>=2000){

profile.level="MVP";

}

else if(shots>=1000){

profile.level="All-Star";

}

else if(shots>=500){

profile.level="Shooter";

}

else if(shots>=250){

profile.level="Starter";

}

else{

profile.level="Rookie";

}

saveProfile();

loadProfile();

}

/*=========================================
REWARDS
=========================================*/

function updateRewardDisplay(){

const shotCounter=

document.getElementById("shotCount");

const progress=

document.getElementById("progressFill");

const progressText=

document.getElementById("progressText");

if(shotCounter){

shotCounter.textContent=shots;

}

const percent=

Math.min(

(shots/5000)*100,

100

);

if(progress){

progress.style.width=

percent+"%";

}

if(progressText){

progressText.textContent=

`${shots} / 5000 Shots`;

}

updateProfileLevel();

moveBasketball();

}

/*=========================================
CLAIM REWARD
=========================================*/

function claimReward(){

if(shots<500){

showToast(

"Keep earning Shots!"

);

return;

}

launchConfetti();

showRewardPopup();

playSwish();

showToast(

"Reward Unlocked!"

);

}

/*=========================================
REWARD POPUP
=========================================*/

function showRewardPopup(){

const popup=

document.getElementById(

"rewardPopup"

);

if(popup){

popup.style.display="flex";

}

}

function closeRewardPopup(){

const popup=

document.getElementById(

"rewardPopup"

);

if(popup){

popup.style.display="none";

}

}

/*=========================================
BASKETBALL
=========================================*/

function moveBasketball(){

const ball=

document.getElementById(

"basketball"

);

if(!ball) return;

const percent=

Math.min(

(shots/5000)*100,

100

);

ball.style.left=

percent+"%";

}

/*=========================================
RENDER CART
=========================================*/

function renderCart(){

const cartItems =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

if(!cartItems) return;

cartItems.innerHTML = "";

if(cart.length === 0){

cartItems.innerHTML = `

<div class="empty-cart">

<h2>🛒 Your Cart Is Empty</h2>

<p>Add your favorite drinks to get started.</p>

</div>

`;

if(cartTotal){

cartTotal.textContent = "$0.00";

}

return;

}

cart.forEach((item,index)=>{

const card = document.createElement("div");

card.className = "cart-card";

card.innerHTML = `

<h3>${item.name}</h3>

<p>$${item.price.toFixed(2)}</p>

<div class="qty-controls">

<button onclick="decreaseQty(${index})">

➖

</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${index})">

➕

</button>

</div>

<button
class="favorite-btn"
onclick="removeItem(${index})">

Remove

</button>

`;

cartItems.appendChild(card);

});

if(cartTotal){

cartTotal.textContent = "$" + getCartTotal();

}

}

/*=========================================
QUANTITY
=========================================*/

function increaseQty(index){

cart[index].qty++;

saveCart();

renderCart();

updateCartBadge();

}

function decreaseQty(index){

if(cart[index].qty > 1){

cart[index].qty--;

}else{

cart.splice(index,1);

}

saveCart();

renderCart();

updateCartBadge();

}

/*=========================================
CHECKOUT
=========================================*/

function checkout(){

if(cart.length === 0){

showToast(

"Your cart is empty."

);

return;

}

const history =

JSON.parse(

localStorage.getItem("orderHistory")

) || [];

history.push({

date:new Date().toLocaleString(),

items:cart,

total:getCartTotal()

});

localStorage.setItem(

"orderHistory",

JSON.stringify(history)

);

cart=[];

saveCart();

renderCart();

updateCartBadge();

launchConfetti();

showToast(

"Order Placed Successfully!"

);

}

/*=========================================
ORDER HISTORY
=========================================*/

function viewOrders(){

const orders =

JSON.parse(

localStorage.getItem("orderHistory")

) || [];

if(orders.length===0){

showToast(

"No Previous Orders"

);

return;

}

console.log(orders);

showToast(

`${orders.length} Previous Orders Found`

);

}

/*=========================================
SETTINGS
=========================================*/

function openSettings(){

showToast(

"Settings Coming Soon"

);

}

/*=========================================
INSTALL PWA
=========================================*/

let deferredPrompt;

window.addEventListener(

"beforeinstallprompt",

(e)=>{

e.preventDefault();

deferredPrompt=e;

const install=

document.getElementById(

"installPrompt"

);

if(install){

install.style.display="flex";

}

});

const installBtn=

document.getElementById(

"installBtn"

);

if(installBtn){

installBtn.addEventListener(

"click",

async()=>{

if(!deferredPrompt) return;

deferredPrompt.prompt();

await deferredPrompt.userChoice;

deferredPrompt=null;

document.getElementById(

"installPrompt"

).style.display="none";

});

}

const closeInstall=

document.getElementById(

"closeInstall"

);

if(closeInstall){

closeInstall.addEventListener(

"click",

()=>{

document.getElementById(

"installPrompt"

).style.display="none";

});

}

/*=========================================
BACK TO TOP
=========================================*/

function scrollToTop(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

window.addEventListener(

"scroll",

()=>{

const btn=

document.getElementById(

"backToTop"

);

if(!btn) return;

if(window.scrollY>400){

btn.style.display="flex";

}else{

btn.style.display="none";

}

});

/*=========================================
LOADING SCREEN
=========================================*/

window.addEventListener(

"load",

()=>{

const loading=

document.getElementById(

"loadingScreen"

);

if(!loading) return;

setTimeout(()=>{

loading.style.opacity="0";

setTimeout(()=>{

loading.style.display="none";

},500);

},1000);

});

/*=========================================
CONFETTI
=========================================*/

function launchConfetti(){

if(typeof confetti === "function"){

confetti({

particleCount:175,

spread:90,

origin:{y:0.6}

});

}

}

/*=========================================
SOUNDS
=========================================*/

function playSwish(){

const swish =

document.getElementById(

"swishSound"

);

if(swish){

swish.currentTime = 0;

swish.play().catch(()=>{});

}

}

function playCheer(){

const cheer =

document.getElementById(

"cheerSound"

);

if(cheer){

cheer.currentTime = 0;

cheer.play().catch(()=>{});

}

}

/*=========================================
SEARCH
=========================================*/

function searchMenu(){

const input =

document.getElementById(

"searchInput"

);

if(!input) return;

const filter =

input.value.toLowerCase();

const cards =

document.querySelectorAll(

".drink-card"

);

cards.forEach(card=>{

const text =

card.textContent.toLowerCase();

if(text.includes(filter)){

card.style.display="flex";

}else{

card.style.display="none";

}

});

}

/*=========================================
PAGE INITIALIZATION
=========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

updateCartBadge();

updateRewardDisplay();

renderCart();

renderFavorites();

loadProfile();

});

/*=========================================
SERVICE WORKER
=========================================*/

if("serviceWorker" in navigator){

window.addEventListener(

"load",

()=>{

navigator.serviceWorker

.register("service-worker.js")

.then(()=>{

console.log(

"Service Worker Registered"

);

})

.catch(error=>{

console.log(error);

});

});

}

/*=========================================
ONLINE / OFFLINE STATUS
=========================================*/

window.addEventListener(

"offline",

()=>{

showToast(

"You are offline."

);

});

window.addEventListener(

"online",

()=>{

showToast(

"Back online!"

);

});

/*=========================================
WELCOME MESSAGE
=========================================*/

window.addEventListener(

"load",

()=>{

setTimeout(()=>{

showToast(

"Welcome to JumpShot Coffee ☕"

);

},1500);

});

/*=========================================
KEYBOARD SHORTCUTS
=========================================*/

document.addEventListener(

"keydown",

(event)=>{

if(event.key==="Escape"){

closeRewardPopup();

}

});

/*=========================================
COPYRIGHT
=========================================*/

console.log(

"JumpShot Coffee App Loaded Successfully"

);

/*=========================================
END OF SCRIPT.JS
=========================================*/
