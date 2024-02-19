//Use gameCoins in order to buy store items
let gameCoins = localStorage.getItem("coins");

//Get some store.html elements
const coinsLabel = document.querySelector('.store-coins');
const buyItem1 = document.querySelector(".buy-item1");
const buyItem2 = document.querySelector(".buy-item2");
const buyItem3 = document.querySelector(".buy-item3");

coinsLabel.innerHTML = "" + gameCoins;

buyItem1.addEventListener("click", ()=>{
    if(gameCoins >= 100){
        gameCoins -= 100;
        localStorage.setItem("coins", localStorage.getItem("coins") - 100);
        coinsLabel.innerHTML = "" + gameCoins;
        localStorage.setItem("maxDamage", 800);
        buyItem1.innerHTML = "Bought";
        buyItem1.style.pointerEvents = "none";
        buyItem1.style.background = "lightgray";
    }
})

buyItem2.addEventListener("click", ()=>{
    if(gameCoins >= 200){
        gameCoins -= 200;
        localStorage.setItem("coins", localStorage.getItem("coins") - 200);
        coinsLabel.innerHTML = "" + gameCoins;
        localStorage.setItem("maxDamage", 1000);
        buyItem2.innerHTML = "Bought";
        buyItem2.style.pointerEvents = "none";
        buyItem2.style.background = "lightgray";
    }
})

buyItem3.addEventListener("click", ()=>{
    if(gameCoins >= 350){
        gameCoins -= 350;
        localStorage.setItem("coins", localStorage.getItem("coins") - 350);
        coinsLabel.innerHTML = "" + gameCoins;
        localStorage.setItem("maxDamage", 2000);
        buyItem3.innerHTML = "Bought";
        buyItem3.style.pointerEvents = "none";
        buyItem3.style.background = "lightgray";
    }
})
