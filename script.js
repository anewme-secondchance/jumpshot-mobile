/*=====================================
JUMPSHOT COFFEE
GLOBAL VARIABLES
=====================================*/

let shots = Number(localStorage.getItem("shots")) || 0;

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateShots();
updateCart();

/*=====================================
REWARDS
=====================================*/

function updateShots(){

const shotCount=document.getElementById("shotCount");

const progressFill=document.getElementById("progressFill");

if(shotCount){

shotCount.textContent=shots;

}

if(progressFill){

let percent=(shots/500)*100;

if(percent>100){

percent=100;

}

progressFill.style.width=percent+"%";

}

localStorage.setItem("shots",shots);

}

/*=====================================
EARN SHOTS
=====================================*/

function earnShots(amount){

shots+=amount;

updateShots();

checkRewards();

}

function checkRewards(){

if(shots>=500){

launchConfetti();

alert("🏀 Congratulations! You earned a FREE Coffee!");

}

}

/*=====================================
COFFEE BEAN GAME
=====================================*/

function shootBean(){

const bean=document.getElementById("coffeeBean");

if(!bean){

return;

}

bean.classList.add("shoot");

setTimeout(()=>{

bean.classList.remove("shoot");

earnShots(25);

},900);

}

/*=====================================
SHOPPING CART
=====================================*/

function addToCart(name,price,shotsEarned){

cart.push({

name:name,

price:price,

shots:shotsEarned

});

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();

earnShots(shotsEarned);

alert(name+" added to your cart!");

}

function updateCart(){

const subtotal=document.getElementById("cartSubtotal");

const total=document.getElementById("cartTotal");

if(!subtotal||!total){

return;

}

let amount=0;

cart.forEach(item=>{

amount+=item.price;

});

subtotal.textContent="$"+amount.toFixed(2);

total.textContent="$"+amount.toFixed(2);

}

/*=====================================
FAVORITES
=====================================*/

function addFavorite(drink){

if(!favorites.includes(drink)){

favorites.push(drink);

localStorage.setItem(

"favorites",

JSON.stringify(favorites)

);

alert(drink+" added to Favorites ❤️");

}else{

alert("Already in Favorites ❤️");

}

}

/*=====================================
PROFILE
=====================================*/

function saveProfile(){

const name=document.querySelector("input[type='text']");

const email=document.querySelector("input[type='email']");

if(name){

localStorage.setItem("customerName",name.value);

}

if(email){

localStorage.setItem("customerEmail",email.value);

}

alert("Profile Saved!");

}

window.onload=function(){

const name=document.querySelector("input[type='text']");

const email=document.querySelector("input[type='email']");

if(name){

name.value=

localStorage.getItem("customerName")||"";

}

if(email){

email.value=

localStorage.getItem("customerEmail")||"";

}

updateShots();

updateCart();

};

/*=====================================
ORDER BUTTONS
=====================================*/

document.querySelectorAll(".order-btn-small")

.forEach(button=>{

button.addEventListener("click",function(){

const card=

this.closest(".drink-card");

const name=

card.querySelector("h2").innerText;

const priceText=

card.querySelector("h3").innerText

.replace("$","")

.replace("+","");

const price=parseFloat(priceText);

const shotText=

card.querySelector(".earn-shots")

.innerText

.replace("Earn ","")

.replace(" Shots","");

const earned=parseInt(shotText);

addToCart(

name,

price,

earned

);

});

});

/*=====================================
CONFETTI
=====================================*/

function launchConfetti(){

for(let i=0;i<100;i++){

const confetti=document.createElement("div");

confetti.className="confetti";

confetti.style.left=Math.random()*100+"vw";

confetti.style.animationDelay=Math.random()+"s";

document.body.appendChild(confetti);

setTimeout(()=>{

confetti.remove();

},3000);

}

}

/*=====================================
REWARD LEVELS
=====================================*/

function checkRewards(){

if(shots>=2500){

alert("🏆 Congratulations!\nYou are now a JumpShot VIP Member!");

launchConfetti();

}

else if(shots>=1500){

alert("🍩 Congratulations!\nYou earned a FREE Bakery Item!");

launchConfetti();

}

else if(shots>=1000){

alert("🥤 Congratulations!\nYou earned a FREE Specialty Drink!");

launchConfetti();

}

else if(shots>=500){

alert("☕ Congratulations!\nYou earned a FREE Coffee!");

launchConfetti();

}

}

/*=====================================
CLEAR CART
=====================================*/

function clearCart(){

cart=[];

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

updateCart();

alert("Cart Cleared!");

}

/*=====================================
CHECKOUT
=====================================*/

function checkout(){

if(cart.length===0){

alert("Your cart is empty.");

return;

}

launchConfetti();

alert("🏀 Thank you for your order!");

cart=[];

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

updateCart();

}

/*=====================================
FAVORITE BUTTONS
=====================================*/

document.querySelectorAll(".favorite-btn")

.forEach(button=>{

button.addEventListener("click",function(){

const card=this.closest(".drink-card");

const drink=

card.querySelector("h2").innerText;

addFavorite(drink);

});

});

/*=====================================
INITIALIZE APP
=====================================*/

document.addEventListener("DOMContentLoaded",()=>{

updateShots();

updateCart();

console.log("JumpShot Coffee Loaded Successfully");

});
