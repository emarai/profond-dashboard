// @ts-nocheck
import { getWalletNFTOverview } from '../../lib/pagoda'

export default async function handler(req, res) {
    const accountId = req.query.account_id

    const nftOverview = await getWalletNFTOverview(accountId)
    res.status(200).json(nftOverview)
}
