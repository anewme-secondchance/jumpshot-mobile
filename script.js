/*=========================================
JUMPSHOT COFFEE
SCRIPT.JS
=========================================*/

"use strict";

window.onerror = function(message, source, line, column, error) {
    console.error("SCRIPT ERROR:", message);
    console.error("FILE:", source);
    console.error("LINE:", line);
    console.error("COLUMN:", column);
    return false;
};

/*=========================================
LOCAL STORAGE KEYS
=========================================*/

const CART_KEY = "jumpshot_cart";
const FAVORITES_KEY = "jumpshot_favorites";
const SHOTS_KEY = "jumpshot_shots";
const PROFILE_KEY = "jumpshot_profile";
const HISTORY_KEY = "jumpshot_history";

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

let rewardHistory =
JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

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

function saveRewardHistory(){
    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(rewardHistory)
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

    showToast(`${name} added to cart!`);

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

    cart = [];

    saveCart();

    renderCart();

    updateCartBadge();

    showToast("Cart Cleared");

}

/*=========================================
CART BADGE
=========================================*/

function updateCartBadge(){

    const badges =
    document.querySelectorAll(".cart-count");

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
        `<p><strong>Special Instructions:</strong><br>${item.instructions}</p>`
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

        <button
            class="favorite-btn"
            onclick="removeItem(${index})">

            Remove

        </button>

        `;

        cartItems.appendChild(card);

    });

    if(cartTotal){

        cartTotal.textContent =
        "$" + getCartTotal();

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
REWARDS DASHBOARD
=========================================*/

function updateRewardDisplay(){

    const currentShots =
    document.getElementById("currentShots");

    const lifetimeShots =
    document.getElementById("lifetimeShots");

    const meterValue =
    document.getElementById("meterValue");

    const progress =
    document.getElementById("rewardProgress");

    const progressText =
    document.getElementById("progressText");

    const nextReward =
    document.getElementById("nextReward");

    if(currentShots){
        currentShots.textContent = shots;
    }

    if(lifetimeShots){
        lifetimeShots.textContent = shots;
    }

    if(meterValue){
        meterValue.textContent = shots;
    }

    /*=========================================
    LEVELS
    =========================================*/

    let goal = 200;
    let level = "Rookie";

    if(shots >= 1000){

        goal = 1500;
        level = "Legend";

    }
    else if(shots >= 500){

        goal = 1000;
        level = "MVP";

    }
    else if(shots >= 200){

        goal = 500;
        level = "All-Star";

    }

    const percent = Math.min(
        (shots / goal) * 100,
        100
    );

    if(progress){
        progress.style.width = percent + "%";
    }

    if(progressText){
        progressText.textContent =
        shots + " / " + goal;
    }

    if(nextReward){

        if(level === "Rookie"){

            nextReward.textContent =
            (goal - shots) +
            " SHOTS TO ALL-STAR";

        }
        else if(level === "All-Star"){

            nextReward.textContent =
            (goal - shots) +
            " SHOTS TO MVP";

        }
        else if(level === "MVP"){

            nextReward.textContent =
            (goal - shots) +
            " SHOTS TO LEGEND";

        }
        else{

            nextReward.textContent =
            "LEGEND UNLOCKED";

        }

    }

    updateProfileLevel();
    moveBasketball();

}

/*=========================================
BASKETBALL ANIMATION
=========================================*/

function moveBasketball(){

    const ball =
    document.getElementById("gameBall");

    if(!ball) return;

    ball.classList.remove("shoot");

    void ball.offsetWidth;

    ball.classList.add("shoot");

    setTimeout(()=>{

        ball.classList.remove("shoot");

    },1200);

}

/*=========================================
HISTORY POPUP
=========================================*/

function openHistory(){

    const popup =
    document.getElementById("historyPopup");

    if(popup){
        popup.style.display = "flex";
    }

}

function closeHistory(){

    const popup =
    document.getElementById("historyPopup");

    if(popup){
        popup.style.display = "none";
    }

}

/*=========================================
SHOT NOTIFICATION
=========================================*/

function showShotNotification(amount){

    const notice =
    document.getElementById("shotNotification");

    if(!notice) return;

    notice.innerHTML =
    "+" + amount + " SHOTS";

    notice.style.display = "block";

    setTimeout(()=>{

        notice.style.display = "none";

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

    addShots(05);

    addHistory(
        "☕ Purchased Coffee",
        05
    );

}

/*=========================================
NEW DRINK
=========================================*/

function earnDrinkShots(){

    addShots(15);

    addHistory(
        "🥤 Tried A New Drink",
        15
    );

}

/*=========================================
DAILY CHECK IN
=========================================*/

function dailyCheckIn(){

    addShots(05);

    addHistory(
        "📅 Daily Check-In",
        05
    );

}

/*=========================================
REFER FRIEND
=========================================*/

function referFriend(){

    addShots(20);

    addHistory(
        "👥 Referred A Friend",
        20
    );

}

/*=========================================
BIRTHDAY BONUS
=========================================*/

function birthdayReward(){

    addShots(50);

    addHistory(
        "🎂 Birthday Reward",
        50
    );

}

/*=========================================
HISTORY
=========================================*/

function addHistory(title, earned){

    rewardHistory.unshift({

        title,
        earned,
        date: new Date().toLocaleString()

    });

    saveRewardHistory();

    const list =
    document.getElementById("historyList");

    if(!list) return;

    list.innerHTML = "";

    rewardHistory.forEach(item=>{

        list.innerHTML += `

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

    const rookie =
    document.getElementById("rookieLevel");

    const allStar =
    document.getElementById("allStarLevel");

    const mvp =
    document.getElementById("mvpLevel");

    const legend =
    document.getElementById("legendLevel");

    [rookie, allStar, mvp, legend].forEach(level=>{

        if(level){

            level.classList.remove("active");

        }

    });

    let message = "🏀 Rookie";

    if(shots >= 1000){

        if(legend){

            legend.classList.add("active");

        }

        message = "🔥 Legend";

    }
    else if(shots >= 500){

        if(mvp){

            mvp.classList.add("active");

        }

        message = "🏆 MVP";

    }
    else if(shots >= 200){

        if(allStar){

            allStar.classList.add("active");

        }

        message = "⭐ All-Star";

    }
    else{

        if(rookie){

            rookie.classList.add("active");

        }

    }

    const unlock =
    document.getElementById("levelUnlocked");

    const text =
    document.getElementById("levelText");

    if(unlock && text){

        text.textContent = message;

        unlock.style.display = "block";

        setTimeout(()=>{

            unlock.style.display = "none";

        },2500);

    }

    launchConfetti();

}

