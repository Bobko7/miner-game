//Set storeCoins to be equal to gameCoins in localStorage
localStorage.setItem("storeCoins", localStorage.getItem("gameCoins"));
//Use gameCoins in order to buy store items
let gameCoins = localStorage.getItem("storeCoins");

//Get some store.html elements
const coinsLabel = document.querySelector('.coins');
const buyItem1 = document.querySelector(".buy-item1");
const buyItem2 = document.querySelector(".buy-item2");
const buyItem3 = document.querySelector(".buy-item3");

coinsLabel.innerHTML = "Coins: " + gameCoins;


buyItem1.addEventListener("click", ()=>{
    if(gameCoins >= 100){
        gameCoins -= 100;
        localStorage.setItem("storeCoins", localStorage.getItem("storeCoins") - 100);
        coinsLabel.innerHTML = "Coins: " + gameCoins;
    }
})
