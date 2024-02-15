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
});


