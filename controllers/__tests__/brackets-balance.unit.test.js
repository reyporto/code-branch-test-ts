import doBracketsBalance from '../brackets-balance'

describe('Brackets Balance api test unit', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should return true is balance', async () => {
        const code = `const addOne = value => {
            return value + 1
        }`

        expect(await doBracketsBalance(code)).toEqual(true)
    })

    test('should return false is not balance', async () => {
        const code = ''
        expect(await doBracketsBalance(code)).toEqual(false)

        const code2 = `const addOne = value => {
            return value + 1
        }}`
        expect(await doBracketsBalance(code2)).toEqual(false)

        const code3 = 'const addOne { if () if ()'
        expect(await doBracketsBalance(code3)).toEqual(false)

        const code4 = 'const addOne { if )'
        expect(await doBracketsBalance(code4)).toEqual(false)

        expect(await doBracketsBalance()).toEqual(false)
    })
})