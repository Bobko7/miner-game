//Retrieve the miner and the blocks
const miner = document.querySelector(".miner-level-three");
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
    checkMiner,
    checkMinerSwingBack,
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
    if (!localStorage.getItem(`blocksDataLevelThree`)) {
        // Initialize blocks array with default values
        blocksSecond.forEach((block) => {
            block.resilience = 8000;
            block.lowResilience = false;
        });
        // Save initial block data to localStorage
        saveBlockData('blocksDataLevelThree', blocksSecond);
    } else {
        // Retrieve blocks data from localStorage
        
        blocksSecond = getBlocksData('blocksDataLevelThree');
    }
}
createBlocksData();

//Checks if there is a maxDamage variable saved in localStorage, if not creates one
checkLocalStorageForMaxDamage();

//When the page is loaded check if there are broken blocks from the last session
checkForBrokenBlocks(blocksSecond, blocks, 5000, 2500, 'images/broken-block-level-three1.png', 'images/broken-block-level-three2.png');

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
        displayResilience('blocksDataLevelThree', indexOfChosenBlock);

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
    saveDamageData('blocksDataLevelThree', indexOfChosenBlock, damage);
    //Prevent user of abusing with damage
    meter.style.pointerEvents = "none";
    setTimeout(()=>{
        meter.style.pointerEvents = "all";
    }, 1300)
    if(!chosenBlock.lowResilience){
        //Function to check the resilience of the block and display the according image
        checkResilience(chosenBlock, 'blocksDataLevelThree', indexOfChosenBlock, 5000, 2500, 'images/broken-block-level-three1.png', 'images/broken-block-level-three2.png');
    }
    //Check if the resilience is below 0 
    if(getBlocksData('blocksDataLevelThree')[indexOfChosenBlock].resilience <= 0){
        //Set the resilience to 0
        getBlocksData('blocksDataLevelThree')[indexOfChosenBlock].resilience = 0;
        blockCollapse(chosenBlock, 'images/broken-block-level-three3.png', 'images/broken-block-level-three4.png');
        setTimeout(()=>{
            //Hide the window with the meter and the chosen block
            setTimeout(()=>{
                checkSpecialBlocks();
                showArtifactInfo(currentArtifact);
            breakingContainer.style.visibility = "hidden";
            chosenBlock.style.visibility = "hidden";
            //The user gets 5 coins when he breaks a normal block
            localStorage.setItem("coins", Number(localStorage.getItem("coins")) + 20);
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
                //Checks if level three is cleared
                checkLevelThree();
        }, 1200)
        }, 200)
    }

    //Show the animation of the miner breaking the block
    setTimeout(()=>{  
        minerBlockBreakingAnimation();
    }, 10)

    //Display the changed value of resilience
    displayResilienceFancy('blocksDataLevelThree', indexOfChosenBlock);

    //Let the meter stop move again
    setTimeout(()=>{    
        meterStop.style.animationPlayState = "running";
}, 1000);
});}
catch(er){};

//Check if every single block is broken for the final screen
function checkLevelThree(){
    let allHidden = true;
    for(let block of blocks){
        if(block.style.visibility != "hidden"){
            allHidden = false;
        }
    }
    if(allHidden){
        localStorage.setItem("levelThreeCleared", true);
        window.location.href = 'ending.html';
    }
}

//Create new images for the artifacts and set them the css properties
const img1 = createArtifact("images/viking-brooch.png", -1, "absolute", 0.7);
const img2 = createArtifact("images/roman-oil-lamp.png", -1, "absolute", 0.7);
const img3 = createArtifact("images/celctic-torc.png", -1, "absolute", 0.7)

let artifactsIndexes = [];
//Check if the there are random indexes for the artifacts in the localStorage, if not, create ones
if (!localStorage.getItem('levelThreeArtifactsIndexes')) {
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
    localStorage.setItem("levelThreeArtifactsIndexes", JSON.stringify(randomNums));
    artifactsIndexes = randomNums;
}
//If there are random indexes for the artifacts, retrieve them
else{
    // Retrieve blocks data from localStorage
       artifactsIndexes = JSON.parse(localStorage.getItem("levelThreeArtifactsIndexes"));
}

//Function to hide the artifacts at the random places
hideImagesRandom(blocks,artifactsIndexes, img1, img2, img3);

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
        artifactName.innerHTML = 'A Viking Brooch';
        artifactInfo.innerHTML = "These brooches served as clasps for holding garments together, such as cloaks or apron dresses, while also showcasing intricate designs and craftsmanship. They were often made of materials like silver, bronze, or gold and adorned with motifs inspired by Norse mythology, animals, or geometric patterns, reflecting the artistic and cultural richness of the Viking era.";
    }
    else if(artifact == img2){
        artifactContainer.style.visibility = "visible";
        artifactImage.src = img2.src;
        artifactName.innerHTML = 'A Roman Oil Lamp';
        artifactInfo.innerHTML = "Roman oil lamps were common household items used for lighting in ancient Rome. Typically made of clay, they featured a round body with a central depression for holding oil, a spout for pouring, and a wick made of linen or other fibrous material. Decorations on these lamps ranged from simple geometric patterns to elaborate scenes depicting mythology, daily life, or religious motifs.";
        }
    else if(artifact == img3){
        artifactContainer.style.visibility = "visible";
        artifactImage.src = img3.src;
        artifactName.innerHTML = 'A Celctic Torc';
        artifactInfo.innerHTML = "Celtic torcs were elaborate neck ornaments worn by both men and women in ancient Celtic societies. These metal necklaces, often made of gold or other precious metals, featured intricate designs and were symbols of wealth, status, and power. They were worn in various Celtic cultures across Europe during the Iron Age.";
        }
    }

//After the artifact info window is display, make it disappear with any click on the screen
window.addEventListener("click", ()=>{
    artifactContainer.style.visibility = "hidden";
    currentArtifact = null;
})


