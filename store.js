//Set storeCoins to be equal to gameCoins in localStorage
localStorage.setItem("storeCoins", localStorage.getItem("gameCoins"));
//Use gameCoins in order to buy store items
let gameCoins = localStorage.getItem("storeCoins");

//Get some store.html elements
const coinsLabel = document.querySelector('.store-coins');
const buyItem1 = document.querySelector(".buy-item1");
const buyItem2 = document.querySelector(".buy-item2");
const buyItem3 = document.querySelector(".buy-item3");

coinsLabel.innerHTML = "" + gameCoins;


buyItem1.addEventListener("click", ()=>{
    if(gameCoins >= 100){
        gameCoins -= 100;
        localStorage.setItem("storeCoins", localStorage.getItem("storeCoins") - 100);
        coinsLabel.innerHTML = "" + gameCoins;
        localStorage.setItem("damage", 800);
        buyItem1.innerHTML = "Bought";
        buyItem1.style.pointerEvents = "none";
        buyItem1.style.background = "lightgray";
    }
})

buyItem2.addEventListener("click", ()=>{
    if(gameCoins >= 150){
        gameCoins -= 150;
        localStorage.setItem("storeCoins", localStorage.getItem("storeCoins") - 150);
        coinsLabel.innerHTML = "" + gameCoins;
        localStorage.setItem("damage", 1000);
        buyItem2.innerHTML = "Bought";
        buyItem2.style.pointerEvents = "none";
        buyItem2.style.background = "lightgray";
    }
})

buyItem3.addEventListener("click", ()=>{
    if(gameCoins >= 250){
        gameCoins -= 250;
        localStorage.setItem("storeCoins", localStorage.getItem("storeCoins") - 250);
        coinsLabel.innerHTML = "" + gameCoins;
        localStorage.setItem("damage", 2000);
        buyItem3.innerHTML = "Bought";
        buyItem3.style.pointerEvents = "none";
        buyItem3.style.background = "lightgray";
    }
})
