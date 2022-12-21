// @ts-nocheck
import { getNFTMarketplaceDailyStats } from './../../../lib/pgdb';
export default async function handler(req, res) {
    const marketplace = req.query.marketplace

    const result = await getNFTMarketplaceDailyStats()

    res.status(200).json(result)
}