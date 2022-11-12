// @ts-nocheck
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URL as string)

export const getWalletProfile = (accountId: string) => {
    try {
        const walletProfile = client
            .db(process.env.MONGODB_DBNAME)
            .collection('wallet-profiles')
            .findOne({
                account_id: accountId,
            })
        if (!walletProfile) return null
        else return walletProfile
    } catch (err) {
        throw err
    }
}

export const setWalletProfile = (data) => {
    try {
        const walletProfile = client
            .db(process.env.MONGODB_DBNAME)
            .collection('wallet-profiles')
            .findOneAndUpdate(
                {
                    account_id: data.account_id,
                },
                {
                    $set: data,
                },
                {
                    upsert: true,
                }
            )
        if (!walletProfile) return null
        else return walletProfile
    } catch (err) {
        throw err
    }
}
