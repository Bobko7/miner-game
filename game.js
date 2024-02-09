const blocks = document.getElementsByClassName("block");
const miner = document.getElementsByClassName("miner")[0];
const breakingContainer = document.getElementsByClassName("breaking-container")[0];
const breakingBlock = document.getElementsByClassName("block-to-break")[0];
const meter = document.getElementsByClassName("meter")[0];
const meterStop = document.getElementsByClassName("meter-stop")[0];
let showHealth = document.getElementsByClassName("health")[0];
const pickaxe = document.getElementsByClassName("pickaxe")[0];
//Getting the images of miner swinging
const minerSwingBack = document.getElementsByClassName("miner-swing-back")[0];
const minerSwingUp = document.getElementsByClassName("miner-swing-up")[0];
const minerSwingFront = document.getElementsByClassName("miner-swing-front")[0];
let damage = 0;
let health = 2000;
let chosenBlock = null;

// Apply the transition on click for each block
for (const block of blocks) {
    block.addEventListener('click', function () {
        //Change the health for every new clicked block
        health = 2000;
        setTimeout(()=>{        
            minerSwingBack.style.visibility = "visible";
            minerSwingBack.style.display = "block";
        }, 1000)
        showHealth.innerHTML = showHealth.innerHTML.slice(0, 7) + " " + health;
        console.log(health);
        // Get the position of the clicked block
        const blockRect = block.getBoundingClientRect();
        
        // Move the miner to the position of the clicked block
        setTimeout(()=>{miner.style.top = blockRect.top - 50 + 'px';}, 500);
        miner.style.left = blockRect.left + 60 + 'px';
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
    health -= damage;
    //Check if the health is below 0 
    if(health <= 0){
        health = 0;
        //Hide the window where the block is breaking and the block
        setTimeout(()=>{
            breakingContainer.style.visibility = "hidden";
            chosenBlock.style.visibility = "hidden";
            minerSwingBack.style.display = "none";
        }, 1000)
    }
    showHealth.innerHTML = showHealth.innerHTML.slice(0, 7) + " " + health;
    //Move the axe to the cube and deal the damage
    pickaxe.style.transition = 'transform 0.5s ease-in-out';
  pickaxe.style.transformOrigin = 'center'; // Set the transform origin to center
  
  // Rotate the pickaxe to 90 degrees
  pickaxe.style.transform ="rotate(120deg)";
  //Animation of the miner breaking the block
  minerBreakingBlock();

  // Reset the rotation after 0.5 seconds
  setTimeout(() => {
    pickaxe.style.transform = 'rotate(0deg)'; // Reset rotation
  }, 500); // 500 milliseconds = 0.5 seconds
    //Let the arrow move again
    setTimeout(()=>{    
        meterStop.style.animationPlayState = "running";
}, 1000);
});

function minerBreakingBlock() {
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



