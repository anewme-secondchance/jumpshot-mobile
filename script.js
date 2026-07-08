/*==========================================
JumpShot Coffee
Main JavaScript
Designed by TaDasha Jones
==========================================*/

"use strict";

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let rewardPoints = Number(localStorage.getItem("rewardPoints")) || 845;

const searchInput = document.querySelector(".search-input");

const searchButton = document.querySelector(".search-btn");

const cartButtons = document.querySelectorAll(".order-btn,.order-btn-small");

const rewardDisplay = document.querySelector(".points");

if(rewardDisplay){

rewardDisplay.textContent = rewardPoints;

}

saveData();

function saveData(){

localStorage.setItem("cart",JSON.stringify(cart));

localStorage.setItem("favorites",JSON.stringify(favorites));

localStorage.setItem("rewardPoints",rewardPoints);

}

/*==========================================
Shopping Cart
==========================================*/

cartButtons.forEach(button=>{

button.addEventListener("click",()=>{

const card = button.closest(".drink-card");

if(!card) return;

const name = card.querySelector("h3").textContent;

const price = card.querySelector(".price").textContent;

const image = card.querySelector("img").src;

cart.push({

name,

price,

image,

qty:1

});

rewardPoints += 10;

saveData();

if(rewardDisplay){

rewardDisplay.textContent = rewardPoints;

}

alert(name + " added to your cart!");

});

});

/*==========================================
Search Menu
==========================================*/

if(searchButton && searchInput){

searchButton.addEventListener("click",searchMenu);

searchInput.addEventListener("keyup",(e)=>{

if(e.key==="Enter"){

searchMenu();

}

});

}

function searchMenu(){

const value = searchInput.value.toLowerCase();

const cards = document.querySelectorAll(".category-card,.drink-card");

cards.forEach(card=>{

const text = card.textContent.toLowerCase();

if(text.includes(value)){

card.style.display="";

}else{

card.style.display="none";

}

});

}

/*==========================================
Favorites
==========================================*/

const favoriteButtons = document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach(button=>{

button.addEventListener("click",()=>{

const card = button.closest(".drink-card");

if(!card) return;

const drinkName = card.querySelector("h3").textContent;

const exists = favorites.find(item=>item===drinkName);

if(exists){

alert(drinkName + " is already in your favorites!");

return;

}

favorites.push(drinkName);

saveData();

button.innerHTML="❤️";

alert(drinkName + " added to Favorites!");

});

});

/*==========================================
Dark Mode
==========================================*/

const darkButton=document.querySelector(".dark-mode-btn");

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark-mode");

}

if(darkButton){

darkButton.addEventListener("click",()=>{

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){

localStorage.setItem("theme","dark");

}else{

localStorage.setItem("theme","light");

}

});

}

/*==========================================
Mobile Menu
==========================================*/

const menuButton=document.querySelector(".icon-btn");

const navigation=document.querySelector(".bottom-nav");

if(menuButton){

menuButton.addEventListener("click",()=>{

navigation.classList.toggle("show-menu");

});

}

/*==========================================
Cart Counter
==========================================*/

const cartCount=document.querySelector(".cart-count");

function updateCartCounter(){

if(cartCount){

cartCount.textContent=cart.length;

}

}

updateCartCounter();

saveData();

/*==========================================
Checkout
==========================================*/

const checkoutButton=document.querySelector(".checkout-btn");

if(checkoutButton){

checkoutButton.addEventListener("click",()=>{

if(cart.length===0){

alert("Your cart is empty.");

return;

}

alert("Thank you for choosing JumpShot Coffee!");

cart.length=0;

rewardPoints+=50;

saveData();

updateCartCounter();

});

}

/*==========================================
Notifications
==========================================*/

function showNotification(message){

const notice=document.createElement("div");

notice.className="notification";

notice.innerHTML=message;

document.body.appendChild(notice);

setTimeout(()=>{

notice.classList.add("show");

},100);

setTimeout(()=>{

notice.classList.remove("show");

setTimeout(()=>{

notice.remove();

},400);

},3000);

}

/*==========================================
Order History
==========================================*/

let history=JSON.parse(localStorage.getItem("history"))||[];

function saveOrder(order){

history.push(order);

localStorage.setItem(

"history",

JSON.stringify(history)

);

}

if(checkoutButton){

checkoutButton.addEventListener("click",()=>{

saveOrder({

date:new Date().toLocaleString(),

items:cart,

points:rewardPoints

});

});

}

/*==========================================
Welcome Message
==========================================*/

window.addEventListener("load",()=>{

showNotification(

"☕ Welcome to JumpShot Coffee!"

);

updateCartCounter();

});

/*==========================================
Reward Levels
==========================================*/

function updateRewardLevel(){

const level=document.querySelector(".reward-level");

if(!level) return;

if(rewardPoints>=2500){

level.textContent="🏆 MVP";

}

else if(rewardPoints>=1500){

level.textContent="🥇 All-Star";

}

else if(rewardPoints>=750){

level.textContent="🥈 Starter";

}

else{

level.textContent="☕ Rookie";

}

}

updateRewardLevel();

/*==========================================
Live Search
==========================================*/

if(searchInput){

searchInput.addEventListener("input",()=>{

const value=searchInput.value.toLowerCase();

const cards=document.querySelectorAll(".category-card");

cards.forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(value)?"":"none";

});

});

}

/*==========================================
Back To Top
==========================================*/

const topButton=document.querySelector(".top-btn");

if(topButton){

window.addEventListener("scroll",()=>{

topButton.style.display=

window.scrollY>500

?

"block"

:

"none";

});

topButton.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/*==========================================
Loading Screen
==========================================*/

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

setTimeout(()=>{

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},500);

},1200);

}

});

/*==========================================
Today's Greeting
==========================================*/

const greeting=document.querySelector(".greeting");

if(greeting){

const hour=new Date().getHours();

if(hour<12){

greeting.textContent="☀️ Good Morning";

}

else if(hour<18){

greeting.textContent="🌤 Good Afternoon";

}

else{

greeting.textContent="🌙 Good Evening";

}

}

/*==========================================
App Ready
==========================================*/

console.log("JumpShot Coffee App Loaded Successfully");

updateCartCounter();

updateRewardLevel();

saveData();

