//Retrieve the miner and the blocks
const miner = document.querySelector(".miner-level-two");
let blocks = document.querySelectorAll(".block");
let blocksSecond = [...blocks];
//Retrieve the container with the meter
const breakingContainer = document.querySelector(".breaking-container");
const meter = document.querySelector(".meter");
const meterStop = document.querySelector(".meter-stop");
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
    checkForBrokenBlocks,
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
    checkMiner,
    createArtifact,
    createRandomBetween0and17,
    hideImagesRandom
} from './commonLevelsCode.js';

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

//Set blocksData array if it's not already in localStorage
function createBlocksData(){
    if (!localStorage.getItem(`blocksDataLevelTwo`)) {
        // Initialize blocks array with default values
        blocksSecond.forEach((block) => {
            block.resilience = 4000;
            block.lowResilience = false;
        });
        // Save initial block data to localStorage
        saveBlockData('blocksDataLevelTwo', blocksSecond);
    } else {
        // Retrieve blocks data from localStorage
        
        blocksSecond = getBlocksData('blocksDataLevelTwo');
    }
}
createBlocksData();

//Checks if there is a maxDamage variable saved in localStorage, if not creates one
checkLocalStorageForMaxDamage();

//When the page is loaded check if there are broken blocks from the last session
checkForBrokenBlocks(blocksSecond, blocks, 2500, 1500, 'images/broken-block-level-two-1.png', 'images/broken-block-level-two-2.png');

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
        displayResilience('blocksDataLevelTwo', indexOfChosenBlock);

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
    saveDamageData('blocksDataLevelTwo', indexOfChosenBlock, damage);
    //Prevent user of abusing with damage
    meter.style.pointerEvents = "none";
    setTimeout(()=>{
        meter.style.pointerEvents = "all";
    }, 1000)
    if(!chosenBlock.lowResilience){
        //Function to check the resilience of the block and display the according image
        checkResilience(chosenBlock, 'blocksDataLevelTwo', indexOfChosenBlock, 2500, 1500, 'images/broken-block-level-two-1.png', 'images/broken-block-level-two-2.png');
    }
    //Check if the resilience is below 0 
    if(getBlocksData('blocksDataLevelTwo')[indexOfChosenBlock].resilience <= 0){
        //Set the resilience to 0
        getBlocksData('blocksDataLevelTwo')[indexOfChosenBlock].resilience = 0;
        blockCollapse(chosenBlock, 'images/broken-block-level-two-3.png', 'images/broken-block-level-two-4.png');
        setTimeout(()=>{
            //Hide the window with the meter and the chosen block
            setTimeout(()=>{
                checkSpecialBlocks();
                showArtifactInfo(currentArtifact);
            breakingContainer.style.visibility = "hidden";
            chosenBlock.style.visibility = "hidden";
            //The user gets 5 coins when he breaks a normal block
            localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 10);
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
                unlockLevelThreeAttempt();
        }, 1200)
        }, 200)
    }

    //Show the animation of the miner breaking the block
    setTimeout(()=>{  
        minerBlockBreakingAnimation();
    }, 10)

    //Display the changed value of resilience
    displayResilienceFancy('blocksDataLevelTwo', indexOfChosenBlock);

    //Let the meter stop move again
    setTimeout(()=>{    
        meterStop.style.animationPlayState = "running";
}, 1000);
});}
catch(er){};

//Check if every single block is broken to unlock level three
function unlockLevelThreeAttempt(){
    let allHidden = true;
    for(let block of blocks){
        if(block.style.visibility != "hidden"){
            allHidden = false;
        }
    }
    if(allHidden){
        localStorage.setItem("levelTwoCleared", true);
        window.location.href = 'index.html';
    }
}

//Create new images for the artifacts and set them custom CSS properties
const img1 = createArtifact("images/scarab-amulet.png", -1, "absolute", 0.7);
const img2 = createArtifact("images/funerary-mask.png", -1, "absolute", 0.7);
const img3 = createArtifact("images/egyptyan-canopic-jar.png", -1, "absolute", 0.7);

let artifactsIndexes = [];
//Check if the there are random indexes for the artifacts in the localStorage, if not, create ones
if (!localStorage.getItem('levelTwoArtifactsIndexes')) {
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
    localStorage.setItem("levelTwoArtifactsIndexes", JSON.stringify(randomNums));
    artifactsIndexes = randomNums;
}
//If there are random indexes for the artifacts, retrieve them
else{
    // Retrieve blocks data from localStorage
    artifactsIndexes = JSON.parse(localStorage.getItem("levelTwoArtifactsIndexes"));
}

//Function to hide the artifacts at the random places
hideImagesRandom(blocks, artifactsIndexes, img1, img2, img3);

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
        artifactName.innerHTML = 'Egyptyan Scarab Amulet';
        artifactInfo.innerHTML = "Egyptian scarab amulets were small artifacts shaped like scarab beetles, representing the cycle of rebirth and regeneration in ancient Egyptian belief. They were often made of materials like stone, faience, or precious metals and were worn as jewelry or placed in tombs to provide protection and ensure a successful journey to the afterlife. These amulets were considered powerful symbols of protection and good fortune in Egyptian society.";
    }
    else if(artifact == img2){
        artifactContainer.style.visibility = "visible";
        artifactImage.src = img2.src;
        artifactName.innerHTML = 'Egyptyan Funerary Mask';
        artifactInfo.innerHTML = "Egyptian funerary masks were intricate artifacts placed over the face of the deceased to protect and guide their spirit in the afterlife. Often made of materials like gold, precious metals, or stone, these masks were adorned with elaborate designs and symbolic motifs representing deities and rituals associated with the journey to the afterlife. ";
        }
    else if(artifact == img3){
        artifactContainer.style.visibility = "visible";
        artifactImage.src = img3.src;
        artifactName.innerHTML = 'Egyptyan Canopic Jar';
        artifactInfo.innerHTML = " Canopic jars were essential containers used in ancient Egyptian funerary practices to store and protect the organs of the deceased during the mummification process. These jars typically had lids representing the four sons of Horus, who were associated with the safekeeping of the liver, lungs, stomach, and intestines. Each jar held a specific organ, ensuring its preservation for the journey to the afterlife according to Egyptian beliefs.";
        }
    }

//After the artifact info window is display, make it disappear with any click on the screen
window.addEventListener("click", ()=>{
    artifactContainer.style.visibility = "hidden";
    currentArtifact = null;
})


