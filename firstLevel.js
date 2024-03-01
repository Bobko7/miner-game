//Retrieve the miner and the blocks
const miner = document.querySelector(".miner");
let blocks = document.querySelectorAll(".block");
let blocksSecond = [...blocks];
//Retrieve the container with the meter
const breakingContainer = document.querySelector(".breaking-container");
const meter = document.querySelector(".meter");
const meterStop = document.querySelector(".meter-stop");
let resilienceHeading = document.querySelector(".resilience");
//Retrieve the images of miner swinging
const minerSwingBack = document.querySelector(".miner-swing-back");
//Retrieve the artifact container and its children elements
const artifactContainer = document.querySelector(".artifact-container");
const artifactImage = document.querySelector('.artifact-image');
const artifactName = document.querySelector('.artifact-name');
const artifactInfo = document.querySelector('.artifact-info');

//Import from commonLevelsCode.js
import {showCoins,
    moveMinerToBlock,
    minerBlockBreakingAnimation,
    moveElementToElement,
    blockCollapse,
    checkLocalStorageForCoins,
    getBlocksData,
    checkLocalStorageForMaxDamage,
    saveDamageData,
    checkResilience,
    saveBlockData,
    displayResilience,
    displayResilienceFancy,
    checkMinerSwingBack,
    checkMiner} from './commonLevelsCode.js';

//Index of the block selected by the user and the block
let indexOfChosenBlock;
let chosenBlock = blocks[0];

//Create a variable for the damage dealt to the block
let damage = 0;
//Variable to track the artifacts that are found
let currentArtifact = null;

//Checks if there is a coins variable saved in localStorage, if not creates one
checkLocalStorageForCoins();
//Show the coins on the game page
showCoins();
//Check which miner skin to display
checkMiner(miner);

function createBlocksData(){
    if (!localStorage.getItem(`blocksDataLevelOne`)) {
        // Initialize blocks array with default values
        blocksSecond.forEach((block) => {
            block.resilience = 2000;
            block.lowResilience = false;
        });
        // Save initial block data to localStorage
        saveBlockData('blocksDataLevelOne', blocksSecond);
    } else {
        // Retrieve blocks data from localStorage
        blocksSecond = getBlocksData('blocksDataLevelOne');
    }
}
createBlocksData();

//Checks if there is a maxDamage variable saved in localStorage, if not creates one
checkLocalStorageForMaxDamage();

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
        block.querySelector("img").src = 'images/broken-block1.png';
    }
    else if(resilienceBetween0and1000.includes(index)){
        block.querySelector("img").src = 'images/broken-block2.png';
    }
    else if(resilience0.includes(index)){
        block.style.visibility = "hidden";
    }
})

// Apply the transition on click for each block
blocks.forEach((block, index) => {
    block.addEventListener('click', function () {
        //Disable pointerEvents when a block is cliked
        //This disables the user to go another block before the chosen one is broken
        for(let block of blocks){
            block.style.pointerEvents = "none";
        }
        //Save reference to the chosen block
        chosenBlock = block;
        indexOfChosenBlock = index;
        
        checkMinerSwingBack();
        //Move the miner to the chosen block
        moveMinerToBlock(miner, block, 0, 0);
        //Move the miner images to the same block
        moveElementToElement(minerSwingBack, block, 20, -20);

        //Hide the normal miner image and show the swing when the miner arrives at the location
        setTimeout(()=>{
            miner.style.visibility = "hidden";
            setTimeout(()=>{
                minerSwingBack.style.visibility = "visible";
                minerSwingBack.style.display = "inline-block";
            }, 10)
        }, 2500);

        //Display resilience on the screen
        displayResilience('blocksDataLevelOne', indexOfChosenBlock, resilienceHeading);

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
    //Save the dealt damage data to the local storage
    saveDamageData('blocksDataLevelOne', indexOfChosenBlock, damage);
    //Prevent user of abusing with damage
    meter.style.pointerEvents = "none";
    setTimeout(()=>{
        meter.style.pointerEvents = "all";
    }, 1000)
    if(!chosenBlock.lowResilience){
        //Function to check the resilience of the block and display the according image
        checkResilience(chosenBlock, 'blocksDataLevelOne', indexOfChosenBlock, 1500, 1000, 'images/broken-block1.png', 'images/broken-block2.png');
    }
    //Check if the resilience is below 0 
    if(getBlocksData('blocksDataLevelOne')[indexOfChosenBlock].resilience <= 0){
        //Set the resilience to 0
        getBlocksData('blocksDataLevelOne')[indexOfChosenBlock].resilience = 0;
        blockCollapse(chosenBlock, 'images/broken-block3.png', 'images/broken-block4.png');
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
                unlockLevelTwoAttempt();
        }, 1200)
        }, 200)
    }

    //Show the animation of the miner breaking the block
    setTimeout(()=>{  
        minerBlockBreakingAnimation();
    }, 10)

    //Display the changed value of resilience
    displayResilienceFancy('blocksDataLevelOne', indexOfChosenBlock);

    //Let the meter stop move again
    setTimeout(()=>{    
        meterStop.style.animationPlayState = "running";
}, 1000);
});}
catch(er){};

