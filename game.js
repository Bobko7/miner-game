const blocks = document.querySelectorAll(".block");
const minerContainer = document.querySelector(".miner-container");
const miner = document.querySelector(".miner");
const breakingContainer = document.querySelector(".breaking-container");
const breakingBlock = document.querySelector(".block-to-break");
const meter = document.querySelector(".meter");
const meterStop = document.querySelector(".meter-stop");
let resilienceHeading = document.querySelector(".resilience");
//Getting the images of miner swinging
const minerSwings = document.querySelectorAll(".miner-swing");
const minerSwingBack = document.querySelector(".miner-swing-back");
const minerSwingBackToUp = document.querySelector(".miner-swing-back-to-up");
const minerSwingUp = document.querySelector(".miner-swing-up");
const minerSwingUpToFront = document.querySelector(".miner-swing-up-to-front");
const minerSwingFront = document.querySelector(".miner-swing-front");
const minerSwing = document.querySelectorAll(".mine-swing");

const minerAnimation = document.querySelector(".miner-animation");
//Get coins heading
const coinsHeading = document.querySelector(".coins");
let damage = 0;
let resilience = 2000;
let chosenBlock = blocks[0];
let lowResilience = false;
let movingLeft = false;
let movingRight = false;
//Set gameCoins 
localStorage.setItem("gameCoins", 600);

//Set damage if it hasn't been set
if (!localStorage.getItem("damage")) {
    localStorage.setItem("damage", 500);
}
// Change if anything is bought in the store
if(localStorage.getItem("gameCoins") != localStorage.getItem("storeCoins")){
    localStorage.removeItem("gameCoins");
    localStorage.setItem("gameCoins", localStorage.getItem("storeCoins"));
}
console.log(localStorage.getItem("gameCoins"));

console.log(coinsHeading);
coinsHeading.innerHTML = coinsHeading.innerHTML.slice(0, 7) + localStorage.getItem("gameCoins");

//Add resilience property to every block
blocks.forEach((block)=>{
    block.resilience = 2000;
    block.lowResilience = false;
})

//Get the resilience of a chosen block
function getResilience(block) {
    return block.resilience;
}

function checkResilience(block){
    if(block.resilience < 1500 && block.resilience > 1000){
        setTimeout(()=>{
            block.querySelector("img").src = 'images/broken-block1.png';
        }, 500)
    }
    else if(block.resilience < 1000){
        setTimeout(()=>{
            lowResilience = true;
            block.querySelector("img").src = 'images/broken-block2.png';
        }, 500)
    }
}

function blockCollapse(block){
    setTimeout(()=>{
        block.querySelector("img").src = 'images/broken-block3.png';
        setTimeout(()=>{
            block.querySelector("img").src = 'images/broken-block4.png';
            lowResilience = false;
        }, 300);
    }, 500);
}

//Deal damage to a block
function dealDamage(block, damage){
    block.resilience -= damage;
}

// Apply the transition on click for each block
for (const block of blocks) {
    block.addEventListener('click', function () {
        chosenBlock = block;
        //Move the miner to the chosen block
        moveElementToElement(minerSwingBack, block, 20, -20);
        moveMinerToBlock(miner, block, 0, 0);
        //Move the miner images to the same block
        moveElementToElement(minerSwingBackToUp, block, 0, -20);
        moveElementToElement(minerSwingUp, block, -10, -20);
        moveElementToElement(minerSwingUpToFront, block, -30, -20);
        moveElementToElement(minerSwingFront, block, -40, -20);
        moveElementToElement(minerAnimation, block, -3, -25);

        //Hide the normal miner image and show the swing
        setTimeout(()=>{
            miner.style.visibility = "hidden";
            setTimeout(()=>{
                minerSwingBack.style.visibility = "visible";
                minerSwingBack.style.display = "inline-block";
            }, 500)
        }, 2800);

        //Renew the resilience for every new block
        //resilience = 2000;    
        //Display resilience on the screen
        displayResilience();

        //Make visible the resilience and the meter
        setTimeout(()=>{
            breakingContainer.style.visibility = "visible";}, 1000);
    });
}

//Stop the meter with a click
try{
meter.addEventListener("click", () => {
    // Pause the animation by setting the animation-play-state to "paused"
    meterStop.style.animationPlayState = "paused";

    //Get the width of the meter
    const meterStyle = window.getComputedStyle(meterStop.parentElement);
    const width = meterStyle.getPropertyValue("width");
    //Get the position of the stopper according to the meter
    const meterStopStyle = window.getComputedStyle(meterStop);
    const left = meterStopStyle.getPropertyValue("left");
    //Calculate and show the damage 
    //Formula: traveledDistance / wholeWidth * maxDamage; (Calculate the percentage that the stop has traveled and use this percentage as a measure for the damage)
    damage = Math.round(Number(left.slice(0, -2)) / Number(width.slice(0, -2)) * localStorage.getItem("damage"));
    //Add the damage
    dealDamage(chosenBlock, damage);
    if(!chosenBlock.lowResilience){
        checkResilience(chosenBlock);
    }
    //Check if the resilience is below 0 
    if(chosenBlock.resilience <= 0){
        chosenBlock.resilience = 0;
        blockCollapse(chosenBlock);
        setTimeout(()=>{
            //Hide the window with the meter and the chosen block
            setTimeout(()=>{breakingContainer.style.visibility = "hidden";
            chosenBlock.style.visibility = "hidden";
            //Hide the miner swing image and show the normal image
        }, 800)
            setTimeout(()=>{      
                miner.style.visibility = "visible";
                minerSwingBack.style.display = "none";
        }, 1200)
        }, 200)
    }

    //Animation of the miner breaking the block
    setTimeout(()=>{    minerBlockBreakingAnimation();
    }, 10)

    //Display the changed value of resilience
    displayResilience();

    //Let the meter stop move again
    setTimeout(()=>{    
        meterStop.style.animationPlayState = "running";
}, 1000);
});}
catch(er){};

