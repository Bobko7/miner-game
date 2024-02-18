//Getting the miner and the blocks
const miner = document.querySelector(".miner-level-three");
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
//Getting the artifact container and its children elements
const artifactContainer = document.querySelector(".artifact-container");
const artifactImage = document.querySelector('.artifact-image');
const artifactName = document.querySelector('.artifact-name');
const artifactInfo = document.querySelector('.artifact-info');
//Get coins heading
const coinsHeading = document.querySelector(".coins");

//Remove this after finished: ease for debugging
localStorage.removeItem("blocksDataLevelThree");


//Index of the block selected by the user and the block
let indexOfChosenBlock;
let chosenBlock = blocks[0];

//Create a variable for the damage dealt to the block
let damage = 0;
//Variable to track the artifacts that are found
let currentArtifact = null;
//Use this variable to see in which direction the miner should move
let movingLeft = false;

//Set gameCoins 
if(!localStorage.getItem("coins")){
    localStorage.setItem("coins", 0);
}
//Show the coins in the game page
function showCoins(){
    coinsHeading.innerHTML = localStorage.getItem("coins");
}
showCoins();

//Set blocksData array if it's not already in localStorage
if (!localStorage.getItem('blocksDataLevelThree')) {
    // Initialize blocks array with default values
    blocksSecond.forEach((block) => {
        block.resilience = 8000;
        block.lowResilience = false;
    });
    // Save initial block data to localStorage
    saveBlockData();
} else {
    // Retrieve blocks data from localStorage
    let blocksData = localStorage.getItem('blocksDataLevelThree');
    // Parse JSON string back into blocks array
    blocksSecond = JSON.parse(blocksData);
}
//Function to get the blocksData
function getBlocksData(){
    return JSON.parse(localStorage.getItem("blocksDataLevelThree"));
}
// Function to save blocksData to localStorage
function saveBlockData() {
    // Serialize the blocks array into a JSON string
    let blocksData = JSON.stringify(blocksSecond);
    // Save the JSON string to localStorage
    localStorage.setItem('blocksDataLevelThree', blocksData);
}
//Function to save the dealt damage data to localStorage
function saveDamageData(){
    let blocksData = getBlocksData();
    if(!((blocksData[indexOfChosenBlock].resilience - damage) <= 0)){
        blocksData[indexOfChosenBlock].resilience -= damage;
    }
    else{
        blocksData[indexOfChosenBlock].resilience = 0;
    }
    // Save the JSON string to localStorage
    localStorage.setItem('blocksDataLevelThree', JSON.stringify(blocksData));
}

//Set max damage for the pickaxe
if (!localStorage.getItem("maxDamage")) {
    localStorage.setItem("maxDamage", 500);
}

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
//When the page is loaded display the respective images for the broken blocks
blocks.forEach((block, index)=>{
    if(resilienceBetween1000and1500.includes(index)){
        block.querySelector("img").src = 'images/broken-block-level-three1.png';
    }
    else if(resilienceBetween0and1000.includes(index)){
        block.querySelector("img").src = 'images/broken-block-level-three2.png';
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
            block.querySelector("img").src = 'images/broken-block-level-three1.png';
        }, 500)
    }
    else if(blockResilience < 1000){
        setTimeout(()=>{
            block.lowResilience = true;
            block.querySelector("img").src = 'images/broken-block-level-three2.png';
        }, 500)
    }
}
//Collapsing block animation
function blockCollapse(block){
    setTimeout(()=>{
        block.querySelector("img").src = 'images/broken-block-level-three3.png';
        setTimeout(()=>{
            block.querySelector("img").src = 'images/broken-block-level-three4.png';
            block.lowResilience = false;
        }, 300);
    }, 500);
}

