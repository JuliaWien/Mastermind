const PinColors = { RED: "red", GREEN: "green", BLUE: "blue", CYAN: "cyan", YELLOW: "yellow", MAGENTA: "magenta" }
const PinColorCount = 6;
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

module.exports = {
    generateCode,
    pickColor,
    PinColors
}
