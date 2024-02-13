//Getting the miner and the blocks
const miner = document.querySelector(".miner");
const blocks = document.querySelectorAll(".block");
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

//Get coins heading
const coinsHeading = document.querySelector(".coins");
let damage = 0;
let resilience = 2000;
let chosenBlock = blocks[0];
//Use this variable to see in which direction the miner
let movingLeft = false;

//Set gameCoins 
if(!localStorage.getItem("coins")){
    localStorage.setItem("coins", 0);
}

//Set max damage for the pickaxe
if (!localStorage.getItem("damage")) {
    localStorage.setItem("damage", 500);
}

coinsHeading.innerHTML = coinsHeading.innerHTML.slice(0, 7) + localStorage.getItem("coins");

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
            block.lowResilience = true;
            block.querySelector("img").src = 'images/broken-block2.png';
        }, 500)
    }
}

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
}

// Apply the transition on click for each block
for (const block of blocks) {
    block.addEventListener('click', function () {
        chosenBlock = block;
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

        //Hide the normal miner image and show the swing
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
    
    setTimeout(()=>{
        elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';
}, 500);
    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
}

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
