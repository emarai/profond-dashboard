// @ts-nocheck
import { getNFTMarketplaceTopCollections } from './../../../lib/pgdb';
export default async function handler(req, res) {
    const marketplace = req.query.marketplace

    const result = await getNFTMarketplaceTopCollections(marketplace)

    res.status(200).json(result)
}