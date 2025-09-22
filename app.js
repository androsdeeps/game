let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")

let turnO = true; // alternate turn so start 1st whith 'O'.

const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if(turnO) { //player O
            box.innerText = "O";
            turnO = false;
    } else { //Player X
        box.innerText = "X"
        turnO = true;
    }
    box.disabled = true; // cannot access multiple times, ones time change only.
    
    checkWinner();
    checkDraw();
        
    });
});

//DisableBoxes function after winning
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`; 
    msgContainer.classList.remove("hide");
    disableBoxes();
}


function checkDraw() {
    if (checkWinner(boxes)) { //if some one has own it's not draw.
        return false;
    }
    for (let box of boxes) { // checking the boxes are filled are not.
        if (box.innerText === "") {
            return false;
        }
    }
    msg.innerText = "The Game is Draw!!!";
    msgContainer.classList.remove("hide");
    console.log('Draw');
    return true; // boxes are filled no winner 
}

function checkWinner() {
    for (let pattern of winningPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;// indivisual index
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText; //possion 0,1,2 value are same are not

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) { //all 3 index value is same patern match
                console.log("winner", pos1Val);
                showWinner(pos1Val);  // to show the winner the value of position one is passed
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);