const coinsHeading = document.querySelector(".coins")
const resilienceHeading = document.querySelector(".resilience");
const minerSwingBack = document.querySelector(".miner-swing-back");

//Function to check for the game coins
export function checkLocalStorageForCoins(){
    if(!localStorage.getItem("coins")){
        localStorage.setItem("coins", 0);
    }
}

//Function to show the coins on the web page
export function showCoins(){
    coinsHeading.innerHTML = localStorage.getItem("coins");
}

//Check which image to display on normal miner
export function checkMiner(miner){
    if(localStorage.getItem('maxDamage') == 500){
        miner.src = 'images/miner.png';
    }
    else if(localStorage.getItem('maxDamage') == 800){
        miner.src = 'images/miner-pickaxe-1.png';
    }
    else if(localStorage.getItem('maxDamage') == 1000){
        miner.src = 'images/miner-pickaxe-2.png';
    }
    else if(localStorage.getItem('maxDamage') == 2000){
        miner.src = 'images/miner-pickaxe-3.png';
    }
}

//Check which image to display when the miner is swinging back
export function checkMinerSwingBack(){
    if(localStorage.getItem("maxDamage") == 500){
        minerSwingBack.src = 'images/miner-swing-back.png'
    }
    else if(localStorage.getItem("maxDamage") == 800){
        minerSwingBack.src = 'images/miner-swing-back-pickaxe-1.png';
    }
    else if(localStorage.getItem("maxDamage") == 1000){
        minerSwingBack.src = 'images/miner-swing-back-pickaxe-2.png';
    }
    else if(localStorage.getItem("maxDamage") == 2000){
        minerSwingBack.src = 'images/miner-swing-back-pickaxe-3.png';
    }
}

//Function for the miner breaking a block animation
export function minerBlockBreakingAnimation() {
    setTimeout(()=>{
        minerSwingBack.src = 'images/miner-swing-back.png';
        if(localStorage.getItem("maxDamage") == 500){
            minerSwingBack.src = 'images/miner-swing-back.png';
        }
        else if(localStorage.getItem("maxDamage") == 800){
            console.log("I'm here")
            minerSwingBack.src = 'images/miner-swing-back-pickaxe-1.png';
        }
        else if(localStorage.getItem("maxDamage") == 1000){
            minerSwingBack.src = 'images/miner-swing-back-pickaxe-2.png';
        }
        else if(localStorage.getItem("maxDamage") == 2000){
            minerSwingBack.src = 'images/miner-swing-back-pickaxe-3.png';
        }
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
    }, 1100)
    //Change the src of the image to be the one of block-breaking animation
    if(localStorage.getItem("maxDamage") == 500){
        minerSwingBack.src = 'images/real-block-breaking.gif';
    }
    else if(localStorage.getItem("maxDamage") == 800){
        console.log("I'm here")
        minerSwingBack.src = 'images/miner-block-breaking-animation-pickaxe-1.gif';
    }
    else if(localStorage.getItem("maxDamage") == 1000){
        minerSwingBack.src = 'images/miner-block-breaking-animation-pickaxe-2.gif';
    }
    else if(localStorage.getItem("maxDamage") == 2000){
        minerSwingBack.src = 'images/miner-block-breaking-animation-pickaxe-3.gif';
    }
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

//Function to move the miner to the chosen block
export function moveMinerToBlock(elementToBeMoved, elementTarget, inaccuracyX = 0, inaccuracyY = 0){
    let movingLeft;
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

        if(localStorage.getItem("maxDamage") == 500){
            elementToBeMoved.src = 'images/miner.png';
        }
        else if(localStorage.getItem("maxDamage") == 800){
            elementToBeMoved.src = 'images/miner-pickaxe-1.png';
        }
        else if(localStorage.getItem("maxDamage") == 1000){
            elementToBeMoved.src = 'images/miner-pickaxe-2.png';
        }
        else if(localStorage.getItem("maxDamage") == 2000){
            elementToBeMoved.src = 'images/miner-pickaxe-3.png';
        }
        elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';
}, duration * 1000);
    //Check the movement direction to set the proper animations
    if(movingLeft){
        if(localStorage.getItem("maxDamage") == 500){
            elementToBeMoved.src = 'images/miner-walking-left-fast.gif';
        }
        else if(localStorage.getItem("maxDamage") == 800){
            elementToBeMoved.src = 'images/miner-walking-left-pickaxe-1.gif';
        }
        else if(localStorage.getItem("maxDamage") == 1000){
            elementToBeMoved.src = 'images/miner-walking-left-pickaxe-2.gif';
        }
        else if(localStorage.getItem("maxDamage") == 2000){
            elementToBeMoved.src = 'images/miner-walking-left-pickaxe-3.gif';
        }
    }
    else if(!movingLeft){
        if(localStorage.getItem("maxDamage") ==  500){
            elementToBeMoved.src = 'images/miner-walking-right-animation-fast.gif';
        }
        else if(localStorage.getItem("maxDamage") == 800){
            elementToBeMoved.src = 'images/miner-walking-right-pickaxe-1.gif';
        }
        else if(localStorage.getItem("maxDamage") == 1000){
            elementToBeMoved.src = 'images/miner-walking-right-pickaxe-2.gif';
        }
        else if(localStorage.getItem("maxDamage") == 2000){
            elementToBeMoved.src = 'images/miner-walking-right-pickaxe-3.gif';
        }
    }
    
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

