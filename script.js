/=========================================
JUMPSHOT COFFEE
SCRIPT.JS
=========================================/
"use strict";
window.onerror = function(message, source, line, column, error) {
console.error("SCRIPT ERROR:", message);
console.error("FILE:", source);
console.error("LINE:", line);
console.error("COLUMN:", column);
return false;
};
/=========================================
LOCAL STORAGE KEYS
=========================================/
const CART_KEY = "jumpshot_cart";
const FAVORITES_KEY = "jumpshot_favorites";
const SHOTS_KEY = "jumpshot_shots";
const PROFILE_KEY = "jumpshot_profile";
/=========================================
APP DATA
=========================================/
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
/=========================================
SAVE DATA
=========================================/
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
/=========================================
TOAST MESSAGE
=========================================/
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
/=========================================
ADD TO CART
=========================================/
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
${name} added to cart!
);
}
/=========================================
REMOVE ITEM
=========================================/
function removeItem(index){
cart.splice(index,1);
saveCart();
renderCart();
updateCartBadge();
}
/=========================================
CLEAR CART
=========================================/
function clearCart(){
cart=[];
saveCart();
renderCart();
updateCartBadge();
showToast(
"Cart Cleared"
);
}
/=========================================
CART BADGE
=========================================/
function updateCartBadge(){
const badges =
document.querySelectorAll(
".cart-count"
);
badges.forEach(badge=>{
badge.textContent = cart.length;
});
}
/=========================================
TOTAL
=========================================/
function getCartTotal(){
let total = 0;
cart.forEach(item=>{
total += item.price * item.qty;
});
return total.toFixed(2);
}
/=========================================
FAVORITES
=========================================/
function addFavorite(drink){
if(!favorites.includes(drink)){
favorites.push(drink);
saveFavorites();
showToast(
${drink} added to Favorites ❤️
);
}else{
showToast(
${drink} is already in Favorites.
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
${drink} removed.
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
<button class="order-btn-small" onclick="removeFavorite('${drink}')">
Remove
</button>
`;
list.appendChild(card);
});
}
/=========================================
PROFILE
=========================================/
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
}
else{
profile.level="Rookie";
}
saveProfile();
loadProfile();
}
/=========================================
REWARDS DASHBOARD
=========================================/
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
/=========================================
LEVELS
=========================================/
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
moveBasketball();
}
/=========================================
BASKETBALL ANIMATION
=========================================/
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
/=========================================
HISTORY POPUP
=========================================/
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
/=========================================
SHOT NOTIFICATION
=========================================/
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
/=========================================
EARN SHOTS
=========================================/
function addShots(amount){
shots += amount;
saveShots();
updateRewardDisplay();
moveBasketball();
showShotNotification(amount);
checkLevelUnlock();
}
/=========================================
COFFEE
=========================================/
function earnCoffeeShots(){
addShots(10);
addHistory(
"☕ Purchased Coffee",
10
);
}
/=========================================
NEW DRINK
=========================================/
function earnDrinkShots(){
addShots(25);
addHistory(
"🥤 Tried A New Drink",
25
);
}
/=========================================
DAILY CHECK IN
=========================================/
function dailyCheckIn(){
addShots(10);
addHistory(
"📅 Daily Check-In",
10
);
}
/=========================================
REFER FRIEND
=========================================/
function referFriend(){
addShots(50);
addHistory(
"👥 Referred A Friend",
50
);
}
/=========================================
BIRTHDAY BONUS
=========================================/
function birthdayReward(){
addShots(100);
addHistory(
"🎂 Birthday Reward",
100
);
}
/=========================================
HISTORY
=========================================/
let rewardHistory=[];
function addHistory(title,earned){
rewardHistory.unshift({
    title,
    earned,
    date: new Date().toLocaleString()
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
/=========================================
LEVELS
=========================================/
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
/=========================================
PAGE START
=========================================/
document.addEventListener(
"DOMContentLoaded",
()=>{
updateRewardDisplay();
checkLevelUnlock();
moveBasketball();
});
/=========================================
BUTTONS
=========================================/
document.addEventListener(
"click",
(event)=>{
if(event.target.id==="historyPopup"){
closeHistory();
}
});
/=========================================
KEYBOARD
=========================================/
document.addEventListener(
"keydown",
(event)=>{
if(event.key==="Escape"){
closeHistory();
}
});
/=========================================
END REWARDS
=========================================/
/=========================================
RENDER CART
=========================================/
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
<p><strong>$${item.price.toFixed(2)}</strong></p>
${
item.options && item.options.length
?
`<div class="cart-options">
${item.options.map(option=>`
<div>• ${option}</div>
`).join("")}
</div>`
:
""
}
${
item.instructions
?
<p><strong>Special Instructions:</strong><br>${item.instructions}</p>
:
""
}
<div class="qty-controls">
<button onclick="decreaseQty(${index})">
➖
</button>
<span>${item.qty}</span>
<button onclick="increaseQty(${index})">
➕
</button>
</div>
<button class="favorite-btn" onclick="removeItem(${index})">
Remove
</button>
`;
cartItems.appendChild(card);
cartItems.appendChild(card);
});
if(cartTotal){
cartTotal.textContent = "$" + getCartTotal();
}
}
/=========================================
QUANTITY
=========================================/
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
/=========================================
CHECKOUT
=========================================/
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
id: "JS-" + Date.now(),

