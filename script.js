const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const score = document.getElementById("score");
const gameOverEl = document.querySelector(".game-over");
const resetBtnEl = document.querySelector(".reset");

const cactusMoveInterval = 20; 

let playerScore=0;
let gameEnded = false;
let gameSpeed = 2000;
let cactusPosition = 580; 

let jumpedCactuses = 0;

function incrementScore() {
    if (!gameEnded) {
        playerScore++;
        score.innerText = playerScore;
        if(playerScore % 100 === 0 && playerScore !==0){
         rewardSound();
       }
   }
}
 
function jump(){
    if(!gameEnded &&  dino.classList != "jump"){
    dino.classList.add("jump");
    setTimeout(function(){
        dino.classList.remove("jump")
    }, 500)
    } 
}

function moveCactus() {
    if(!gameEnded){
        cactusPosition -= 5; 
        if (cactusPosition <= -20) {
            cactusPosition = 580; 
        }
        cactus.style.left = `${cactusPosition}px`;
    }
}
let moveCactusInterval = setInterval(moveCactus, cactusMoveInterval);

function increaseSpeed() {
    if(gameSpeed > 500){
        clearInterval(moveCactusInterval); 
        gameSpeed *= 0.9; 
        moveCactusInterval = setInterval(moveCactus, gameSpeed / 100); 
    }
}

setInterval(increaseSpeed, 9000);

function gameOverMod(){
    gameEnded = true;
    dino.classList.remove('gif-dino');
    dino.classList.add('dino-dead');    
    gameOverEl.classList.add('active');
    resetBtnEl.classList.add('active');
    document.querySelector(".game").style.animation = "none";
    clearInterval(moveCactusInterval);
}
 
function resetGame(){
    playerScore = 0;
    jumpedCactuses = 0;
    gameEnded = false;
    dino.classList.add('gif-dino');
    dino.classList.remove('dino-dead');
    gameOverEl.classList.remove('active');
    resetBtnEl.classList.remove('active');
    document.querySelector(".game").style.animation = "trackMove 4.2s linear infinite forwards"
    cactjumped.innerText = jumpedCactuses;
    clearInterval(moveCactusInterval); 
    cactusPosition = 580;
    moveCactusInterval = setInterval(moveCactus, cactusMoveInterval);
    gameSpeed = 2000;
}
 
let isAlive = setInterval(function(){
    incrementScore();
    
    let dinoTop= parseInt(window.getComputedStyle(dino).getPropertyValue("top"))

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
    if(cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140){
        gameOverSoundEffect();
        gameOverMod();  
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

function rewardSound(){
    const rewardSound = new Audio("./sounds/reward.wav");
    rewardSound.play();
}

resetBtnEl.addEventListener("click", resetGame)