/*=========================================
REWARDS STARTUP
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        updateRewardDisplay();

        checkLevelUnlock();

        moveBasketball();

    }
);

/*=========================================
HISTORY POPUP
=========================================*/

document.addEventListener(
    "click",
    (event)=>{

        if(event.target.id === "historyPopup"){

            closeHistory();

        }

    }
);

/*=========================================
KEYBOARD
=========================================*/

document.addEventListener(
    "keydown",
    (event)=>{

        if(event.key === "Escape"){

            closeHistory();

        }

    }
);

/*=========================================
END REWARDS
=========================================*/

/*=========================================
PROFILE EDITOR
=========================================*/

function openProfileEditor(){

    const editor =
    document.getElementById("profileEditor");

    if(editor){

        editor.style.display = "flex";

        loadProfileForm();

    }

}

function closeProfileEditor(){

    const editor =
    document.getElementById("profileEditor");

    if(editor){

        editor.style.display = "none";

    }

}

/*=========================================
LOAD PROFILE FORM
=========================================*/

function loadProfileForm(){

    const first =
    document.getElementById("editFirstName");

    const last =
    document.getElementById("editLastName");

    const email =
    document.getElementById("editEmail");

    const phone =
    document.getElementById("editPhone");

    const birthday =
    document.getElementById("editBirthday");

    if(first){
        first.value = profile.firstName || "";
    }

    if(last){
        last.value = profile.lastName || "";
    }

    if(email){
        email.value = profile.email || "";
    }

    if(phone){
        phone.value = profile.phone || "";
    }

    if(birthday){
        birthday.value = profile.birthday || "";
    }

}

