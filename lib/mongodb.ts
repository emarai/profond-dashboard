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


export const getDetailsFromCollection = (accountId: string, collectionId: string) => {
    try {
        const details = client
            .db(process.env.MONGODB_DBNAME)
            .collection(collectionId)
            .findOne({
                account_id: accountId,
            })
        if (!details) return null
        else return details
    } catch (err) {
        throw err
    }
}

export const setDetailsFromCollection = (data, collectionId) => {
    try {
        const details = client
            .db(process.env.MONGODB_DBNAME)
            .collection(collectionId)
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
        if (!details) return null
        else return details
    } catch (err) {
        throw err
    }
}

export const getDetailsFromCollectionWithContract = (accountId: string, contractAccountId: string, collectionId: string) => {
    try {
        const details = client
            .db(process.env.MONGODB_DBNAME)
            .collection(collectionId)
            .findOne({
                account_id: accountId,
                contract_account_id: contractAccountId,
            })
        if (!details) return null
        else return details
    } catch (err) {
        throw err
    }
}

export const setDetailsFromCollectionWithContract = (data, contractAccountId: string, collectionId) => {
    try {
        const details = client
            .db(process.env.MONGODB_DBNAME)
            .collection(collectionId)
            .findOneAndUpdate(
                {
                    account_id: data.account_id,
                    contract_account_id: contractAccountId,
                },
                {
                    $set: data,
                },
                {
                    upsert: true,
                }
            )
        if (!details) return null
        else return details
    } catch (err) {
        throw err
    }
}