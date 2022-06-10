import type { NextApiRequest, NextApiResponse } from 'next'
import doBracketsBalance from '../../controllers/brackets-balance'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { method, body } = req

    if (method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const { code } = body

    if (!code) {
        res.status(400).send({ message: 'Bad Request' })
        return
    }

    const balance: boolean = await doBracketsBalance(code)

    res.status(200).json({
        balance
    })
}