/*=========================================
SAVE PROFILE
=========================================*/

function saveProfileInfo(){

    profile.firstName =
    document.getElementById("editFirstName").value;

    profile.lastName =
    document.getElementById("editLastName").value;

    profile.email =
    document.getElementById("editEmail").value;

    profile.phone =
    document.getElementById("editPhone").value;

    profile.birthday =
    document.getElementById("editBirthday").value;

    profile.name =
    (profile.firstName + " " + profile.lastName).trim();

    saveProfile();

    loadProfile();

    closeProfileEditor();

    showToast("Profile Saved ✅");

}

/*=========================================
PROFILE PICTURE
=========================================*/

const profileUpload =
document.getElementById("profileUpload");

if(profileUpload){

    profileUpload.addEventListener(
        "change",
        function(event){

            const file = event.target.files[0];

            if(!file) return;

            const reader = new FileReader();

            reader.onload = function(e){

                profile.photo = e.target.result;

                saveProfile();

                loadProfile();

                showToast(
                    "Profile Picture Updated 📷"
                );

            };

            reader.readAsDataURL(file);

        }
    );

}

/*=========================================
LOAD PROFILE IMAGE
=========================================*/

function loadProfile(){

    const avatar =
    document.getElementById("profileAvatar");

    const name =
    document.getElementById("profileName");

    const email =
    document.getElementById("profileEmail");

    const level =
    document.getElementById("playerRank");

    if(avatar){

        avatar.src =
        profile.photo ||
        "images/IMG_23_header_logo.png";

    }

    if(name){

        name.textContent =
        profile.name ||
        "Coffee Fan";

    }

    if(email){

        email.textContent =
        profile.email ||
        "guest@jumpshotcoffee.com";

    }

    if(level){

        level.textContent =
        profile.level ||
        "Rookie";

    }

}

/*=========================================
PROFILE DASHBOARD
=========================================*/

function updateProfileDashboard(){

    const shotsCard =
    document.getElementById("profileShots");

    const dashShots =
    document.getElementById("dashboardShots");

    const dashLevel =
    document.getElementById("dashboardLevel");

    const favoriteCount =
    document.getElementById("favoriteCount");

    const dashboardFavorites =
    document.getElementById("dashboardFavorites");

    const orderCount =
    document.getElementById("orderCount");

    const dashboardOrders =
    document.getElementById("dashboardOrders");

    const totalSpent =
    document.getElementById("totalSpent");

    const birthday =
    document.getElementById("birthdayDisplay");

    const memberSince =
    document.getElementById("memberSince");

    const lastVisit =
    document.getElementById("lastVisit");

    /*=========================================
    SHOTS
    =========================================*/

    if(shotsCard){
        shotsCard.textContent = shots;
    }

    if(dashShots){
        dashShots.textContent = shots;
    }

    /*=========================================
    LEVEL
    =========================================*/

    if(dashLevel){
        dashLevel.textContent = profile.level;
    }

    /*=========================================
    FAVORITES
    =========================================*/

    if(favoriteCount){
        favoriteCount.textContent = favorites.length;
    }

    if(dashboardFavorites){
        dashboardFavorites.textContent = favorites.length;
    }

    /*=========================================
    ORDERS
    =========================================*/

    const orders =
    JSON.parse(
        localStorage.getItem("orderHistory")
    ) || [];

    if(orderCount){
        orderCount.textContent = orders.length;
    }

    if(dashboardOrders){
        dashboardOrders.textContent = orders.length;
    }

    /*=========================================
    TOTAL SPENT
    =========================================*/

    let total = 0;

    orders.forEach(order=>{

        total += Number(order.total);

    });

    if(totalSpent){

        totalSpent.textContent =
        "$" + total.toFixed(2);

    }

    /*=========================================
    LAST VISIT
    =========================================*/

    if(lastVisit){

        if(orders.length){

            lastVisit.textContent =
            orders[orders.length-1].date;

        }else{

            lastVisit.textContent = "Never";

        }

    }

    /*=========================================
    BIRTHDAY
    =========================================*/

    if(birthday){

        birthday.textContent =
        profile.birthday || "Not Set";

    }

    /*=========================================
    MEMBER SINCE
    =========================================*/

    if(memberSince){

        memberSince.textContent = "2026";

    }

}

