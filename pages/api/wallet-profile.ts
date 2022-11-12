// @ts-nocheck
import {
    getTotalSignedTransactions,
    getTotalReceivedTransactions,
    getTotalReflexiveTransactions,
} from './../../lib/pgdb'
import { getAccountCreatedTimestamp } from './../../lib/graphql'
import { getWalletProfile, setWalletProfile } from '../../lib/mongodb'
import { nsToms } from './../../lib/utils'

export default async function handler(req, res) {
    const accountId = req.query.account_id

    const walletProfile = await getWalletProfile(accountId)
    let dataResult
    if (!walletProfile) {
        const accountCreatedBlocktimestamp = await getAccountCreatedTimestamp(
            accountId
        )
        console.log(accountCreatedBlocktimestamp)
        const totalSignedTransaction = await getTotalSignedTransactions(
            accountId
        )
        console.log(totalSignedTransaction)
        const totalReceivedTransaction = await getTotalReceivedTransactions(
            accountId
        )
        console.log(totalReceivedTransaction)
        const totalReflexiveTransaction = await getTotalReflexiveTransactions(
            accountId
        )
        console.log(totalReflexiveTransaction)

        dataResult = {
            account_id: accountId,
            account_created_at: nsToms(parseInt(accountCreatedBlocktimestamp)),
            total_transactions:
                totalSignedTransaction +
                totalReceivedTransaction -
                totalReflexiveTransaction,
            total_signed_transactions:
                totalSignedTransaction - totalReflexiveTransaction,
            total_received_transactions:
                totalReceivedTransaction - totalReflexiveTransaction,
            total_reflexive_transactions: totalReflexiveTransaction,
            updated_at: new Date().getTime()
        }

        await setWalletProfile(dataResult)
    } else {
        dataResult = walletProfile
    }
    res.status(200).json(dataResult)
}
