const dino = document.getElementById("dino");
const cactus = document.querySelector(".cactus1");
const score = document.getElementById("score");
const gameOverEl = document.querySelector(".game-over");
const resetBtnEl = document.querySelector(".reset");


let playerScore=0;
let gameEnded = false;

function incrementScore() {
    if (!gameEnded) {
        playerScore++;
        updateScoreDisplay();
    }
}

function updateScoreDisplay() {
   score.innerText = playerScore;
   if(playerScore % 100 === 0 && playerScore !==0){
    rewardSound();
   } 
}

function jump(){
    if(dino.classList != "jump"){
    dino.classList.add("jump");
    setTimeout(function(){
        dino.classList.remove("jump")
    }, 500)
}};

let isAlive = setInterval(function(){
    incrementScore();
        //get current dino Y position
    let dinoTop= parseInt(window.getComputedStyle(dino).getPropertyValue("top"))

        //get current cactus X position 
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

    if(cactusLeft < 0){
        cactus.style.display = "none";
    }else{
        cactus.style.display = "";
    }
        //detect collision   
    if(cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140){  
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
    const rewardSound = new Audio("./sounds/100points.wav");
    rewardSound.play();
}


function gameOverMod(){
    gameEnded = true;
    gameOverSoundEffect();
    dino.classList.remove('gif-dino');
    dino.classList.add('img-dino');    
    gameOverEl.classList.add('active');
    resetBtnEl.classList.add('active');
    document.querySelector(".game").style.animation = "none";
    cactus.style.animation = "none"; 
}

resetBtnEl.addEventListener("click", () =>{
    playerScore = 0;
    gameEnded = false;
    dino.classList.add('gif-dino');
    dino.classList.remove('img-dino');
    gameOverEl.classList.remove('active');
    resetBtnEl.classList.remove('active');
    document.querySelector(".game").style.animation = "trackMove 4.2s linear infinite forwards"
    cactus.style.animation = " block 2s infinite linear";
})