/*=========================================
PROFILE STARTUP
=========================================*/

function initializeProfile(){

    loadProfile();

    updateProfileDashboard();

    updateProfileLevel();

}

/*=========================================
PROFILE REFRESH
=========================================*/

function refreshProfile(){

    loadProfile();

    updateProfileDashboard();

}

/*=========================================
SAVE EVERYTHING
=========================================*/

function saveEverything(){

    saveProfile();

    saveShots();

    saveCart();

    saveFavorites();

    refreshProfile();

}

/*=========================================
PROFILE POPUP
=========================================*/

document.addEventListener(
    "click",
    (event)=>{

        const editor =
        document.getElementById("profileEditor");

        if(
            editor &&
            event.target === editor
        ){

            closeProfileEditor();

        }

    }
);

/*=========================================
PROFILE SHORTCUTS
=========================================*/

document.addEventListener(
    "keydown",
    (event)=>{

        if(event.key === "Escape"){

            closeProfileEditor();

        }

    }
);

/*=========================================
PROFILE INITIALIZATION
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        initializeProfile();

    }
);

/*=========================================
PAGE INITIALIZATION
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        updateCartBadge();

        updateRewardDisplay();

        renderCart();

        loadProfile();

    }
);

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

        }
    );

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

    }
);

window.addEventListener(
    "online",
    ()=>{

        showToast(
            "Back online!"
        );

    }
);

/*=========================================
KEYBOARD SHORTCUTS
=========================================*/

document.addEventListener(
    "keydown",
    (event)=>{

        if(event.key==="Escape"){

            closeHistory();

            closeProfileEditor();

        }

    }
);

/*=========================================
COPYRIGHT
=========================================*/

console.log(
    "JumpShot Coffee App Loaded Successfully"
);

/*====================================================
JUMPSHOT ORDERING ENGINE - PART 1
DO NOT REMOVE
====================================================*/

// Current drink being customized

let currentDrink = null;

// Current page category

let currentCategory = "";

// Current calculated price

let currentPrice = 0;

// Quantity

let currentQuantity = 1;

/*====================================================
GET ELEMENT SAFELY
====================================================*/

function $(id){

    return document.getElementById(id);

}

/*====================================================
FORMAT MONEY
====================================================*/

function money(amount){

    return "$" + Number(amount).toFixed(2);

}

/*====================================================
SET CURRENT DRINK
====================================================*/

function setCurrentDrink(name, price, category){

    currentDrink = {

        name: name,

        basePrice: Number(price)

    };

    currentCategory = category;

    currentPrice = Number(price);

    currentQuantity = 1;

    updateDisplayedPrice();

}

/*====================================================
UPDATE DISPLAYED PRICE
====================================================*/

function updateDisplayedPrice(){

    const total =
    currentPrice * currentQuantity;

    const ids = [

        "drinkPrice",
        "totalPrice",
        "price",
        "total"

    ];

    ids.forEach(id=>{

        const el = $(id);

        if(el){

            el.textContent = money(total);

        }

    });

}

/*====================================================
SET QUANTITY
====================================================*/

