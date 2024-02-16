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
/*const minerSwingBack = new Image();

        // Set the source of the image to the URL of the image you want to preload
        minerSwingBack.src = 'images/miner-swing-back.png';

        const minerSwingBackToUp = new Image();

        // Set the source of the image to the URL of the image you want to preload
        minerSwingBackToUp.src = 'images/miner-swing-back-to-up.png';

        const minerSwingUp = new Image();

        // Set the source of the image to the URL of the image you want to preload
        minerSwingUp.src = 'images/miner-swing-up.png';

        const minerSwingUpToFront= new Image();

        // Set the source of the image to the URL of the image you want to preload
        minerSwingUpToFront.src = 'images/miner-swing-front-to-up.png';
        const minerSwingFront = new Image();

        // Set the source of the image to the URL of the image you want to preload
        minerSwingFront.src = 'images/miner-swing-front.png';*/
/*Code for later for fixing miner animation
const minerAnimation = document.querySelector(".miner-animation");*/
//These are the artifacts of the first level
const artifactContainer = document.querySelector(".artifact-container");
const artifactImage = document.querySelector('.artifact-image');
const artifactName = document.querySelector('.artifact-name');
const artifactInfo = document.querySelector('.artifact-info');
//This is the index of the block the user chooses
let indexOfChosenBlock;
//Get coins heading
const coinsHeading = document.querySelector(".coins");
let damage = 0;
let chosenBlock = blocks[0];
let currentArtifact = null;
//Use this variable to see in which direction the miner should move
let movingLeft = false;

const minerSwingsContainer = document.querySelector(".miner-swings-container");

//try to preload some images
// Function to preload images
// Function to preload images
window.addEventListener("load", ()=>{
    minerBlockBreakingAnimation();
    setTimeout(()=>{
        minerSwingBack.style.visibility = "hidden";
        console.log("hide its");
        minerSwingsContainer.style.visibility = 'visible';
        minerSwingsContainer.style.overflow = 'visible';
        minerSwingsContainer.width = "30em";
    }, 3000)
})
//Set gameCoins 
localStorage.removeItem("blocksData");
if(!localStorage.getItem("coins")){
    localStorage.setItem("coins", 0);
}
//Set max damage for the pickaxe
if (!localStorage.getItem("maxDamage")) {
    localStorage.setItem("maxDamage", 500);
}
//Show the coins in the game page
function showCoins(){
    coinsHeading.innerHTML = localStorage.getItem("coins");
}
showCoins();
//Add resilience property to every block
/*blocks.forEach((block)=>{
    if(!block.resilience)
    block.resilience = 2000;
    block.lowResilience = false;
})*/


// Function to save blocks data to localStorage
function saveBlockData() {
    // Serialize the blocks array into a JSON string
    let blocksData = JSON.stringify(blocksSecond);
    // Save the JSON string to localStorage
    localStorage.setItem('blocksData', blocksData);
}

//When the damage to a block is dealt, save the data in the localStorage
function saveDamageData(){
    let blocksData = getBlocksData();
    if(!((blocksData[indexOfChosenBlock].resilience - damage) <= 0)){
        blocksData[indexOfChosenBlock].resilience -= damage;
    }
    else{
        blocksData[indexOfChosenBlock].resilience = 0;
    }
    // Save the JSON string to localStorage
    localStorage.setItem('blocksData', JSON.stringify(blocksData));
}
// Assuming you have an array of blocks obtained from querySelectorAll

// Initialize blocks array if it's not already in localStorage
if (!localStorage.getItem('blocksData')) {
    // Initialize blocks array with default values
    blocksSecond.forEach((block) => {
        block.resilience = 2000;
        block.lowResilience = false;
    });
    // Save initial block data to localStorage
    saveBlockData();
} else {
    // Retrieve blocks data from localStorage
    let blocksData = localStorage.getItem('blocksData');
    // Parse JSON string back into blocks array
    blocksSecond = JSON.parse(blocksData);
}
// Use the blocks array in your game logic...

//When the page is loaded check if there are broken blocks from the last session
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

//Get the block data
function getBlocksData(){
    return JSON.parse(localStorage.getItem("blocksData"));
}
//When the page is loaded display the respective images for the broken blocks
blocks.forEach((block, index)=>{
    if(resilienceBetween1000and1500.includes(index)){
        block.querySelector("img").src = 'images/broken-block1.png';
    }
    else if(resilienceBetween0and1000.includes(index)){
        block.querySelector("img").src = 'images/broken-block2.png';
    }
    else if(resilience0.includes(index)){
        block.style.visibility = "hidden";
    }
})