//Function to move some element to another element
function moveElementToElement(elementToBeMoved, elementTarget, inaccuracyX = 0, inaccuracyY = 0){
    const targetRect = elementTarget.getBoundingClientRect();
    const elementRect = elementToBeMoved.getBoundingClientRect();
    /*const difference = elementRect.left - targetRect.left;
    console.log("difference"+difference);*/
    setTimeout(()=>{
        elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';
}, 500);
    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
}
/*
function moveMinerToBlock(elementToBeMoved, elementTarget, inaccuracyX = 0, inaccuracyY = 0) {
    const targetRect = elementTarget.getBoundingClientRect();
    const elementRect = elementToBeMoved.getBoundingClientRect();

    // Define image URLs
    const imageUrls = ['images/miner-walking-left1.png', 'images/miner-walking-left2.png'];

    // Initialize image index
    let imageIndex = 0;

    // Set initial image source
    elementToBeMoved.src = imageUrls[imageIndex];

    // Clear interval and set final position after 500ms
    setTimeout(() => {
        clearInterval(myInterval);
        elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';
    }, 500);

    // Change image source every 50ms
    let myInterval = setInterval(() => {
        // Toggle between image URLs
        imageIndex = (imageIndex + 1) % imageUrls.length;
        elementToBeMoved.src = imageUrls[imageIndex];
        console.log(imageUrls[imageIndex])
    }, 50);

    // Set target position
    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
}*/

function moveMinerToBlock(elementToBeMoved, elementTarget, inaccuracyX = 0, inaccuracyY = 0){
    const targetRect = elementTarget.getBoundingClientRect();
    const elementRect = elementToBeMoved.getBoundingClientRect();
    /*const difference = elementRect.left - targetRect.left;
    console.log("difference"+difference);*/
    setTimeout(()=>{
        elementToBeMoved.src = 'images/miner.png';
        elementToBeMoved.style.width = '90em';
        elementToBeMoved.style.height = '180em';
        elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';
}, 2000);

    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
    elementToBeMoved.src = 'images/miner-walk-left.gif';
elementToBeMoved.style.width = '200em';
elementToBeMoved.style.height = '200em';
}
/*function moveMinerToBlock(elementToBeMoved, elementTarget){
    const targetRect = elementTarget.getBoundingClientRect();
    const elementRect = elementToBeMoved.getBoundingClientRect();
    const difference = elementRect.left - targetRect.left;
    steps = Math.round(difference/20);
    step = 1;
    while(step < steps){
        setTimeout(()=>{
            if(    elementToBeMoved.src != 'images/miner-walking-left1.png'){
                elementToBeMoved.src = 'images/miner-walking-left1.png';
            }
            else{
                elementToBeMoved.src = 'images/mine-walking-left2.png';
            }
            step++;
        }, 300)
    }
}*/

//Function to show block's resilience on the screen
function displayResilience(){
    resilienceHeading.innerHTML = resilienceHeading.innerHTML.slice(0, 11) + " " + chosenBlock.resilience;
}

//Function for the miner breaking the block animation
function minerBlockBreakingAnimation() {
    
    minerSwingBack.style.visibility = "visible";
        console.log("The miner is swinging");
            setTimeout(() => {
                // Show the first swing back
                minerSwingBack.style.visibility = "visible";
                setTimeout(() => {
                    minerSwingBack.style.visibility = "hidden";
                    minerSwingBackToUp.style.visibility = "visible";
                    setTimeout(() => {
                        minerSwingBackToUp.style.visibility = "hidden";
                        minerSwingUp.style.visibility = "visible";
                        setTimeout(() => {
                            minerSwingUp.style.visibility = "hidden";
                            minerSwingUpToFront.style.visibility = "visible";
                            setTimeout(() => {
                                minerSwingUpToFront.style.visibility = "hidden";
                                minerSwingFront.style.visibility = "visible";
                                setTimeout(() => {
                                    minerSwingFront.style.visibility = "hidden";
                                    minerSwingUpToFront.style.visibility = "visible";
                                    setTimeout(() => {
                                        minerSwingUpToFront.style.visibility = "hidden";
                                        minerSwingUp.style.visibility = "visible";
                                        setTimeout(() => {
                                            minerSwingUp.style.visibility = "hidden";
                                            minerSwingBackToUp.style.visibility = "visible";
                                            setTimeout(() => {
                                                minerSwingBackToUp.style.visibility = "hidden";
                                                minerSwingBack.style.visibility = "visible";
                                            }, 70);
                                        }, 70);
                                    }, 70);
                                }, 250);
                            }, 70);
                        }, 70);
                    }, 70);
                }, 70);
            }, 70);
        }