function setQuantity(qty){

    qty = Number(qty);

    if(qty < 1){

        qty = 1;

    }

    currentQuantity = qty;

    updateDisplayedPrice();

}

/*====================================================
INCREASE QUANTITY
====================================================*/

function increaseDrinkQuantity(){

    currentQuantity++;

    updateDisplayedPrice();

}

/*====================================================
DECREASE QUANTITY
====================================================*/

function decreaseDrinkQuantity(){

    if(currentQuantity > 1){

        currentQuantity--;

    }

    updateDisplayedPrice();

}

/*====================================================
RESET DRINK
====================================================*/

function resetDrinkBuilder(){

    currentDrink = null;

    currentCategory = "";

    currentPrice = 0;

    currentQuantity = 1;

}

/*====================================================
END PART 1
====================================================*/

/*====================================================
JUMPSHOT ORDERING ENGINE - PART 2
PRICE CALCULATOR
====================================================*/

function getSelectedValue(name){

    const option = document.querySelector(
        'input[name="' + name + '"]:checked'
    );

    if(!option){

        return 0;

    }

    const value = Number(option.value);

    if(isNaN(value)){

        return 0;

    }

    return value;

}

function getCheckboxTotal(name){

    let total = 0;

    document
    .querySelectorAll(
        'input[name="' + name + '"]:checked'
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

    if(!currentDrink){

        return;

    }

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

/*====================================================
LISTEN FOR OPTION CHANGES
====================================================*/

document.addEventListener(
    "change",
    ()=>{

        calculateCurrentPrice();

    }
);

/*====================================================
END PART 2
====================================================*/

/*====================================================
JUMPSHOT ORDERING ENGINE - PART 3
ORDER SUMMARY + QUANTITY
====================================================*/

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

/*====================================================
PAGE QUANTITY
====================================================*/

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

/*====================================================
WATCH QUANTITY
====================================================*/

document.addEventListener(
    "input",
    (event)=>{

        if(event.target.id === "quantity"){

            updateOrderSummary();

        }

    }
);

/*====================================================
KEEP SUMMARY UPDATED
====================================================*/

document.addEventListener(
    "change",
    ()=>{

        calculateCurrentPrice();

        updateOrderSummary();

    }
);

/*====================================================
END PART 3
====================================================*/

/*====================================================
JUMPSHOT ORDERING ENGINE - PART 4
ADD CUSTOMIZED DRINK TO CART
====================================================*/

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

    if(typeof renderCart === "function"){

        renderCart();

    }

}

/*====================================================
END PART 4
====================================================*/

/*====================================================
JUMPSHOT ORDERING ENGINE - PART 5
AUTO PAGE SETUP
====================================================*/

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

/*====================================================
START ORDER PAGE
====================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeDrinkPage();

    }

);

/*====================================================
END PART 5
====================================================*/

/*====================================================
JUMPSHOT ORDERING ENGINE - PART 6
COLLECT SELECTED OPTIONS
====================================================*/

function getSelectedOptions(){

    const selections = [];

    document.querySelectorAll(
        ".option-card input:checked"
    ).forEach(input=>{

        const row =
        input.closest(".option-row");

        if(!row) return;

        const text =
        row.querySelector("span");

        if(text){

            selections.push(
                text.textContent.trim()
            );

        }

    });

    return selections;

}

/*====================================================
END PART 6
====================================================*/

/*====================================================
JUMPSHOT ORDERING ENGINE - PART 7
RECEIPT
====================================================*/

function buildReceipt(){

    let html = "";

    cart.forEach(item=>{

        html += `
        <div class="receipt-item">

            <div class="receipt-name">
                ${item.name}
            </div>

            <div class="receipt-options">
                ${
                    item.options &&
                    item.options.length
                    ? item.options.join(", ")
                    : "No customizations"
                }
            </div>

            ${
                item.instructions
                ? `
                <div class="receipt-note">
                    Note: ${item.instructions}
                </div>
                `
                : ""
            }

            <div class="receipt-bottom">

                <span>
                    Qty: ${item.qty}
                </span>

                <span>
                    ${money(item.price * item.qty)}
                </span>

            </div>

        </div>
        `;

    });

    return html;

}

function openReceipt(){

    const container =
    $("receiptItems");

    if(container){

        container.innerHTML =
        buildReceipt();

    }

    const total =
    $("receiptTotal");

    if(total){

        total.textContent =
        money(getCartTotal());

    }

    const modal =
    $("receiptModal");

    if(modal){

        modal.style.display = "flex";

    }

}

function closeReceipt(){

    const modal =
    $("receiptModal");

    if(modal){

        modal.style.display = "none";

    }

}

/*====================================================
END PART 7
====================================================*/

/*====================================================
JUMPSHOT ORDERING ENGINE - PART 8
CHECKOUT / COMPLETE ORDER
====================================================*/

function checkout(){

    if(cart.length === 0){

        showToast("Your cart is empty.");

        return;

    }

    earnCoffeeShots();

    saveCart();

    openReceipt();

    showToast("Order placed successfully!");

}

function completeOrder(){

    cart = [];

    saveCart();

    updateCartBadge();

    if(typeof renderCart === "function"){

        renderCart();

    }

    closeReceipt();

    showToast("Thank you for your order!");

}

/*====================================================
RECEIPT BUTTONS
====================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    const closeBtn = $("closeReceipt");

    if(closeBtn){

        closeBtn.addEventListener(
            "click",
            closeReceipt
        );

    }

    const completeBtn = $("completeOrder");

    if(completeBtn){

        completeBtn.addEventListener(
            "click",
            completeOrder
        );

    }

});

/*====================================================
END PART 8
====================================================*/

/*====================================================
JUMPSHOT FAVORITES SYSTEM
PART 16
====================================================*/

const FAVORITES_KEY = "jumpshot_favorites";

let favorites =
JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

function saveFavorites(){

    localStorage.setItem(

        FAVORITES_KEY,

        JSON.stringify(favorites)

    );

}

function isFavorite(name){

    return favorites.includes(name);

}

function toggleFavorite(name){

    if(isFavorite(name)){

        favorites = favorites.filter(

            item => item !== name

        );

        showToast(

            name + " removed from favorites."

        );

    }else{

        favorites.push(name);

        showToast(

            name + " added to favorites."

        );

    }

    saveFavorites();

    renderFavorites();

}

function renderFavorites(){

    document
    .querySelectorAll("[data-favorite]")
    .forEach(button=>{

        const name =
        button.dataset.favorite;

        if(isFavorite(name)){

            button.classList.add("favorite-active");

        }else{

            button.classList.remove("favorite-active");

        }

    });

}

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        renderFavorites();

    }

);

