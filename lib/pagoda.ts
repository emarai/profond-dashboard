import axios from 'axios'

export const getWalletNFTOverview = async (accountId: string) => {
    const res = await axios.get(`${process.env.PAGODA_ENHANCED_API_URL}/accounts/${accountId}/NFT`, {
        headers: {
            "x-api-key": process.env.PAGODA_API_KEY
        },
        params: {
            limit: 100
        }
    })
    return res.data
}

export const getUserNFTCollectionIdByContract = async (accountId: string, contractAccountId: string) => {
    const res = await axios.get(`${process.env.PAGODA_ENHANCED_API_URL}/accounts/${accountId}/NFT/${contractAccountId}`, {
        headers: {
            "x-api-key": process.env.PAGODA_API_KEY
        },
        params: {
            limit: 100
        }
    })
    return res.data
}

export const getUserCoinBalances = async (accountId: string) => {
    const res = await axios.get(`${process.env.PAGODA_ENHANCED_API_URL}/accounts/${accountId}/coins`, {
        headers: {
            "x-api-key": process.env.PAGODA_API_KEY
        },
        params: {
            limit: 100
        }
    })
    return res.data
}

export const getNEARHistory = async (accountId: string) => {
    const res = await axios.get(`${process.env.PAGODA_ENHANCED_API_URL}/accounts/${accountId}/coins/NEAR/history`, {
        headers: {
            "x-api-key": process.env.PAGODA_API_KEY
        },
        params: {
            limit: 100
        }
    })
    return res.data
}

export const getUserCoinHistory = async (accountId: string, contractAccountId: string) => {
    const res = await axios.get(`${process.env.PAGODA_ENHANCED_API_URL}/accounts/${accountId}/coins/${contractAccountId}/history`, {
        headers: {
            "x-api-key": process.env.PAGODA_API_KEY
        },
        params: {
            limit: 100
        }
    })
    return res.data
}