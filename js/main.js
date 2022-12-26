let userScore = 0;
let computerScore = 0;
let counter = 0;

const userScore_Span = document.querySelector("#user-score");
const computerScore_Span = document.querySelector("#computer-score");
const scoreBoard = document.querySelector(".container_Score");
const result = document.querySelector(".result > p");
const roca = document.querySelector("#r");
const papel = document.querySelector("#p");
const tijera = document.querySelector("#t");

//! Mensaje final al usuario
let mensajeFinal = document.getElementById("mensajeFinal");
mensajeFinal.style.display = "none";

//! muestra un reloj con las partidas
let partidaInicial = document.querySelector("#partidaMomento");
let partidaTotal = document.querySelector("#partidaFinal");

//! Modal
var modal = document.getElementById("myModal");
var body = document.querySelectorAll(".body");

modal.style.display = "block";

for(let dato of body) {
    dato.style.visibility = "hidden";
}

let user = document.querySelector("#nombreUser");
let nombre = document.getElementById("name");
let opciones = document.querySelectorAll(".b");
let selected = 0;

//! Para saber la opción de partidas
const cliked = function () { selected = Number(this.value); }

opciones.forEach(b => {
    b.addEventListener("click", cliked);
});

function empezarPartida() {
    if(nombre.value !== "" && selected !== 0) {
        modal.style.display = "none";
        for(let dato of body) {
            dato.style.visibility = "visible";
        }

        user.innerHTML = nombre.value;
    }
}

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
    const userDiv = document.querySelector(`#${user} > img`);

    userScore++;
    userScore_Span.innerHTML = userScore;
    computerScore_Span.innerHTML = computerScore;
    result.innerHTML = `${converToWord(user)} Vs. ${converToWord(computer)} ¡Tú Ganas! 🔥`;
    
    userDiv.classList.add("green-glow");
    setTimeout(() => userDiv.classList.remove("green-glow"), 300);
    counter++;
};

const loser = (user, computer) => {
    const userDiv = document.querySelector(`#${user} > img`);
    computerScore++;
    userScore_Span.innerHTML = userScore;
    computerScore_Span.innerHTML = computerScore;
    result.innerHTML = `${converToWord(user)} Vs. ${converToWord(computer)} ¡Tú Pierdes! 😢`;

    userDiv.classList.add("red-glow");

    setTimeout(() => userDiv.classList.remove("red-glow"), 300);
    counter++;
};

const draw = (user, computer) => {
    const userDiv = document.querySelector(`#${user} > img`);

    computerScore++;
    userScore++;
    userScore_Span.innerHTML = userScore;
    computerScore_Span.innerHTML = computerScore;
    result.innerHTML = `${converToWord(user)} Vs. ${converToWord(computer)} ¡Empate! 😉`;

    userDiv.classList.add("gray-glow");
    setTimeout(() => userDiv.classList.remove("gray-glow"), 300);
    counter++;
};

const rondas = () =>  {
    partidaInicial.innerHTML = counter;
    partidaTotal.innerHTML = selected;
};

//! Muestra el mensaje de ganar o perder y oculta el score
const mensaje = () => {
    let imagenes = document.querySelector(".choices");
    mensajeFinal.innerHTML = userScore > computerScore ? `¡¡Felicidades ${nombre.value}!! 😎` : `¡¡Mala Suerte ${nombre.value}!! ☹️`;

    scoreBoard.style.visibility = "hidden";
    result.style.visibility = "hidden";
    imagenes.classList.add("margenTop");

    userScore > computerScore ? confeti() : 0;
};

//! Crea el confetti
const confeti = () => {
    const confettiBtn = document.querySelector(".canvas-confetti-btn");
    let exploding = false;

    var countConfeti = 200;
    var defaults = { origin: { y: 0.7 } };

    const fire = (particleRatio, opts) => {
        confetti(Object.assign({}, defaults, opts, { countPaticulas: Math.floor(defaults.countConfeti * particleRatio)}));
    };

    if (exploding) { return; }

    exploding = true;

    confettiBtn.classList.add("animate__rubberBand");

    window.setTimeout(() => {
        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });

        window.setTimeout(() => {
            confettiBtn.classList.remove("animate__rubberBand");
            exploding = false;
        }, 300);
    }, 200);
};

function game(opcion) {
    const computerOption = getComputerChoice();

    switch(opcion + computerOption) {
        case "rt":  case "pr": case "tp":  
            win(opcion, computerOption);
            break;
        case "rp": case "pt": case "tr":
            loser(opcion, computerOption);
            break;
        case "rr": case "pp": case "tt":
            draw(opcion, computerOption);
            break;
    };

    rondas();

    //! Para controlar la cantidad de partidas
    if(counter == selected) {
        roca.style.pointerEvents = "none";
        papel.style.pointerEvents = "none";
        tijera.style.pointerEvents = "none";

        mensaje();
        mensajeFinal.style.display = "flex";
    };
};

const main = () => {
    roca.addEventListener("click", () => game("r"));
    papel.addEventListener("click", () => game("p"));
    tijera.addEventListener("click", () => game("t"));
}

main();