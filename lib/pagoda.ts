import { getDetailsFromCollection, getDetailsFromCollectionWithContract, setDetailsFromCollection, setDetailsFromCollectionWithContract } from './mongodb'
import axios from 'axios'

export const getWalletNFTOverview = async (accountId: string) => {
    const walletNFTOverview = await getDetailsFromCollection(
        accountId,
        'nft-overview'
    )

    if (!walletNFTOverview) {
        let res = await axios.get(
            `${process.env.PAGODA_ENHANCED_API_URL}/accounts/${accountId}/NFT`,
            {
                headers: {
                    'x-api-key': process.env.PAGODA_API_KEY,
                },
                params: {
                    limit: 100,
                },
            }
        )
        res.data.account_id = accountId
        res.data.updated_at = new Date().getTime()

        await setDetailsFromCollection(res.data, "nft-overview")
        return res.data
    } else {
        return walletNFTOverview
    }
}

export const getUserNFTCollectionByContract = async (
    accountId: string,
    contractAccountId: string
) => {
    const nftCollectionsForUser = await getDetailsFromCollectionWithContract(
        accountId,
        contractAccountId,
        'nft-collections'
    )

    if (!nftCollectionsForUser) {
        const res = await axios.get(
            `${process.env.PAGODA_ENHANCED_API_URL}/accounts/${accountId}/NFT/${contractAccountId}`,
            {
                headers: {
                    'x-api-key': process.env.PAGODA_API_KEY,
                },
                params: {
                    limit: 100,
                },
            }
        )
        res.data.account_id = accountId,
        res.data.updated_at = new Date().getTime()

        await setDetailsFromCollectionWithContract(res.data, contractAccountId, "nft-collections");
    } else {
        return nftCollectionsForUser
    }
}

export const getUserCoinBalances = async (accountId: string) => {
    const res = await axios.get(
        `${process.env.PAGODA_ENHANCED_API_URL}/accounts/${accountId}/coins`,
        {
            headers: {
                'x-api-key': process.env.PAGODA_API_KEY,
            },
            params: {
                limit: 100,
            },
        }
    )
    return res.data
}

export const getNEARHistory = async (accountId: string) => {
    const res = await axios.get(
        `${process.env.PAGODA_ENHANCED_API_URL}/accounts/${accountId}/coins/NEAR/history`,
        {
            headers: {
                'x-api-key': process.env.PAGODA_API_KEY,
            },
            params: {
                limit: 100,
            },
        }
    )
    return res.data
}

export const getUserCoinHistory = async (
    accountId: string,
    contractAccountId: string
) => {
    const res = await axios.get(
        `${process.env.PAGODA_ENHANCED_API_URL}/accounts/${accountId}/coins/${contractAccountId}/history`,
        {
            headers: {
                'x-api-key': process.env.PAGODA_API_KEY,
            },
            params: {
                limit: 100,
            },
        }
    )
    return res.data
}