// Apply the transition on click for each block
blocks.forEach((block, index) => {
    block.addEventListener('click', function () {
        console.log("A block is selected")
        //Disable pointerEvents when a block is cliked
        //This disables the user to go another block before the chosen one is broken
        for(let block of blocks){
            block.style.pointerEvents = "none";
        }
        //Save reference to the chosen block
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
    saveDamageData();
    if(!chosenBlock.lowResilience){
        checkResilience(chosenBlock);
    }
    //Check if the resilience is below 0 
    if(getBlocksData()[indexOfChosenBlock].resilience <= 0){
        //Set the resilience to 0
        JSON.parse(localStorage.getItem('blocksDataLevelTwo'))[indexOfChosenBlock].resilience = 0;
        blockCollapse(chosenBlock);
        setTimeout(()=>{
            //Hide the window with the meter and the chosen block
            setTimeout(()=>{
                checkSpecialBlocks();
                showArtifactInfo(currentArtifact);
            breakingContainer.style.visibility = "hidden";
            chosenBlock.style.visibility = "hidden";
            //The user gets 5 coins when he breaks a normal block
            localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 5);
            //Enable pointerEvents for the blocks
            for(let block of blocks){
                block.style.pointerEvents = "all";
            }
            showCoins();
        }, 800)
            //Hide the miner swing image and show the normal image
            setTimeout(()=>{      
                miner.style.visibility = "visible";
                minerSwingBack.style.display = "none";
        }, 1200)
        }, 200)
    }

    //Show the animation of the miner breaking the block
    setTimeout(()=>{  
        minerBlockBreakingAnimation();
    }, 10)

    //Display the changed value of resilience
    displayResilienceFancy();

    //Let the meter stop move again
    setTimeout(()=>{    
        meterStop.style.animationPlayState = "running";
}, 1000);
});}
catch(er){};

function displayResilienceFancy(){
    let interval = setInterval(()=>{
        if(Number(resilienceHeading.innerHTML.slice(11)) > getBlocksData()[indexOfChosenBlock].resilience)
        {
            console.log(resilienceHeading.innerHTML.slice(0, 11),  Number(resilienceHeading.innerHTML.slice(11)))
            resilienceHeading.innerHTML = resilienceHeading.innerHTML.slice(0, 11) + Number(resilienceHeading.innerHTML.slice(11) - 20)
        }
        else{
            resilienceHeading.innerHTML = resilienceHeading.innerHTML.slice(0, 11) + getBlocksdata()[indexOfchosenBlock].resilience;
            clearInterval(interval);
        }
}, 5)
}
//Function to move an element to another element
function moveElementToElement(elementToBeMoved, elementTarget, inaccuracyX = 0, inaccuracyY = 0){
    const targetRect = elementTarget.getBoundingClientRect();
    
    setTimeout(()=>{
        elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';
}, 500);
    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
}
//Function to move specifically the miner to a chosen block
function moveMinerToBlock(elementToBeMoved, elementTarget, inaccuracyX = 0, inaccuracyY = 0){
    //Setting the duration for the horizontal movement
    const targetRect = elementTarget.getBoundingClientRect();
    const distanceX = targetRect.left - elementToBeMoved.getBoundingClientRect().left;
    let duration = 1.5 + Math.abs(distanceX) / window.innerWidth * 1.5;
    elementToBeMoved.style.transition = `left ${duration}s ease-in-out, top 0.4s ease-in-out`;
    // Check the direction of movement
    if(distanceX > 0){
        if(Math.round(distanceX) == 72){
            movingLeft = null;
            duration = 0;
        }
        else{
        movingLeft = false;
        }
    }
    else if(distanceX < 0){
        movingLeft = true;
    }
    else{
        movingLeft = null;
    }
    setTimeout(()=>{
        elementToBeMoved.src = 'images/miner.png';
        //Media queries to set the size of the elementToBeMoved after it's moved horizontally
        if(window.innerWidth > 900){
            elementToBeMoved.style.width = '9em';
        }
        else if(window.innerWidth < 900 && window.innerWidth > 750){
            elementToBeMoved.style.width = '7.5em'
        }
        else if(window.innerWidth < 750 && window.innerWidth > 600){
            elementToBeMoved.style.width = '6em';
        }
        else if(window.innerWidth < 600){
            elementToBeMoved.style.width = '6.5em';
        }
         //elementToBeMoved.style.height = '180em';
        elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';
}, duration * 1000);
    //Check the movement direction to set the proper animations
    if(movingLeft)
    elementToBeMoved.src = 'images/miner-walking-left-fast.gif';
    else if(!movingLeft)
    elementToBeMoved.src = 'images/miner-walking-right-animation-fast.gif';
    //Media queries to set the set the size of elementToBeMoved during the walking animations
    if(window.innerWidth > 900){
        elementToBeMoved.style.width = '20em';
    }
    else if(window.innerWidth < 900 && window.innerWidth > 750){
        elementToBeMoved.style.width = '16em';
    }
    else if(window.innerWidth < 750 && window.innerWidth > 600){
        elementToBeMoved.style.width = '13em';
    }
    else if(window.innerWidth < 600){
        elementToBeMoved.style.width = '13em';
    }
    //elementToBeMoved.style.height = '200em';
    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
    elementToBeMoved.style.zIndex = "6";
}
    