//Check if every single block is broken to unlock level two
function unlockLevelTwoAttempt(){
    let allHidden = true;
    for(let block of blocks){
        if(block.style.visibility != "hidden"){
            allHidden = false;
        }
    }
    if(allHidden){
        localStorage.setItem("levelOneCleared", true);
        window.location.href = 'index.html';
    }
}

//Create new images for the artifacts and set them custom CSS properties
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

//Check if the there are random indexes for the artifacts in the localStorage, if not, create ones
if (!localStorage.getItem('levelOneArtifactsIndexes')) {
// Initialize blocks array with default values
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
    artifactsIndexes = randomNums;
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

//Function to check if a block with an artifact has been broken
function checkSpecialBlocks(){
    Array.from(blocks).indexOf(chosenBlock) == artifactsIndexes[0]
        if(Array.from(blocks).indexOf(chosenBlock) == artifactsIndexes[0]){
        localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 30);
        currentArtifact = img1;
        }
        else if(Array.from(blocks).indexOf(chosenBlock) == artifactsIndexes[1]){
            localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 50);
            currentArtifact = img2;
        }
        else if(Array.from(blocks).indexOf(chosenBlock) == artifactsIndexes[2]){
            localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 70);
            currentArtifact = img3;
        }
    }

//Function to check if an artifact is found and display information about it on the screen
function showArtifactInfo(artifact){
    if(artifact == img1){
        artifactContainer.style.visibility = "visible";
        artifactImage.src = img1.src;
        artifactName.innerHTML = 'Silver coin of Alexander the great';
        artifactInfo.innerHTML = "Alexander the Great was an ancient Macedonian ruler and one of history's most successful military commanders, known for his conquests that extended the Macedonian Empire across three continents. He was tutored by Aristotle and became king of Macedonia at age 20, embarking on campaigns that resulted in the defeat of the Persian Empire and the spread of Hellenistic culture. His empire stretched from Greece to Egypt and into modern-day India before his death at the age of 32.";
    }
    else if(artifact == img2){
        artifactContainer.style.visibility = "visible";
        artifactImage.src = img2.src;
        artifactName.innerHTML = 'Gold coin of Julius Caesar';
        artifactInfo.innerHTML = "Julius Caesar was a Roman statesman, general, and dictator who played a critical role in the events that led to the demise of the Roman Republic and the rise of the Roman Empire. He was a brilliant military strategist, known for his conquest of Gaul and his decisive victory in the Civil War against Pompey. Caesar's assassination in 44 BC by a group of Roman senators led to a period of political instability and ultimately the end of the Roman Republic.";
        }
    else if(artifact == img3){
        artifactContainer.style.visibility = "visible";
        artifactImage.src = img3.src;
        artifactName.innerHTML = 'A pot from Ancient Greece';
        artifactInfo.innerHTML = "Greek pottery, renowned for its exquisite craftsmanship and intricate designs, served both practical and artistic purposes, offering insights into ancient Greek culture and mythology through depictions of gods, heroes, and everyday life. These ceramic vessels, often adorned with black-figure or red-figure painting techniques, were used for various functions including storage, transport, and ritual offerings.";
        }
    }

//After the artifact info window is display, make it disappear with any click on the screen
window.addEventListener("click", ()=>{
    artifactContainer.style.visibility = "hidden";
    currentArtifact = null;
})


