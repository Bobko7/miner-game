//Getting the miner and the blocks
const miner = document.querySelector(".miner");
let blocks = document.querySelectorAll(".block");
let blocksSecond = [...blocks];
//Getting the container with the meter
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
/*Code for later for fixing miner animation
const minerAnimation = document.querySelector(".miner-animation");*/
let indexOfChosenBlock;
//Get coins heading
const coinsHeading = document.querySelector(".coins");
let damage = 0;
let chosenBlock = blocks[0];
//Use this variable to see in which direction the miner should move
let movingLeft = false;
//Set gameCoins 
if(!localStorage.getItem("coins")){
    localStorage.setItem("coins", 0);
}

//Set max damage for the pickaxe
if (!localStorage.getItem("maxDamage")) {
    localStorage.setItem("maxDamage", 500);
}
//Show the coins in the game page
coinsHeading.innerHTML = coinsHeading.innerHTML.slice(0, 7) + localStorage.getItem("coins");
//Add resilience property to every block
/*blocks.forEach((block)=>{
    if(!block.resilience)
    block.resilience = 2000;
    block.lowResilience = false;
})*/


// Function to save block data to localStorage
function saveBlockData() {
    // Serialize the blocks array into a JSON string
    let blocksData = JSON.stringify(blocksSecond);
    
    // Save the JSON string to lo+calStorage
    localStorage.setItem('blocksData', blocksData);
    console.log(blocksData);
}
function saveDamageData(){
    let blockss = JSON.parse(localStorage.getItem("blocksData"));
    console.log((blockss[indexOfChosenBlock].resilience - damage) < 0 + 'Checking the if of saveDamageData')
    console.log("check again" + blockss[indexOfChosenBlock].resilience, damage)
    console.log('check again again ' + !((blockss[indexOfChosenBlock].resilience - damage) < 0))
    if(!((blockss[indexOfChosenBlock].resilience - damage) <= 0)){
        console.log("I'm in the if of saveDamageData");
    blockss[indexOfChosenBlock].resilience -= damage;
    }
else{
    console.log('Im in the else of saveDamageData')
    blockss[indexOfChosenBlock].resilience = 0;

}
    // Save the JSON string to localStorage
    localStorage.setItem('blocksData', JSON.stringify(blockss));
    console.log(localStorage.getItem('blocksData'));
}
// Assuming you have an array of blocks obtained from querySelectorAll
// Initialize blocks array if it's not already in localStorage
if (!localStorage.getItem('blocksData')) {
    // Initialize blocks array with default values
    blocksSecond.forEach((block) => {
        block.resilience = 2000;
        block.lowResilience = false;
    });
    console.log("I'm in the if statement");
    // Save initial block data to localStorage
    saveBlockData();
} else {
    // Retrieve blocks data from localStorage
    let blocksData = localStorage.getItem('blocksData');
    // Parse JSON string back into blocks array
    console.log("I'm in the else statement!");
    blocksSecond = JSON.parse(blocksData);
}
// Use the blocks array in your game logic...
const resilienceBetween1000and1500 = [];
const resilienceBetween0and1000 = [];
const resilience0 = [];

blocksSecond.forEach((block, index)=>{
    if(block.resilience > 1000 && block.resilience < 1500){
        resilienceBetween1000and1500.push(index);
    }
    else if(block.resilience < 1000 && block.resilience > 0){
        resilienceBetween0and1000.push(index);
    }
    else if(block.resilience == 0){
        resilience0.push(index);
    }
});
console.log(resilienceBetween1000and1500, resilienceBetween0and1000, resilience0);
blocks.forEach((block, index)=>{
    if(resilienceBetween1000and1500.includes(index)){
        block.querySelector("img").src = 'images/broken-block1.png';
    }
    else if(resilienceBetween0and1000.includes(index)){
        block.querySelector("img").src = 'images/broken-block2.png';
    }
    else if(resilience0.includes(index)){
        block.querySelector("img").src = '';
    }
})