//Function to show block's resilience on the screen
function displayResilience(){
    resilienceHeading.innerHTML = resilienceHeading.innerHTML.slice(0, 11) + getBlocksData()[indexOfChosenBlock].resilience;
}

//Function for the miner breaking the block animation
function minerBlockBreakingAnimation() {
        setTimeout(()=>{
            minerSwingBack.src = 'images/miner-swing-back.png';
            if(window.innerWidth > 900){
                minerSwingBack.style.width = '18em';
                minerSwingBack.style.height = '18.5em';
            }
            else if(window.innerWidth < 900 && window.innerWidth > 750){
                minerSwingBack.style.width = '15em';
                minerSwingBack.style.height = '15em';
            }
            else if(window.innerWidth < 750 && window.innerWidth > 600){
                minerSwingBack.style.width = '12em';
                minerSwingBack.style.height = '12em';
            }
            else if(window.innerWidth < 600){
                minerSwingBack.style.width = '12em';
                minerSwingBack.style.height = '12em';
            }
        minerSwingBack.style.transform = 'translate(-50%, -50%)';
        }, 1000)
        //Change the src of the image to be the one of block-breaking animation
        minerSwingBack.src = 'images/real-block-breaking.gif';
        //Media queries for the size of the block breaking animation
        if(window.innerWidth > 900){
            minerSwingBack.style.width = '20em';
        minerSwingBack.style.height = '20em';
        }
        else if(window.innerWidth < 900 && window.innerWidth > 750){
            console.log("innerWidth is below 900")
            minerSwingBack.style.width = '16em';
        minerSwingBack.style.height = '16em';
        }
        else if(window.innerWidth < 750 && window.innerWidth > 600){
            minerSwingBack.style.width = '13em';
            minerSwingBack.style.height = '12.5em';
        }
        else if(window.innerWidth < 600){
            minerSwingBack.style.width = '13.5em';
            minerSwingBack.style.height = '13em';
        }
        minerSwingBack.style.transform = 'translate(-60%, -53%)';
}

//Create new images for the artifacts and set them the css properties
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
//Check if the there are random indexes for the artifacts in the localStorage
//If not, create ones
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
//If there are random indexes for the artifacts, retrieve them
else{
    // Retrieve blocks data from localStorage
       artifactsIndexes = JSON.parse(localStorage.getItem("levelOneArtifactsIndexes"));
    }
//Function to create a random number between 0 and 17
function createRandomBetween0and17(){
        return Math.floor(Math.random() * 18);
}
//Function to hide the artifacts at the random places
function hideImagesRandom(){
    blocks[artifactsIndexes[0]].appendChild(img1);
    blocks[artifactsIndexes[1]].appendChild(img2);
    blocks[artifactsIndexes[2]].appendChild(img3);
}
hideImagesRandom();

function checkSpecialBlocks(){
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

//Function to check if an artifact is found and display information about it on the screen
function showArtifactInfo(artifact){
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

//After the artifact info window is display, make it disappear with any click on the screen
window.addEventListener("click", ()=>{
    artifactContainer.style.visibility = "hidden";
    currentArtifact = null;
})