/*====================================================
END PART 16
====================================================*/

/*====================================================
JUMPSHOT SEARCH / FILTER DRINKS
PART 17
====================================================*/

function searchDrinks(){

    const searchBox = document.getElementById("drinkSearch");

    if(!searchBox){

        return;

    }

    const searchText =
    searchBox.value.toLowerCase().trim();

    document
    .querySelectorAll(".drink-card")
    .forEach(card=>{

        const name =
        card.dataset.name || "";

        const category =
        card.dataset.category || "";

        const matches =

            name.toLowerCase().includes(searchText) ||

            category.toLowerCase().includes(searchText);

        card.style.display =
        matches ? "" : "none";

    });

}

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        const searchBox =
        document.getElementById("drinkSearch");

        if(searchBox){

            searchBox.addEventListener(

                "input",

                searchDrinks

            );

        }

    }

);

/*====================================================
END PART 17
====================================================*/

/*====================================================
JUMPSHOT PAGE NAVIGATION / UTILITIES
PART 18
====================================================*/

function goHome(){

    window.location.href = "index.html";

}

function goBack(){

    window.history.back();

}

function goToCart(){

    window.location.href = "cart.html";

}

function goToRewards(){

    window.location.href = "rewards.html";

}

function goToProfile(){

    window.location.href = "profile.html";

}

