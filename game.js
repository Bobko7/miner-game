const blocks = document.querySelectorAll(".block");
const minerContainer = document.querySelector(".miner-container");
const miner = document.querySelector(".miner");
const breakingContainer = document.querySelector(".breaking-container");
const breakingBlock = document.querySelector(".block-to-break");
const meter = document.querySelector(".meter");
const meterStop = document.querySelector(".meter-stop");
let resilienceHeading = document.querySelector(".resilience");
//Getting the images of miner swinging
const minerSwingBack = document.querySelector(".miner-swing-back");
const minerSwingUp = document.querySelector(".miner-swing-up");
const minerSwingFront = document.querySelector(".miner-swing-front");
const minerSwing = document.querySelectorAll(".mine-swing");
let damage = 0;
let resilience = 2000;
let chosenBlock = null;

/*
class Block{
    constructor(name){
        this.name = name;
    }
    resilience = 2000;
    getResilience(){
        return this.resilience;
    }
    dealDamage(dealtDamage){
        this.resilience -= dealtDamage;
    }
}
/*
//Make 
const blockObjects = [];
for(let i = 1; i <= 16; i++){
    const name = "block" + i;
    blockObjects.push(new Block(name));
}*/

//Add resilience property to every block
blocks.forEach((block)=>{
    block.resilience = 2000;
})

//Get the resilience of a chosen block
function getResilience(block) {
    return block.resilience;
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
        moveElementToElement(miner, block);
        //Move the miner images to the same block
        moveElementToElement(minerSwingBack, block, 20, -20);
        moveElementToElement(minerSwingUp, block, -15, -20);
        moveElementToElement(minerSwingFront, block, -40, -20);

        //Hide the normal miner image and show the swing
        setTimeout(()=>{
            miner.style.visibility = "hidden";
            setTimeout(()=>{
                minerSwingBack.style.visibility = "visible";
                minerSwingBack.style.display = "inline-block";
            }, 500)
        }, 800);

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
    damage = Math.round(Number(left.slice(0, -2)) / Number(width.slice(0, -2)) * 1000);
    //Add the damage
    dealDamage(chosenBlock, damage);
    //Check if the resilience is below 0 
    if(chosenBlock.resilience <= 0){
        chosenBlock.resilience = 0;
        setTimeout(()=>{
            //Hide the window with the meter and the chosen block
            breakingContainer.style.visibility = "hidden";
            chosenBlock.style.visibility = "hidden";
            //Hide the miner swing image and show the normal image
            minerSwingBack.style.display = "none";
            setTimeout(()=>{      
                miner.style.visibility = "visible";
        }, 500)
        }, 1000)
    }

    //Animation of the miner breaking the block
    minerBlockBreakingAnimation();

    //Display the changed value of resilience
    displayResilience();

    //Let the meter stop move again
    setTimeout(()=>{    
        meterStop.style.animationPlayState = "running";
}, 1000);
});

//Function to move some element to another element
function moveElementToElement(elementToBeMoved, elementTarget, inaccuracyX = 0, inaccuracyY = 0){
    const targetRect = elementTarget.getBoundingClientRect();
    setTimeout(()=>{elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';}, 500);
    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
}

//Function to show block's resilience on the screen
function displayResilience(){
    resilienceHeading.innerHTML = resilienceHeading.innerHTML.slice(0, 11) + " " + chosenBlock.resilience;
}

//Function for the miner breaking the block animation
function minerBlockBreakingAnimation() {
    // Show the first swing back
    minerSwingBack.style.visibility = "visible";
    setTimeout(() => {   
        // Hide the first swing back and show the first swing up
        minerSwingBack.style.visibility = "hidden";
        minerSwingUp.style.visibility = "visible";
        setTimeout(() => {   
            // Hide the first swing up and show the swing front
            minerSwingUp.style.visibility = "hidden";
            minerSwingFront.style.visibility = "visible";
            setTimeout(() => {
                // Hide the swing front and show the second swing up
                minerSwingFront.style.visibility = "hidden";
                minerSwingUp.style.visibility = "visible";
                setTimeout(() => {
                    // Hide the second swing up and show the second swing back
                    minerSwingUp.style.visibility = "hidden";
                    minerSwingBack.style.visibility = "visible";
                }, 300); 
            }, 500);
        }, 300);
    }, 300); 
}



