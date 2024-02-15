const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const score = document.getElementById("score");

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

    if(cactusLeft < 0){
        cactus.style.display = "none";
    }else{
        cactus.style.display = "";
    }
        //detect collision
    if(cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140){    
        gameOverSoundEffect();
        alert("Game over! \n \nDo you want to play again?");
        location.reload();  
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


