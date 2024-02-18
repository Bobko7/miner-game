const coinsHeading = document.querySelector(".coins")

export function showCoins(){
    coinsHeading.innerHTML = localStorage.getItem("coins");
}