//Check for the resilience and change the image accordingly
function checkResilience(block){
    let blockResilience = getBlocksData()[indexOfChosenBlock].resilience;
    if(blockResilience < 1500 && blockResilience > 1000){
        setTimeout(()=>{
            block.querySelector("img").src = 'images/broken-block1.png';
        }, 500)
    }
    else if(blockResilience < 1000){
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

// Apply the transition on click for each block
blocks.forEach((block, index) => {
    block.addEventListener('click', function () {
        for(let block of blocks){
            block.style.pointerEvents = "none";
        }
        chosenBlock = block;
        indexOfChosenBlock = index;
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
    //Deal the damage
    console.log(currentArtifact + "this is the current artifact of the hit")
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
            setTimeout(()=>{
                checkSpecialBlocks();
                showArtifactInfo(currentArtifact);
            breakingContainer.style.visibility = "hidden";
            chosenBlock.style.visibility = "hidden";
            for(let block of blocks){
                //Unable pointer events for the blocks
                block.style.pointerEvents = "all";
            }
            showCoins();
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
    const distanceX = targetRect.left - elementToBeMoved.getBoundingClientRect().left;
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
    if(movingLeft)
    elementToBeMoved.src = 'images/miner-walking-left-fast.gif';
    else if(!movingLeft)
    elementToBeMoved.src = 'images/miner-walking-right-animation-fast.gif';
    elementToBeMoved.style.width = '200em';
    elementToBeMoved.style.height = '200em';
    console.log("start moving");
    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
    elementToBeMoved.style.zIndex = "6";
    
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

        let firstSpecialBlock, secondSpecialBlock, thirdSpecialBlock;
        const img1 = document.createElement("img");
        img1.src = 'images/coin-alexander-the-great.png';
        img1.style.zIndex = "-1";
        img1.style.position = "absolute";
        const img2 = document.createElement("img");
        img2.src = 'images/coin-julius-caesar.png';
        img2.style.position = "absolute";
        img2.style.zIndex = "-1";
        const img3 = document.createElement("img");
        img3.src = 'images/ancient-pot.png';
        img3.style.position = "absolute";
        img3.style.zIndex = "-1";
        img3.style.transform = "scale(0.7)";
        let artifactsIndexes = [];
        if (!localStorage.getItem('levelOneArtifactsIndexes')) {
            // Initialize blocks array with default values
            //create and save them in local storage
            let randomNums = [];
            let random = createRandomBetween0and17();
            let secondRandom = false;
            let thirdRandom = false;
            randomNums.push(random);
            while(!secondRandom){
                random = createRandomBetween0and17();
                if(randomNums.includes(random)){
                    continue;
                }
                else{
                    secondRandom = true;
                    randomNums.push(random);
                }
            }
            while(!thirdRandom){
                random = createRandomBetween0and17();
                if(randomNums.includes(random)){
                    continue;
                }
                else{
                    thirdRandom = true;
                    randomNums.push(random);
                }
            }
            localStorage.setItem("levelOneArtifactsIndexes", JSON.stringify(randomNums));
        }
        else{
            // Retrieve blocks data from localStorage
            artifactsIndexes = JSON.parse(localStorage.getItem("levelOneArtifactsIndexes"));
        }
        blocks[10].appendChild(img1);
        function createRandomBetween0and17(){
            return Math.floor(Math.random() * 18);
        }
        console.log(artifactsIndexes[0], artifactsIndexes[1], artifactsIndexes[2] + ' these are the indexes')
        function hideImagesRandom(){
            blocks[artifactsIndexes[0]].appendChild(img1);
            blocks[artifactsIndexes[1]].appendChild(img2);
            blocks[artifactsIndexes[2]].appendChild(img3);
            /*
            let randomNums = [];
            let random = createRandomBetween0and17();
            firstRandomNum = random;
            console.log("First random: " + random);
            firstSpecialBlock = blocks[random];
            let secondRandom = false;
            let thirdRandom = false;
            randomNums.push(random);
            blocks[random].appendChild(img1);
            while(!secondRandom){
                random = createRandomBetween0and17();
                if(randomNums.includes(random)){
                    continue;
                }
                else{
                    blocks[random].appendChild(img2);
                    console.log("Second random: " + random);
                    secondRandom = true;
                    secondSpecialBlock = blocks[random];
                    secondRandomNum = random;
                }
            }
            while(!thirdRandom){
                random = createRandomBetween0and17();
                if(randomNums.includes(random)){
                    continue;
                }
                else{
                    blocks[random].appendChild(img3);
                    console.log("Third random: " + random);
                    thirdSpecialBlock = blocks[random];
                    thirdRandom = true;
                    thirdRandomNum = random;
                }
            }*/
        }
        hideImagesRandom();

        function checkSpecialBlocks(){
            console.log("I'm in checkSpecialBlocks");
            Array.from(blocks).indexOf(chosenBlock) == artifactsIndexes[0]
            if(Array.from(blocks).indexOf(chosenBlock) == artifactsIndexes[0]){
                console.log(Number(localStorage.getItem("coins")) + 30);
                localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 30);
                currentArtifact = img1;
                console.log(currentArtifact);
            }
            else if(Array.from(blocks).indexOf(chosenBlock) == artifactsIndexes[1]){
                console.log(typeof Number(localStorage.getItem("coins")) + 50);
                localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 50);
                currentArtifact = img2;
            }
            else if(Array.from(blocks).indexOf(chosenBlock) == artifactsIndexes[2]){
                console.log(typeof Number(localStorage.getItem("coins")) + 70);
                localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 70);
                currentArtifact = img3;
            }
        }

        function showArtifactInfo(artifact){
            console.log("I'n in show artifact info");
            console.log("This is the artifact" + artifact);
            if(artifact == img1){
                artifactContainer.style.visibility = "visible";
                artifactImage.src = img1.src;
                artifactName.innerHTML = 'Golden coin of Alexander the great';
                artifactInfo.innerHTML = "This is a coin of great emperor of Ancient Greece Alexander the Great!";
            }
            else if(artifact == img2){
                artifactContainer.style.visibility = "visible";
                artifactImage.src = img2.src;
                artifactName.innerHTML = 'Silver coin of Julius Caesar';
                artifactInfo.innerHTML = "This is a coin of great emperor Julius Caesar!";
            }
            else if(artifact == img3){
                artifactContainer.style.visibility = "visible";
                artifactImage.src = img3.src;
                artifactName.innerHTML = 'The pot of Mesungii Harasfati';
                artifactInfo.innerHTML = "This is the pot from which Mesungii Harsfati drank his wine!";
            }
        }
        
window.addEventListener("click", ()=>{
    artifactContainer.style.visibility = "hidden";
    currentArtifact = null;
})


