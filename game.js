const blocks = document.getElementsByClassName("block");
const miner = document.getElementsByClassName("miner")[0];
const breakingContainer = document.getElementsByClassName("breaking-container")[0];
const breakingBlock = document.getElementsByClassName("block-to-break")[0];
const meter = document.getElementsByClassName("meter")[0];
const meterStop = document.getElementsByClassName("meter-stop")[0];
let showHealth = document.getElementsByClassName("health")[0];
const pickaxe = document.getElementsByClassName("pickaxe")[0];
let damage = 0;
let health = 2000;
let chosenBlock = null;

// Apply the transition on click for each block
for (const block of blocks) {
    block.addEventListener('click', function () {
        //Let the health be 2000 on every new block and display it
        health = 2000;
        showHealth.innerHTML = showHealth.innerHTML.slice(0, 7) + " " + health;
        console.log(health);
        // Get the position of the clicked block
        const blockRect = block.getBoundingClientRect();
        
        // Move the stickman to the position of the clicked block
        //This should be changed
        setTimeout(()=>{miner.style.top = blockRect.top - 50 + 'px';}, 500);
        miner.style.left = blockRect.left + 60 + 'px';
        setTimeout(()=>{
            breakingContainer.style.visibility = "visible";}, 1000);
        chosenBlock = block;
    });
}

//Stop the meter with a click and calculate how much damage to deal
meter.addEventListener("click", () => {
    // Pause the animation by setting the animation-play-state to "paused"
    meterStop.style.animationPlayState = "paused";
    const meterStyle = window.getComputedStyle(meterStop.parentElement);
    const width = meterStyle.getPropertyValue("width");
    const meterStopStyle = window.getComputedStyle(meterStop);
    const left = meterStopStyle.getPropertyValue("left");
    //Calculate and show the damage
    damage = Math.round(Number(left.slice(0, -2)) / Number(width.slice(0, -2)) * 1000);
    health -= damage;
    if(health <= 0){
        breakingContainer.style.visibility = "hidden";
        health = 0;
        chosenBlock.style.visibility = "hidden";
    }
    showHealth.innerHTML = showHealth.innerHTML.slice(0, 7) + " " + health;
    //Move the axe to the cube and deal the damage
    pickaxe.style.transition = 'transform 0.5s ease-in-out';
  pickaxe.style.transformOrigin = 'center'; // Set the transform origin to center
  
  // Rotate the pickaxe to 90 degrees
  pickaxe.style.transform ="rotate(120deg)";
  
  // Reset the rotation after 0.5 seconds
  setTimeout(() => {
    pickaxe.style.transform = 'rotate(0deg)'; // Reset rotation
  }, 500); // 500 milliseconds = 0.5 seconds
    //Let the arrow move again
    setTimeout(()=>{    
        meterStop.style.animationPlayState = "running";
}, 1000);
});

//After it is broken, the div disappears, the cube disappears