date: new Date().toLocaleString(),
items: JSON.parse(JSON.stringify(cart)),

total: getCartTotal(),

totalItems: cart.reduce((sum,item)=>sum + item.qty,0),

rewardShots: cart.reduce((sum,item)=>sum + item.rewardShots,0),

pickupTime: getPickupTime()
});
localStorage.setItem(
"orderHistory",
JSON.stringify(history)
);
const receipt = history[history.length - 1];
cart = [];
saveCart();
renderCart();
showReceipt(receipt);
updateCartBadge();
launchConfetti();
showToast(
"Order Placed Successfully!"
);
}
/=========================================
ORDER HISTORY
=========================================/
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
${orders.length} Previous Orders Found
);
}
/=========================================
SETTINGS
=========================================/
function openSettings(){
showToast(
"Settings Coming Soon"
);
}
/=========================================
INSTALL PWA
=========================================/
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
/=========================================
BACK TO TOP
=========================================/
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
/=========================================
LOADING SCREEN
=========================================/
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
/=========================================
CONFETTI
=========================================/
function launchConfetti(){
if(typeof confetti === "function"){
confetti({
particleCount:175,
spread:90,
origin:{y:0.6}
});
}
}
/=========================================
SOUNDS
=========================================/
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
/=========================================
SEARCH
=========================================/
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
/=========================================
PROFILE EDITOR
=========================================/
function openProfileEditor(){
const editor=
document.getElementById(
"profileEditor"
);
if(editor){
editor.style.display="flex";
loadProfileForm();
}
}
function closeProfileEditor(){
const editor=
document.getElementById(
"profileEditor"
);
if(editor){
editor.style.display="none";
}
}
/=========================================
LOAD PROFILE FORM
=========================================/
function loadProfileForm(){
const first=
document.getElementById(
"editFirstName"
);
const last=
document.getElementById(
"editLastName"
);
const email=
document.getElementById(
"editEmail"
);
const phone=
document.getElementById(
"editPhone"
);
const birthday=
document.getElementById(
"editBirthday"
);
if(first){
first.value=
profile.firstName || "";
}
if(last){
last.value=
profile.lastName || "";
}
if(email){
email.value=
profile.email || "";
}
if(phone){
phone.value=
profile.phone || "";
}
if(birthday){
birthday.value=
profile.birthday || "";
}
}
/=========================================
SAVE PROFILE
=========================================/
function saveProfileInfo(){
profile.firstName=
document.getElementById(
"editFirstName"
).value;
profile.lastName=
document.getElementById(
"editLastName"
).value;
profile.email=
document.getElementById(
"editEmail"
).value;
profile.phone=
document.getElementById(
"editPhone"
).value;
profile.birthday=
document.getElementById(
"editBirthday"
).value;
profile.name=
(profile.firstName+" "+profile.lastName).trim();
saveProfile();
loadProfile();
closeProfileEditor();
showToast(
"Profile Saved ✅"
);
}
/=========================================
PROFILE PICTURE
=========================================/
const profileUpload=
document.getElementById(
"profileUpload"
);
if(profileUpload){
profileUpload.addEventListener(
"change",
function(event){
const file=
event.target.files[0];
if(!file) return;
const reader=
new FileReader();
reader.onload=
function(e){
profile.photo=
e.target.result;
saveProfile();
loadProfile();
showToast(
"Profile Picture Updated 📷"
);
};
reader.readAsDataURL(file);
});
}
/=========================================
LOAD PROFILE IMAGE
=========================================/
function loadProfile(){
const avatar=
document.getElementById(
"profileAvatar"
);
const name=
document.getElementById(
"profileName"
);
const email=
document.getElementById(
"profileEmail"
);
const level=
document.getElementById(
"playerRank"
);
if(avatar){
avatar.src=
profile.photo ||
"images/IMG_23_header_logo.png";
}
if(name){
name.textContent=
profile.name ||
"Coffee Fan";
}
if(email){
email.textContent=
profile.email ||
"guest@jumpshotcoffee.com";
}
if(level){
level.textContent=
profile.level ||
"Rookie";
}
}
/=========================================
PROFILE DASHBOARD
=========================================/
function updateProfileDashboard(){
const shotsCard=
document.getElementById(
"profileShots"
);
const dashShots=
document.getElementById(
"dashboardShots"
);
const dashLevel=
document.getElementById(
"dashboardLevel"
);
const favoriteCount=
document.getElementById(
"favoriteCount"
);
const dashboardFavorites=
document.getElementById(
"dashboardFavorites"
);
const orderCount=
document.getElementById(
"orderCount"
);
const dashboardOrders=
document.getElementById(
"dashboardOrders"
);
const totalSpent=
document.getElementById(
"totalSpent"
);
const birthday=
document.getElementById(
"birthdayDisplay"
);
const memberSince=
document.getElementById(
"memberSince"
);
const lastVisit=
document.getElementById(
"lastVisit"
);
/=========================================
SHOTS
=========================================/
if(shotsCard){
shotsCard.textContent=shots;
}
if(dashShots){
dashShots.textContent=shots;
}
/=========================================
LEVEL
=========================================/
if(dashLevel){
dashLevel.textContent=
profile.level;
}
/=========================================
FAVORITES
=========================================/
if(favoriteCount){
favoriteCount.textContent=
favorites.length;
}
if(dashboardFavorites){
dashboardFavorites.textContent=
favorites.length;
}
/=========================================
ORDERS
=========================================/
const orders=
JSON.parse(
localStorage.getItem(
"orderHistory"
)
)||[];
if(orderCount){
orderCount.textContent=
orders.length;
}
if(dashboardOrders){
dashboardOrders.textContent=
orders.length;
}
/=========================================
TOTAL SPENT
=========================================/
let total=0;
orders.forEach(order=>{
total+=
Number(order.total);
});
if(totalSpent){
totalSpent.textContent=
"$"+
total.toFixed(2);
}
/=========================================
LAST VISIT
=========================================/
if(lastVisit){
if(orders.length){
lastVisit.textContent=
orders[orders.length-1].date;
}else{
lastVisit.textContent=
"Never";
}
}
/=========================================
BIRTHDAY
=========================================/
if(birthday){
birthday.textContent=
profile.birthday ||
"Not Set";
}
/=========================================
MEMBER SINCE
=========================================/
if(memberSince){
memberSince.textContent=
"2026";
}
}
/=========================================
PROFILE STARTUP
=========================================/
function initializeProfile(){
loadProfile();
updateProfileDashboard();
updateProfileLevel();
}
/=========================================
PROFILE REFRESH
=========================================/
function refreshProfile(){
loadProfile();
updateProfileDashboard();
}
/=========================================
SAVE EVERYTHING
=========================================/
function saveEverything(){
saveProfile();
saveShots();
saveCart();
saveFavorites();
refreshProfile();
}
/=========================================
PROFILE POPUP
=========================================/
document.addEventListener(
"click",
(event)=>{
const editor=
document.getElementById(
"profileEditor"
);
if(
editor &&
event.target===editor
){
closeProfileEditor();
}
});
/=========================================
PROFILE SHORTCUTS
=========================================/
document.addEventListener(
"keydown",
(event)=>{
if(event.key==="Escape"){
closeProfileEditor();
}
});
/=========================================
PROFILE INITIALIZATION
=========================================/
document.addEventListener(
"DOMContentLoaded",
()=>{
initializeProfile();
});
/=========================================
PAGE INITIALIZATION
=========================================/
document.addEventListener(
"DOMContentLoaded",
()=>{
updateCartBadge();
updateRewardDisplay();
renderCart();
renderFavorites();
loadProfile();
});
/=========================================
SERVICE WORKER
=========================================/
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
/=========================================
ONLINE / OFFLINE STATUS
=========================================/
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
/=========================================
KEYBOARD SHORTCUTS
=========================================/
document.addEventListener(
"keydown",
(event)=>{
if(event.key==="Escape"){
closeHistory();
closeProfileEditor();
}
});
/=========================================
COPYRIGHT
=========================================/
console.log(
"JumpShot Coffee App Loaded Successfully"
);
/=========================================
END OF SCRIPT.JS
=========================================/
/====================================================
JUMPSHOT ORDERING ENGINE - PART 1
DO NOT REMOVE
====================================================/
// Current drink being customized
let currentDrink = null;
// Current page category
let currentCategory = "";
// Current calculated price
let currentPrice = 0;
// Quantity
let currentQuantity = 1;
/====================================================
GET ELEMENT SAFELY
====================================================/
function $(id) {
return document.getElementById(id);
}
/====================================================
FORMAT MONEY
====================================================/
function money(amount) {
return "$" + Number(amount).toFixed(2);
}
/====================================================
SET CURRENT DRINK
====================================================/
function setCurrentDrink(name, price, category) {
currentDrink = {
    name: name,
    basePrice: Number(price)
};

currentCategory = category;
currentPrice = Number(price);
currentQuantity = 1;

updateDisplayedPrice();
}
/====================================================
UPDATE DISPLAYED PRICE
====================================================/
function updateDisplayedPrice() {
const total = currentPrice * currentQuantity;

const ids = [

    "drinkPrice",
    "totalPrice",
    "price",
    "total"

];

ids.forEach(id => {

    const el = $(id);

    if (el) {
        el.textContent = money(total);

    }

});
}
/====================================================
SET QUANTITY
====================================================/
function setQuantity(qty) {
qty = Number(qty);

if (qty < 1) qty = 1;

currentQuantity = qty;

updateDisplayedPrice();
}
/====================================================
INCREASE QUANTITY
====================================================/
function increaseDrinkQuantity() {
currentQuantity++;

updateDisplayedPrice();
}
/====================================================
DECREASE QUANTITY
====================================================/
function decreaseDrinkQuantity() {
if (currentQuantity > 1) {

    currentQuantity--;

}

updateDisplayedPrice();
}
/====================================================
RESET DRINK
====================================================/
function resetDrinkBuilder() {
currentDrink = null;
currentCategory = "";
currentPrice = 0;
currentQuantity = 1;
}
/====================================================
END PART 1
====================================================/
/====================================================
JUMPSHOT ORDERING ENGINE - PART 2
PRICE CALCULATOR
====================================================/
function getSelectedValue(name){
const option = document.querySelector(
    'input[name="'+name+'"]:checked'
);

if(!option) return 0;
const value = Number(option.value);

if(isNaN(value)) return 0;

return value;
}
function getCheckboxTotal(name){
let total = 0;

document
.querySelectorAll(
    'input[name="'+name+'"]:checked'
)
.forEach(item=>{

    const value = Number(item.value);

    if(!isNaN(value)){
    total += value;

    }

});

return total;
}
function calculateCurrentPrice(){
if(!currentDrink) return;

let total = currentDrink.basePrice;

total += getSelectedValue("size");

total += getSelectedValue("espresso");

total += getSelectedValue("milk");
total += getSelectedValue("agara");

total += getSelectedValue("extraShot");

total += getCheckboxTotal("syrup");

total += getCheckboxTotal("sf");

total += getCheckboxTotal("sfSyrup");

total += getCheckboxTotal("sauce");

total += getCheckboxTotal("fruit");

total += getCheckboxTotal("fruitSyrup");

total += getCheckboxTotal("seasonal");

total += getCheckboxTotal("lotusShot");
total += getCheckboxTotal("whip");

total += getCheckboxTotal("extraAvocado");

currentPrice = total;

updateDisplayedPrice();
}
/====================================================
LISTEN FOR OPTION CHANGES
====================================================/
document.addEventListener("change",()=>{
calculateCurrentPrice();
});
/====================================================
END PART 2
====================================================/
/====================================================
JUMPSHOT ORDERING ENGINE - PART 3
ORDER SUMMARY + QUANTITY
====================================================/
function updateOrderSummary(){
const qtyBox = $("quantity");

if(qtyBox){

    currentQuantity = Number(qtyBox.value);

    if(currentQuantity < 1){

        currentQuantity = 1;

        qtyBox.value = 1;
   }

}

const summaryQty = $("summaryQuantity");

if(summaryQty){

    summaryQty.textContent = currentQuantity;

}

const summaryDrink = $("summaryDrink");

if(summaryDrink && currentDrink){

    summaryDrink.textContent = currentDrink.name;
}

const summaryShots = $("summaryShots");

if(summaryShots){

    summaryShots.textContent = currentQuantity * 100;

}

const total = currentPrice * currentQuantity;

const totalBox = $("orderTotal");

if(totalBox){

    totalBox.textContent = money(total);

}
}
/====================================================
PAGE QUANTITY
====================================================/
function increaseDrinkQuantity(){
const qty = $("quantity");

if(!qty) return;
qty.value = Number(qty.value) + 1;

updateOrderSummary();
}
function decreaseDrinkQuantity(){
const qty = $("quantity");

if(!qty) return;

let value = Number(qty.value);

if(value > 1){

    qty.value = value - 1;

}

updateOrderSummary();
}
/====================================================
WATCH QUANTITY
====================================================/
document.addEventListener("input",(event)=>{
if(event.target.id==="quantity"){

    updateOrderSummary();

}
});
/====================================================
KEEP SUMMARY UPDATED
====================================================/
document.addEventListener("change",()=>{
calculateCurrentPrice();

updateOrderSummary();
});
/====================================================
END PART 3
====================================================/
/====================================================
JUMPSHOT ORDERING ENGINE - PART 4
ADD CUSTOMIZED DRINK TO CART
====================================================/
function addCustomizedDrink(){
if(!currentDrink){

    showToast("No drink selected.");

    return;

}

const quantity =
    Number($("quantity")?.value || 1);

const specialInstructions =
   $("specialInstructions")?.value.trim() || "";

const totalPrice =
    Number((currentPrice * quantity).toFixed(2));

const rewardShots =
    quantity * 100;
cart.push({
name: currentDrink.name,

price: currentPrice,

qty: quantity,

rewardShots: rewardShots,

category: currentCategory,

options: getSelectedOptions(),

instructions: specialInstructions
});
shots += rewardShots;

saveCart();

saveShots();

updateCartBadge();

updateRewardDisplay();

showToast(

    currentDrink.name +
    " added to cart!"

);

if(typeof renderCart==="function"){

    renderCart();

}
}
/====================================================
END PART 4
====================================================/
/====================================================
JUMPSHOT ORDERING ENGINE - PART 5
AUTO PAGE SETUP
====================================================/
function initializeDrinkPage(){
const drinkName =
    $("summaryDrink");

const orderTotal =
    $("orderTotal");

if(!drinkName || !orderTotal){

    return;

}

let basePrice = parseFloat(

    orderTotal.textContent
        .replace("$","")

);

if(isNaN(basePrice)){

    basePrice = 0;

}

setCurrentDrink(

    drinkName.textContent.trim(),

    basePrice,

    document.title

);

calculateCurrentPrice();

updateOrderSummary();
}
/====================================================
START ORDER PAGE
====================================================/
document.addEventListener(
"DOMContentLoaded",

()=>{

    initializeDrinkPage();

}
);
/====================================================
END PART 5
====================================================/
/====================================================
JUMPSHOT ORDERING ENGINE - PART 6
COLLECT SELECTED OPTIONS
====================================================/
function getSelectedOptions(){
const selections = [];

document.querySelectorAll(
    ".option-card input:checked"
).forEach(input=>{

    const row = input.closest(".option-row");

    if(!row) return;

    const text = row.querySelector("span");

    if(text){

        selections.push(text.textContent.trim());
    }

});

return selections;
}
/====================================================
END PART 6
====================================================/
/====================================================
JUMPSHOT ORDERING ENGINE - PART 7
RECEIPT
====================================================/
function showReceipt(order){
let message = "";

message += "☕ JumpShot Coffee\n\n";
message += "Order ID:\n";
message += order.id + "\n\n";

message += "Date:\n";
message += order.date + "\n\n";

message += "Items:\n";

order.items.forEach(item=>{

    message += `${item.qty} × ${item.name}\n`;

    if(item.options){

        item.options.forEach(option=>{

            message += `   • ${option}\n`;

        });
    }

    if(item.instructions){

        message += `   Notes: ${item.instructions}\n`;

    }

    message += "\n";

});

message += `Total Items: ${order.totalItems}\n`;

message += `Reward Shots: ${order.rewardShots}\n`;

message += `Total: $${order.total.toFixed(2)}\n\n`;

message += "Thank you for choosing JumpShot Coffee!";

alert(message);
}
/====================================================
END PART 7
====================================================/
/====================================================
JUMPSHOT ORDERING ENGINE - PART 8
REORDER PREVIOUS ORDER
====================================================/
function reorderOrder(index){
if(!history[index]) return;

cart = JSON.parse(JSON.stringify(history[index].items));

saveCart();

renderCart();

alert("Previous order has been added to your cart!");
}
/====================================================
END PART 8
====================================================/
/====================================================
JUMPSHOT ORDERING ENGINE - PART 9
PICKUP TIME
====================================================/
function getPickupTime(){
const pickup = new Date();

pickup.setMinutes(
    pickup.getMinutes() + 10
);

return pickup.toLocaleTimeString([],{

    hour:"numeric",

    minute:"2-digit"
});
}
/====================================================
END PART 9
====================================================/
/====================================================
JUMPSHOT ORDERING ENGINE - PART 11
PICKUP TIME
====================================================/
function getPickupTime(){
const pickup = new Date();
pickup.setMinutes(
    pickup.getMinutes() + 10
);

return pickup.toLocaleTimeString([],{

    hour:"numeric",

    minute:"2-digit"

});
}
/====================================================
END PART 11
====================================================/
/=========================================
CONTACT PAGE
=========================================/
function sendMessage(){
showToast("Thank you! Your message has been received.");
}

