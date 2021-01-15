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
})