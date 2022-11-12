// @ts-nocheck
import { getUserCoinBalances } from '../../lib/pagoda'

export default async function handler(req, res) {
    const accountId = req.query.account_id

    const coinBalances = await getUserCoinBalances(accountId)
    res.status(200).json(coinBalances)
}
