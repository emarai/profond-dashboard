// @ts-nocheck
import { getNFTMarketplaceStats } from './../../../lib/pgdb';
export default async function handler(req, res) {
    const result = await getNFTMarketplaceStats()

    res.status(200).json(result)
}