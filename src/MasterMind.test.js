const { pickColor, generateCode, CheckCode, CheckCodeScrumble, game, PinColors, GuessStat, GameStat } = require('./MasterMind')

describe('pickColorTesting', () => {
    it('it should choose PinColors.RED on 0.16', () => {
        expect(pickColor(() => 0.16)).toBe(PinColors.RED)
    })
    it('it should choose PinColors.CYAN on 0.56', () => {
        expect(pickColor(() => 0.56)).toBe(PinColors.CYAN)
    })
    it('it should choose PinColors.MAGENTA on 0.16', () => {
        expect(pickColor(() => 0.96)).toBe(PinColors.MAGENTA)
    })
    it('it should choose PinColors.RED on 0.16', () => {
        expect(pickColor(() => 1.16)).toBe(PinColors.RED)
    })
    it('it should choose PinColors.CYAN on 0.56', () => {
        expect(pickColor(() => 10.56)).toBe(PinColors.CYAN)
    })
    it('it should choose PinColors.MAGENTA on 0.16', () => {
        expect(pickColor(() => 20.96)).toBe(PinColors.MAGENTA)
    })
})

function doubleColorTest(f) {
    for (let i = 0; i < f.length - 1; i++) {
        for (let j = i + 1; j < f.length; j++) {
            if (f[i] == f[j])
                return true;
        }
    }
    return false;
}

describe('generateCodeTesting', () => {
    for (let i = 0; i < 10; i++) {
        it("array mustn't contain twin PinColors", () => {
            expect(doubleColorTest(generateCode())).toBe(false)
        })
    }
})
