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
REWARDS DASHBOARD
=========================================*/

function updateRewardDisplay(){

const currentShots=

document.getElementById(

"currentShots"

);

const lifetimeShots=

document.getElementById(

"lifetimeShots"

);

const meterValue=

document.getElementById(

"meterValue"

);

const progress=

document.getElementById(

"rewardProgress"

);

const progressText=

document.getElementById(

"progressText"

);

const nextReward=

document.getElementById(

"nextReward"

);

if(currentShots){

currentShots.textContent=shots;

}

if(lifetimeShots){

lifetimeShots.textContent=shots;

}

if(meterValue){

meterValue.textContent=shots;

}

/*=========================================
LEVELS
=========================================*/

let goal=200;

let level="Rookie";

if(shots>=1000){

goal=1500;

level="Legend";

}

else if(shots>=500){

goal=1000;

level="MVP";

}

else if(shots>=200){

goal=500;

level="All-Star";

}

const percent=

Math.min(

(shots/goal)*100,

100

);

if(progress){

progress.style.width=

percent+"%";

}

if(progressText){

progressText.textContent=

shots+

" / "+

goal;

}

if(nextReward){

if(level==="Rookie"){

nextReward.textContent=

(goal-shots)+

" SHOTS TO ALL-STAR";

}

else if(level==="All-Star"){

nextReward.textContent=

(goal-shots)+

" SHOTS TO MVP";

}

else if(level==="MVP"){

nextReward.textContent=

(goal-shots)+

" SHOTS TO LEGEND";

}

else{

nextReward.textContent=

"LEGEND UNLOCKED";

}

}

updateProfileLevel();

}

/*=========================================
BASKETBALL ANIMATION
=========================================*/

function moveBasketball(){

const ball=

document.getElementById(

"gameBall"

);

if(!ball) return;

ball.classList.remove(

"shoot"

);

void ball.offsetWidth;

ball.classList.add(

"shoot"

);

setTimeout(()=>{

ball.classList.remove(

"shoot"

);

},1200);

}

/*=========================================
REWARD POPUP
=========================================*/

function openRewards(){

const popup=

document.getElementById(

"rewardsPopup"

);

if(popup){

popup.style.display=

"flex";

}

}

function closeRewards(){

const popup=

document.getElementById(

"rewardsPopup"

);

if(popup){

popup.style.display=

"none";

}

}

/*=========================================
HISTORY POPUP
=========================================*/

function openHistory(){

const popup=

document.getElementById(

"historyPopup"

);

if(popup){

popup.style.display=

"flex";

}

}

function closeHistory(){

const popup=

document.getElementById(

"historyPopup"

);

if(popup){

popup.style.display=

"none";

}

}

/*=========================================
SHOT NOTIFICATION
=========================================*/

function showShotNotification(amount){

const notice=

document.getElementById(

"shotNotification"

);

if(!notice) return;

notice.innerHTML=

"+"+

amount+

" SHOTS";

notice.style.display=

"block";

setTimeout(()=>{

notice.style.display=

"none";

},1800);

}

/*=========================================
EARN SHOTS
=========================================*/

function addShots(amount){

shots += amount;

saveShots();

updateRewardDisplay();

moveBasketball();

showShotNotification(amount);

checkLevelUnlock();

}

/*=========================================
COFFEE
=========================================*/

function earnCoffeeShots(){

addShots(10);

addHistory(

"☕ Purchased Coffee",

10

);

}

/*=========================================
NEW DRINK
=========================================*/

function earnDrinkShots(){

addShots(25);

addHistory(

"🥤 Tried A New Drink",

25

);

}

/*=========================================
DAILY CHECK IN
=========================================*/

function dailyCheckIn(){

addShots(10);

addHistory(

"📅 Daily Check-In",

10

);

}

/*=========================================
REFER FRIEND
=========================================*/

function referFriend(){

addShots(50);

addHistory(

"👥 Referred A Friend",

50

);

}

/*=========================================
BIRTHDAY BONUS
=========================================*/

function birthdayReward(){

addShots(100);

addHistory(

"🎂 Birthday Reward",

100

);

}

/*=========================================
HISTORY
=========================================*/

let rewardHistory=[];

function addHistory(title,earned){

rewardHistory.unshift({

title,

earned,

date:new Date().toLocaleString()

});

const list=

document.getElementById(

"historyList"

);

if(!list) return;

list.innerHTML="";

rewardHistory.forEach(item=>{

list.innerHTML+=`

<div class="history-item">

<h3>${item.title}</h3>

<p>+${item.earned} Shots</p>

<small>${item.date}</small>

</div>

`;

});

}

/*=========================================
LEVELS
=========================================*/

function checkLevelUnlock(){

const rookie=

document.getElementById(

"rookieLevel"

);

const allStar=

document.getElementById(

"allStarLevel"

);

const mvp=

document.getElementById(

"mvpLevel"

);

const legend=

document.getElementById(

"legendLevel"

);

[rookie,allStar,mvp,legend].forEach(level=>{

if(level){

level.classList.remove("active");

}

});

let message="🏀 Rookie";

if(shots>=1000){

if(legend){

legend.classList.add("active");

}

message="🔥 Legend";

}

else if(shots>=500){

if(mvp){

mvp.classList.add("active");

}

message="🏆 MVP";

}

else if(shots>=200){

if(allStar){

allStar.classList.add("active");

}

message="⭐ All-Star";

}

else{

if(rookie){

rookie.classList.add("active");

}

}

const unlock=

document.getElementById(

"levelUnlocked"

);

const text=

document.getElementById(

"levelText"

);

if(unlock && text){

text.textContent=

message;

unlock.style.display="block";

setTimeout(()=>{

unlock.style.display="none";

},2500);

}

launchConfetti();

}

/*=========================================
PAGE START
=========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

updateRewardDisplay();

checkLevelUnlock();

});

/*=========================================
BUTTONS
=========================================*/

document.addEventListener(

"click",

(event)=>{

if(event.target.id==="rewardsPopup"){

closeRewards();

}

if(event.target.id==="historyPopup"){

closeHistory();

}

});

/*=========================================
KEYBOARD
=========================================*/

document.addEventListener(

"keydown",

(event)=>{

if(event.key==="Escape"){

closeRewards();

closeHistory();

}

});

/*=========================================
END REWARDS
=========================================*/
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
