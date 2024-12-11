let gameSeq=[];
let userSeq=[];
let highestScore = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

function levelUp(){
    userSeq = [];
    level++;
   
    h2.innerText = `Level ${level}`;

    //random btn choose
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
    
}

function gameFlash(btn){//white flash
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){//green flash
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}



function checkAns(idx){
   //console.log("curr level : ", level);


    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            highestScore = Math.max(level, highestScore);  // Update the highest score if current level is higher
            h3.innerHTML = `Highest Score is <b>${highestScore}</b>.`; 
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Press any key to start. Your score was<b> ${level-1}</b> <br>Press any key to start`;
        highestScore = Math.max(level-1, highestScore);
        h3.innerHTML = `Highest Score is <b>${highestScore}</b>.`;
        document.querySelector("body").style.backgroundColor = "red";
        
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 700);
        reset();
    }
}

function btnPress (){
    
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);

}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}
function reset(){
    started = false;
    gameSeq=[];
    userSeq=[];
    level = 0;
}
