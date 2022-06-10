export default async function doBracketsBalance(code: string = '') {
    const regex: RegExp = /([()|{}|[\]\\])/g
    const bracketsMatch: Array<string> | null = code.match(regex)

    if (!bracketsMatch) {
        return false
    }

    const openBrackets: Array<string> = ['(', '{', '[']
    const closedBrackets: Array<string> = [')', '}', ']']
    const open: Array<string> = []

    let isBalance: boolean = true

    bracketsMatch.forEach((element) => {
        if (openBrackets.includes(element)) {
            open.push(element)
        } else if (closedBrackets.includes(element)) {
            if (!open.length) {
                isBalance = false
                return
            }

            const last: string = open[open.length - 1]
            const opposite: string = openBrackets[closedBrackets.indexOf(element)]

            if (last === opposite) {
                open.pop()
            } else {
                isBalance = false
            }
        }
    })

    if (open.length) {
        isBalance = false
    }

    return isBalance
}
