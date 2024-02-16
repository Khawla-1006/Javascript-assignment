const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const score = document.getElementById("score");
let gameSpeed = 2000;
let cactusPosition = 580; 
const cactusMoveInterval = 20; 
let jumpedCactuses = 0;


function jump(){
    if(dino.classList != "jump"){
    dino.classList.add("jump");
    setTimeout(function(){
        dino.classList.remove("jump")
    }, 500)
}};

let isAlive = setInterval(function(){
    score.innerText++;
        //get current dino Y position
    let dinoTop= parseInt(window.getComputedStyle(dino).getPropertyValue("top"))

        //get current cactus X position 
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

    if (cactusLeft < 0) {
        cactus.style.display = "none";
        if (cactusPosition < 0) {
            cactusPosition = 580; 
            jumpedCactuses++;
            cactjumped.innerText = jumpedCactuses;
        }
    } else {
        cactus.style.display = "";
    }
        //detect collision   
    if(cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140){
        gameOverSoundEffect();
        dino.classList.remove('gif-dino');
        dino.classList.add('img-dino');     
        setTimeout(() => {
            alert("Game over! \n \nDo you want to play again?");
            location.reload();
          }, "10");
    } 
},50)

document.addEventListener("keydown", function(event){
    jump();
    jumpSoundEffect();
});

function jumpSoundEffect(){
    const jumpSound = new Audio("./sounds/jump.wav");
    jumpSound.play();
}

function gameOverSoundEffect(){
    const gameOverSound = new Audio("./sounds/over.wav");
    gameOverSound.play();
}

function moveCactus() {
    cactusPosition -= 5; 
    if (cactusPosition <= -20) {
        cactusPosition = 580; 
    }
    cactus.style.left = `${cactusPosition}px`;
}

// Start moving the cactus
let moveCactusInterval = setInterval(moveCactus, cactusMoveInterval);

function increaseSpeed() {
    clearInterval(moveCactusInterval); 
    gameSpeed *= 0.9; 
    moveCactusInterval = setInterval(moveCactus, gameSpeed / 100); 
}

setInterval(increaseSpeed, 5000);


