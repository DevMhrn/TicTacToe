let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newgame = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#message");
let container = document.querySelector(".container");
let count=0;
let winner = "";

let turnO = false;
const WinCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

const showWinner = (winner) => {
    let winnertxt = document.querySelector("#message");
    winnertxt.innerText = `Congratulations ${winner} | You have won!`;
    msgContainer.classList.remove("hide");
    reset.style.display = "none";
    disableBtns();
}

 
const showDraw = () => {
    let drawtxt = document.querySelector("#message");
    drawtxt.innerText = `Game Draw`;
    msgContainer.classList.remove("hide");
    reset.style.display = "none";
    disableBtns();
}

function buttonBehaviour() {
    boxes = document.querySelectorAll(".game:not(.finished) .box");
    boxes.forEach((box) => {
        box.addEventListener("click", ()=> {
            if (box.parentElement.classList.contains("finished")) {
                return;
            }

            
            console.log("box was clicked");
            
            if (turnO) {
                box.innerHTML = "O";
                box.style.color = "#b0413e";
            }
            else{
                box.innerHTML = "X";
                box.style.color = "black"
            }
            
            turnO = !turnO;
            box.disabled=true;
            
            checkWin();
        });
    });
}
const checkWin = () => {  
    for(let patterns of WinCombos){
        let pos1 = boxes[patterns[0]].innerText; 
        let pos2 = boxes[patterns[1]].innerText;
        let pos3 = boxes[patterns[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1==pos2 && pos2==pos3){
                console.log("winner");
                boxes[patterns[0]].classList.add("winbox");
                boxes[patterns[1]].classList.add("winbox");
                boxes[patterns[2]].classList.add("winbox");
                

                // stopTransition();
                winner = pos1;
                showWinner(pos1);

            }

        }
        // else{
        //   showDraw();
        // }
        
    
        
    }
}

const disableBtns = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

const enableBtns = () => {
    boxes.forEach((box) => {
        box.classList.remove("winbox");
        box.disabled = false;
    });
}

const resetGame = () => {
    turnO = false;
    document.querySelector(".game").innerHTML = `
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
    `;
    buttonBehaviour();
    msgContainer.classList.add("hide");
}

const newGame = () => {
    document.querySelector(".game").classList.add("finished");

    let gameContainer = document.createElement("div");
    gameContainer.classList.add("game");
    gameContainer.innerHTML = `
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
        <button class="box"></button>
    `

    container.insertBefore(gameContainer, container.children[0]);
    turnO = false;
    // enableBtns();
    msgContainer.classList.add("hide");
    buttonBehaviour();
    reset.style.display = "";

    let historyTitle = document.createElement("div");
    historyTitle.classList.add("history");

    count++;

    historyTitle.innerText = `Game History : ${count}`;

    container.insertBefore(historyTitle, container.children[1]);

    let histoy_winner = document.createElement("div");
    histoy_winner.classList.add("history-winner");
    histoy_winner.innerText = `Winner : ${winner}`;
    container.insertBefore(histoy_winner, container.children[2]);



}

reset.addEventListener("click", resetGame);
newgame.addEventListener("click", newGame);
buttonBehaviour();












