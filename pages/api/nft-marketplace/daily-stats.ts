// @ts-nocheck
import { getNFTMarketplaceDailyStats } from './../../../lib/pgdb';
export default async function handler(req, res) {
    const result = await getNFTMarketplaceDailyStats()

    res.status(200).json(result)
}