//Function to move an element to another element
export function moveElementToElement(elementToBeMoved, elementTarget, inaccuracyX = 0, inaccuracyY = 0){
    const targetRect = elementTarget.getBoundingClientRect();
    
    setTimeout(()=>{
        elementToBeMoved.style.top = targetRect.top + inaccuracyY + 'px';
}, 500);
    elementToBeMoved.style.left = targetRect.left + inaccuracyX + 'px';
}

export function checkForBrokenBlocks(blocksCopy, blocks, upperBorder, lowerBorder, brokenBlockImage1, brokenBLockImage2){
    const resilienceBetween1000and1500 = [];
    const resilienceBetween0and1000 = [];
    const resilience0 = [];
    blocksCopy.forEach((block, index)=>{
        if(block.resilience > lowerBorder && block.resilience < upperBorder){
            resilienceBetween1000and1500.push(index);
        }
        else if(block.resilience < lowerBorder && block.resilience > 0){
            resilienceBetween0and1000.push(index);
        }
        else if(block.resilience == 0){
            resilience0.push(index);
        }
    });

    blocks.forEach((block, index)=>{
        if(resilienceBetween1000and1500.includes(index)){
            block.querySelector("img").src = `${brokenBlockImage1}`;
        }
        else if(resilienceBetween0and1000.includes(index)){
            block.querySelector("img").src = `${brokenBLockImage2}`;
        }
        else if(resilience0.includes(index)){
            block.style.visibility = "hidden";
        }
    })
}

//Function to save a change in blocks data to local storage
export function saveBlockData(localStorageNameOfData, blocksSecond) {
    // Serialize the blocks array into a JSON string
    let blocksData = JSON.stringify(blocksSecond);
    // Save the JSON string to localStorage
    localStorage.setItem(`${localStorageNameOfData}`, blocksData);
}

//Function to get the parsed array of data for the blocks
export function getBlocksData(localStorageName){
    return JSON.parse(localStorage.getItem(`${localStorageName}`));
}

//Function for collapsing block animation
export function blockCollapse(block, pathToBrokenImage3, pathToBrokenImage4){
    setTimeout(()=>{
        block.querySelector("img").src = `${pathToBrokenImage3}`;
        setTimeout(()=>{
            block.querySelector("img").src = `${pathToBrokenImage4}`;
            block.lowResilience = false;
        }, 300);
    }, 500);
}

//Function to check for max damage variable in local storage
export function checkLocalStorageForMaxDamage(){
    if (!localStorage.getItem("maxDamage")) {
    localStorage.setItem("maxDamage", 500);
}}

//Function to save the dealt damage in the local storage
export function saveDamageData(localStorageName, indexOfChosenBlock, damage){
    let blocksData = getBlocksData(`${localStorageName}`);
    if(!((blocksData[indexOfChosenBlock].resilience - damage) <= 0)){
        blocksData[indexOfChosenBlock].resilience -= damage;
    }
    else{
        blocksData[indexOfChosenBlock].resilience = 0;
    }
    // Save the JSON string to localStorage
    localStorage.setItem(`${localStorageName}`, JSON.stringify(blocksData));
}

//Function to check the resilience of a block in order to display the correct image
export function checkResilience(block, localStorageName, indexOfChosenBlock, firstBorder, secondBorder, pathToBrokenImage1, pathToBrokenImage2){
    let blockResilience = getBlocksData(`${localStorageName}`)[indexOfChosenBlock].resilience;
    if(blockResilience < firstBorder && blockResilience > secondBorder){
        setTimeout(()=>{
            block.querySelector("img").src = `${pathToBrokenImage1}`;
        }, 500)
    }
    else if(blockResilience < secondBorder){
        setTimeout(()=>{
            block.lowResilience = true;
            block.querySelector("img").src = `${pathToBrokenImage2}`;
        }, 500)
    }
}

export function displayResilience(localStorageNameOfData, indexOfChosenBlock){
    resilienceHeading.innerHTML = resilienceHeading.innerHTML.slice(0, 11) + getBlocksData(`${localStorageNameOfData}`)[indexOfChosenBlock].resilience;
}

export function displayResilienceFancy(localStorageNameOfData, indexOfChosenBlock){
    let interval = setInterval(()=>{
        if(Number(resilienceHeading.innerHTML.slice(11)) > getBlocksData(`${localStorageNameOfData}`)[indexOfChosenBlock].resilience)
        {
            resilienceHeading.innerHTML = resilienceHeading.innerHTML.slice(0, 11) + Number(resilienceHeading.innerHTML.slice(11) - 20)
        }
        else{
            resilienceHeading.innerHTML = resilienceHeading.innerHTML.slice(0, 11) + getBlocksData(`${localStorageNameOfData}`)[indexOfChosenBlock].resilience;
            clearInterval(interval);
        }
}, 20)
}

//Create new images for the artifacts and set them custom CSS properties
export function createArtifact(src, zIndex, position, scale) {
    const img = document.createElement("img");
    img.src = src;
    img.style.position = position || "absolute";
    img.style.zIndex = zIndex || "-1";
    img.style.transform = `scale(${scale || 1})`;
    return img;
}

//Function to create a random number between 0 and 17
export function createRandomBetween0and17(){
    return Math.floor(Math.random() * 18);
}

export function hideImagesRandom(blocks, artifactsIndexes, img1, img2, img3){
    blocks[artifactsIndexes[0]].appendChild(img1);
    blocks[artifactsIndexes[1]].appendChild(img2);
    blocks[artifactsIndexes[2]].appendChild(img3);
}