function goToMenu(){

    window.location.href = "menu.html";

}

function refreshPage(){

    window.location.reload();

}

function shareWebsite(){

    const url = window.location.href;

    if(navigator.share){

        navigator.share({

            title: document.title,

            text: "Check out JumpShot Coffee!",

            url: url

        }).catch(()=>{});

    }else{

        navigator.clipboard.writeText(url);

        showToast("Link copied!");

    }

}

/*====================================================
END PART 18
====================================================*/

/*====================================================
JUMPSHOT PWA / INSTALL FUNCTIONS
PART 19
====================================================*/

let deferredPrompt = null;

window.addEventListener(

    "beforeinstallprompt",

    (event)=>{

        event.preventDefault();

        deferredPrompt = event;

        const installButton =
        document.getElementById("installButton");

        if(installButton){

            installButton.style.display =
            "inline-flex";

        }

    }

);

async function installApp(){

    if(!deferredPrompt){

        showToast(

            "Install is not available yet."

        );

        return;

    }

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;

    const installButton =
    document.getElementById("installButton");

    if(installButton){

        installButton.style.display =
        "none";

    }

}

window.addEventListener(

    "appinstalled",

    ()=>{

        deferredPrompt = null;

        showToast(

            "JumpShot Coffee installed!"

        );

    }

);

/*====================================================
END PART 19
====================================================*/

/*====================================================
JUMPSHOT HELPER FUNCTIONS
PART 20
====================================================*/

function scrollToTop(){

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

function scrollToBottom(){

    window.scrollTo({

        top: document.body.scrollHeight,

        behavior: "smooth"

    });

}

function copyText(text){

    navigator.clipboard.writeText(text)

    .then(()=>{

        showToast("Copied!");

    })

    .catch(()=>{

        showToast("Unable to copy.");

    });

}

function formatDate(date = new Date()){

    return date.toLocaleDateString(

        "en-US",

        {

            month: "long",

            day: "numeric",

            year: "numeric"

        }

    );

}

function formatTime(date = new Date()){

    return date.toLocaleTimeString(

        "en-US",

        {

            hour: "numeric",

            minute: "2-digit"

        }

    );

}

function updateCurrentDate(){

    const dateElement = document.getElementById("currentDate");

    if(dateElement){

        dateElement.textContent = formatDate();

    }

}

function updateCurrentTime(){

    const timeElement = document.getElementById("currentTime");

    if(timeElement){

        timeElement.textContent = formatTime();

    }

}

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateCurrentDate();

        updateCurrentTime();

    }

);

/*====================================================
END PART 20
====================================================*/

/*====================================================
JUMPSHOT FINAL STARTUP
PART 21
====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    try{

        loadProfile();

    }catch(e){}

    try{

        updateRewardDisplay();

    }catch(e){}

    try{

        updateCartBadge();

    }catch(e){}

    try{

        renderCart();

    }catch(e){}

    try{

        renderFavorites();

    }catch(e){}

    try{

        initializeProfile();

    }catch(e){}

    try{

        initializeDrinkPage();

    }catch(e){}

    try{

        updateOrderSummary();

    }catch(e){}

    try{

        calculateCurrentPrice();

    }catch(e){}

    console.log("JumpShot Coffee initialized.");

});

window.addEventListener("pageshow", () => {

    try{

        updateCartBadge();

    }catch(e){}

    try{

        updateRewardDisplay();

    }catch(e){}

});

/*====================================================
END OF SCRIPT
====================================================*/

/*=========================================
HIDE LOADING SCREEN
=========================================*/

window.addEventListener("load", () => {

    const loadingScreen =
    document.getElementById("loadingScreen");

    if (!loadingScreen) return;

    loadingScreen.style.opacity = "0";

    setTimeout(() => {

        loadingScreen.style.display = "none";

    }, 500);

});
