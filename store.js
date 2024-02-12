import {coins} from './game.js';
let gameCoins = coins;
console.log(coins);
const coinsLabel = document.querySelector('.coins');
const buyItem1 = document.querySelector(".buy-item1");
const buyItem2 = document.querySelector(".buy-item2");
const buyItem3 = document.querySelector(".buy-item3");

coinsLabel.innerHTML = "Coins: " + coins;


buyItem1.addEventListener("click", ()=>{
    if(gameCoins >= 100){
        gameCoins -= 100;
        coinsLabel.innerHTML = "Coins: " + gameCoins;

    }
})
localStorage.setItem('coins', gameCoins);

export {gameCoins};