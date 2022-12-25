let userScore = 0;
let computerScore = 0;

const userScore_Span = document.querySelector("#user-score");
const computerScore_Span = document.querySelector("#computer-score");
const scoreBoard = document.querySelector(".container_Score");
const result = document.querySelector(".result > p");
const roca = document.querySelector("#r");
const papel = document.querySelector("#p");
const tijera = document.querySelector("#t");

//! Manda la opción que escoje la pc
function getComputerChoice() {
    const choice = ["r", "p", "t"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choice[randomNumber];
};

const converToWord = (letter) => {
    if(letter === "r") return "Roca";
    if(letter === "p") return "Papel";
    return "Tijeras"
};

const win = (user, computer) => {
    console.log("gana");
    const userDiv = document.querySelector(`#${user} > img`);

    userScore++;
    userScore_Span.innerHTML = userScore;
    computerScore_Span.innerHTML = computerScore;
    result.innerHTML = `${converToWord(user)} Vs. ${converToWord(computer)} ¡Tú Ganas! 🔥`;
    
    userDiv.classList.add("green-glow");
    setTimeout(() => userDiv.classList.remove("green-glow"), 300);
};

const loser = (user, computer) => {
    console.log("pierdes");
    const userDiv = document.querySelector(`#${user} > img`);
    computerScore++;
    userScore_Span.innerHTML = userScore;
    computerScore_Span.innerHTML = computerScore;
    result.innerHTML = `${converToWord(user)} Vs. ${converToWord(computer)} ¡Tú Pierdes! 😢`;

    userDiv.classList.add("red-glow");

    setTimeout(() => userDiv.classList.remove("red-glow"), 300);
};

const draw = (user, computer) => {
    console.log("Empate");
    const userDiv = document.querySelector(`#${user} > img`);

    computerScore++;
    userScore++;
    userScore_Span.innerHTML = userScore;
    computerScore_Span.innerHTML = computerScore;
    result.innerHTML = `${converToWord(user)} Vs. ${converToWord(computer)} ¡Empate! 😉`;

    userDiv.classList.add("gray-glow");
    setTimeout(() => userDiv.classList.remove("gray-glow"), 300);
};

function game(opcion) {
    console.log("Opción: ",opcion);
    const computerOption = getComputerChoice();
    console.log("PC: ",computerOption);
    console.log(opcion + computerOption);

    switch(opcion + computerOption) {
        case "rt": 
        case "pr":
        case "tp":  win(opcion, computerOption);
                    break;
        case "rp":
        case "pt":
        case "tr": loser(opcion, computerOption);
        break;
        case "rr":
        case "pp":
        case "tt":  draw(opcion, computerOption);
                    break;
    }
};

const main = () => {
    roca.addEventListener("click", () => {
        console.log("roca :v");
        game("r");
    });
    
    papel.addEventListener("click", () => {
        console.log("papel :v");
        game("p");
    });
    
    tijera.addEventListener("click", () => {
        console.log("tijeras :v");
        game("t");
    });
}

main();

//! Modal

var modal = document.getElementById("myModal");
var body = document.querySelectorAll(".body");

modal.style.display = "block";

for(let dato of body) {
    dato.style.visibility = "hidden";
}

let nombre = document.getElementById("name");
let opciones = document.querySelectorAll(".b");

const cliked = function () {
    console.log("user ", nombre.value);
    console.log("el texto que tiene es: ", this.value);
}

opciones.forEach(b => {
    b.addEventListener("click", cliked);
});

function empezarPartida() {
    modal.style.display = "none";
    for(let dato of body) {
        dato.style.visibility = "visible";
    }
}
