// @ts-nocheck
import { getNEARHistory } from '../../lib/pagoda'

export default async function handler(req, res) {
    const accountId = req.query.account_id

    const nearHistory = await getNEARHistory(accountId)
    res.status(200).json(nearHistory)
}