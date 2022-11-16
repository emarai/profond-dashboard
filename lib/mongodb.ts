// @ts-nocheck
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URL as string)
const walletProfiles = client.db(process.env.MONGODB_DBNAME).collection('wallet-profiles')
const nftOverview = client.db(process.env.MONGODB_DBNAME).collection('nft-overview')
const nftCollections = client.db(process.env.MONGODB_DBNAME).collection('nft-collections')

export const getWalletProfile = (accountId: string) => {
    try {
        const walletProfile = walletProfiles
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
        const walletProfile = walletProfiles
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


export const getDetailsFromNftOverview = (accountId: string) => {
    try {
        const details = nftOverview
            .findOne({
                account_id: accountId,
            })
        if (!details) return null
        else return details
    } catch (err) {
        throw err
    }
}

export const setDetailsNftOverview = (data) => {
    try {
        const details = nftOverview
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

export const getDetailsFromNftCollections = (accountId: string, contractAccountId: string) => {
    try {
        const details = nftCollections
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

export const setDetailsFromNftCollections = (data, contractAccountId: string) => {
    try {
        const details = nftCollections
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