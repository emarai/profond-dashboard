// @ts-nocheck
import { getUserNFTCollectionByContract } from '../../lib/pagoda';

export default async function handler(req, res) {
    const accountId = req.query.account_id
    const contractAccountId = req.query.contract_account_id

    const nfts = await getUserNFTCollectionByContract(accountId, contractAccountId)
    res.status(200).json(nfts)
}