//Check for the resilience and change the image accordingly
function checkResilience(block){
    console.log("I'm in check resilience function");
    console.log(block);
    if(JSON.parse(localStorage.getItem('blocksData'))[indexOfChosenBlock].resilience < 1500 && JSON.parse(localStorage.getItem('blocksData'))[indexOfChosenBlock].resilience > 1000){
        console.log("I'm in check resilience if")
        setTimeout(()=>{
            block.querySelector("img").src = 'images/broken-block1.png';
        }, 500)
    }
    else if(JSON.parse(localStorage.getItem('blocksData'))[indexOfChosenBlock].resilience < 1000){
        setTimeout(()=>{
            block.lowResilience = true;
            block.querySelector("img").src = 'images/broken-block2.png';
        }, 500)
    }
}

//Collapsing block animation
function blockCollapse(block){
    setTimeout(()=>{
        block.querySelector("img").src = 'images/broken-block3.png';
        setTimeout(()=>{
            block.querySelector("img").src = 'images/broken-block4.png';
            block.lowResilience = false;
        }, 300);
    }, 500);
}

//Deal damage to a block
function dealDamage(block, damage){
    block.resilience -= damage;
    //saveBlockData(); // Save updated block data to localStorage
}

// Apply the transition on click for each block
blocks.forEach((block, index) => {
    block.addEventListener('click', function () {
        chosenBlock = block;
        indexOfChosenBlock = index;
        console.log("index of chosen block" + indexOfChosenBlock);
        //Move the miner to the chosen block
        moveMinerToBlock(miner, block, 0, 0);
        //Move the miner images to the same block
        moveElementToElement(minerSwingBack, block, 20, -20);
        moveElementToElement(minerSwingBackToUp, block, 0, -20);
        moveElementToElement(minerSwingUp, block, -10, -20);
        moveElementToElement(minerSwingUpToFront, block, -30, -20);
        moveElementToElement(minerSwingFront, block, -40, -20);

        //This is ready code for later to fix the miner animation
        // moveElementToElement(minerAnimation, block, -3, -25);

        //Hide the normal miner image and show the swing when the miner arrives at the location
        setTimeout(()=>{
            miner.style.visibility = "hidden";
            setTimeout(()=>{
                minerSwingBack.style.visibility = "visible";
                minerSwingBack.style.display = "inline-block";
            }, 10)
        }, 2500);

        //Display resilience on the screen
        displayResilience();

        //Make visible the resilience and the meter
        setTimeout(()=>{
            breakingContainer.style.visibility = "visible";}, 1000);
    });
}) 
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
    damage = Math.round(Number(left.slice(0, -2)) / Number(width.slice(0, -2)) * localStorage.getItem("maxDamage"));
    //Add the damage
    dealDamage(chosenBlock, damage);
    saveDamageData();
    if(!chosenBlock.lowResilience){
        checkResilience(chosenBlock);
    }
    //Check if the resilience is below 0 
    if(JSON.parse(localStorage.getItem('blocksData'))[indexOfChosenBlock].resilience <= 0){
        JSON.parse(localStorage.getItem('blocksData'))[indexOfChosenBlock].resilience = 0;
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
    
    setTimeout(()=>{
        elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';
}, 500);
    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
}

//Function to move specifically the miner to a block
function moveMinerToBlock(elementToBeMoved, elementTarget, inaccuracyX = 0, inaccuracyY = 0){
    const targetRect = elementTarget.getBoundingClientRect();
    const elementRect = elementToBeMoved.getBoundingClientRect();

    const distanceX = targetRect.left - elementToBeMoved.getBoundingClientRect().left;
    console.log(distanceX);
    // Check the direction of movement
    if(distanceX > 0){
        movingLeft = false;
    }
    else if(distanceX < 0){
        movingLeft = true;
    }
    else{
        movingLeft = null;
    }
    
    setTimeout(()=>{
        elementToBeMoved.src = 'images/miner.png';
        elementToBeMoved.style.width = '90em';
        elementToBeMoved.style.height = '180em';
        elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';
}, 2000);

    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
    if(movingLeft)
    elementToBeMoved.src = 'images/miner-walk-left.gif';
    else if(!movingLeft)
    elementToBeMoved.src = 'images/miner-walk-right.gif';
    elementToBeMoved.style.width = '200em';
    elementToBeMoved.style.height = '200em';
}
    
//Function to show block's resilience on the screen
function displayResilience(){
    resilienceHeading.innerHTML = resilienceHeading.innerHTML.slice(0, 11) + JSON.parse(localStorage.getItem('blocksData'))[indexOfChosenBlock].resilience;
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
