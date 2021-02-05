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


module.exports = {
    pickColor,
    generateCode,
    CheckCode,
    CheckCodeScrumble,
    PinColors, GuessStat
}
