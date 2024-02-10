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

// Apply the transition on click for each block
for (const block of blocks) {
    block.addEventListener('click', function () {
        //Change the health for every new clicked block
        resilience = 2000;  
        setTimeout(()=>{
            miner.style.visibility = "hidden";
            setTimeout(()=>{
                minerSwingBack.style.visibility = "visible";
                minerSwingBack.style.display = "inline-block";
            }, 500)
        }, 800)  
        
        
        displayResilience();

        // Get the position of the clicked block
        /*const blockRect = block.getBoundingClientRect();
        
        // Move the miner to the position of the clicked block
        setTimeout(()=>{miner.style.top = blockRect.top - 50 + 'px';}, 500);
        miner.style.left = blockRect.left + 60 + 'px';*/

        //Move the miner to the chosen block
        moveSthToSth(miner, block);
        /*setTimeout(()=>{
            for(const swing of minerSwing){
                moveSthToSth(swing, miner);
            }
        }, 1500)*/
        moveSthToSth(minerSwingBack, block, 20, -20);
        moveSthToSth(minerSwingUp, block, -15, -20);
        moveSthToSth(minerSwingFront, block, -40, -20);
        /*
        setTimeout(()=>{
            moveSthToSth(minerSwingFront, miner);
            minerSwingFront.style.visibility = "hidden";
            console.log("moved")
        }, 6000)*/

        setTimeout(()=>{
            breakingContainer.style.visibility = "visible";}, 1000);
        chosenBlock = block;
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
    damage = Math.round(Number(left.slice(0, -2)) / Number(width.slice(0, -2)) * 1000);
    resilience -= damage;
    //Check if the health is below 0 
    if(resilience <= 0){
        resilience = 0;
        //Hide the window where the block is breaking and the block
        setTimeout(()=>{
            breakingContainer.style.visibility = "hidden";
            chosenBlock.style.visibility = "hidden";

            minerSwingBack.style.display = "none";
            setTimeout(()=>{      
                 miner.style.visibility = "visible";
        }, 500)
        }, 1000)
    }

    displayResilience();
  
  //Animation of the miner breaking the block
  minerBlockBreakingAnimation();

    //Let the arrow move again
    setTimeout(()=>{    
        meterStop.style.animationPlayState = "running";
}, 1000);
});

//Function to move some element to another element
function moveSthToSth(elementToBeMoved, elementTarget, inaccuracyX = 0, inaccuracyY = 0){
    const targetRect = elementTarget.getBoundingClientRect();
    setTimeout(()=>{elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';}, 500);
    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
}

//Shows block's resilience on the screen
function displayResilience(){
    resilienceHeading.innerHTML = resilienceHeading.innerHTML.slice(0, 11) + " " + resilience;
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



