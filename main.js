const { InitNewGame, NextGameStep, GameStat, AddLine } = require("./src/MasterMind");

var guessNumber = 0;

function NextGuessBtn_Click() {
    console.log("NextGuess started");
    const yourGuess =
        document.getElementById('pin1').value +
        document.getElementById("pin2").value +
        document.getElementById("pin3").value +
        document.getElementById("pin4").value;
    console.log("Input-String: " + yourGuess);
    let gamestatus = NextGameStep(yourGuess);

    console.log("Game status: " + gamestatus);
    if (gamestatus == GameStat.LOST)
        AddLine("Nicht geschafft! Sie verlieren!");
    else if (gamestatus == GameStat.WON)
        AddLine("Congrats! Alles richtig! Sie haben gewonnen!");

    console.log("NextGuess completed");
}

document.getElementById("nextGuessBtn").addEventListener("click", NextGuessBtn_Click);
console.log("Main");
InitNewGame();
