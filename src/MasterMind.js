const PinColors = { RED: "red", GREEN: "green", BLUE: "blue", CYAN: "cyan", YELLOW: "yellow", MAGENTA: "magenta" }
const PinColorCount = 6;
const GuessStat = { FITS: "fits", PARTIALLY: "partially", WRONG: "wrong" }
const GameStat = { LOST: "lost", WON: "won", PENDING: "pending" }


function pickColor(rndFunction) {
    let colorNr = rndFunction();
    colorNr -= Math.trunc(colorNr);  // 10.5 --> 0.5
    colorNr = Math.floor(colorNr * PinColorCount);   // [0.0 .. 1.0[  --> Int[0 .. 5]

    return PinColors[Object.keys(PinColors)[colorNr]];  // Object.keys(PinColors) --> ["RED", "GREEN", "BLUE", ...]

    // PinColors["RED"] entspricht PinColors.RED
    // let x = "RED"
    // PinColors[x]

    // if (rnd == 0)
    //     return PinColors.RED;   
    // else if (rnd == 1)
    //     return PinColors.GREEN;
    // else if (rnd == 2)
    //     return PinColors.BLUE;
    // else if (rnd == 3)
    //     return PinColors.CYAN;
    // else if (rnd == 4)
    //     return PinColors.YELLOW;

    // return PinColors.MAGENTA;
}


function generateCode() {
    let colors = [];

    for (let i = 0; i < 4; i++) {
        let twice;
        do {
            colors[i] = pickColor(Math.random);
            twice = false;

            // Test, ob die Farbe vorher schon gewählt wurde
            for (let j = 0; j < i; j++) {
                if (colors[j] == colors[i]) {
                    twice = true;
                    break;
                }
            }
        } while (twice);
    }
    return colors;
}


function CheckCode(arr1, secretArr) {
    let guessStats = [];
    for (let i = 0; i < 4; i++) {
        if (arr1[i] == secretArr[i])
            guessStats[i] = GuessStat.FITS;
        else if (rightColorWrongPlace(i, arr1, secretArr))
            guessStats[i] = GuessStat.PARTIALLY;
        else
            guessStats[i] = GuessStat.WRONG;
    }
    return guessStats;
}

function rightColorWrongPlace(pos, arr1, arr2) {
    for (let i = 0; i < 4; i++) {
        if (i != pos && arr1[i] == arr2[pos])
            return true;
    }
    return false;
}

function CheckCodeScrumble(arr1, arr2, randomFnct) {
    let guessStats = CheckCode(arr1, arr2);

    for (let i = 0; i < 5; i++) {
        let i1 = Math.trunc(randomFnct() * 4);
        let i2 = Math.trunc(randomFnct() * 4);
        let tmpGuess = guessStats[i1];
        guessStats[i1] = guessStats[i2];
        guessStats[i2] = tmpGuess;
    }

    return guessStats;
}

function allFITS(guess) {
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] != GuessStat.FITS) {
            console.log("allFITS: " + guess + " => false");
            return false;
        }
    }
    console.log("allFITS: " + guess + " => true");
    return true;
}


function game(guessArray) {
    console.log("Game: " + guessArray)
    console.log("Array.length: " + guessArray.length);

    if (guessArray.length > 12)
        return GameStat.LOST;

    let i;
    for (let i = 0; i < guessArray.length; i++) {
        if (guessArray[i] != undefined && allFITS(guessArray[i]))
            return GameStat.WON;
    }
    return GameStat.PENDING;
}

function convertInput(inputString) {
    inputString = inputString.toUpperCase();
    let guesses = [];
    let pinPos = 0;
    for (item of inputString) {
        if (pinPos < 4) {
            if (item == 'R')
                guesses[pinPos++] = PinColors.RED;
            else if (item == 'B')
                guesses[pinPos++] = PinColors.BLUE;
            else if (item == 'G')
                guesses[pinPos++] = PinColors.GREEN;
            else if (item == 'Y')
                guesses[pinPos++] = PinColors.YELLOW;
            else if (item == 'M')
                guesses[pinPos++] = PinColors.MAGENTA;
            else if (item == 'C')
                guesses[pinPos++] = PinColors.CYAN;
        }
    }
    console.log("Your guess: " + guesses);
    return guesses;
}

var guesses;
var guessInd = 0;
var secretCode;

function InitNewGame() {
    console.log("New Game");
    guesses = []; // new Array(12);
    guessInd = 0;

    console.log("Before generateCode()");
    secretCode = generateCode();
    AddLine(secretCode);
    console.log("Generate Code completed");
    console.log(secretCode);
}

function AddLine(outputLine) {
    let tag = document.createElement("p");
    tag.innerText = outputLine;
    document.body.appendChild(tag);
}

function NextGameStep(yourGuess) {
    console.log("NextGameStep: " + yourGuess);
    // guesses[guessInd] = CheckCodeScrumble(secretCode, convertInput(Console.ReadLine()), dice.NextDouble);
    let currGuess = convertInput(yourGuess);
    guesses[guessInd] = CheckCode(secretCode, currGuess);
    let res = "| " + currGuess + " || ";

    for (item of guesses[guessInd]) {
        res += item + " | ";
    }

    AddLine(res);
    guessInd++;

    return game(guesses);
    // } while (guessInd < 12 && game(guesses) == false);

    // if (game(guesses) == false)
    //     Console.WriteLine("Leider verloren! Der Computer gewinnt!");
    // else
    //     Console.WriteLine("Richtig getippt! Sie gewinnen!");
}

module.exports = {
    InitNewGame,
    NextGameStep,
    GameStat,
    AddLine,
    pickColor,
    generateCode,
    CheckCode,
    CheckCodeScrumble,
    game,
    PinColors, GuessStat, GameStat
}
