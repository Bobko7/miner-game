let coins = 200;
const listeners = [];

function getCoins() {
    return coins;
}

function setCoins(value) {
    coins = value;
    // Notify listeners that coins value has changed
    listeners.forEach(listener => listener(coins));
}

function addListener(listener) {
    listeners.push(listener);
}

export { getCoins, setCoins, addListener };
