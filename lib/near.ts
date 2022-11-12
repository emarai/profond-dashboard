import * as naj from 'near-api-js'

const nearConfig = {
    networkId: 'mainnet',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://wallet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
}

export const near = new naj.Near({
    ...nearConfig,
    keyStore:
        typeof window === 'undefined'
            ? new naj.keyStores.InMemoryKeyStore()
            : new naj.keyStores.BrowserLocalStorageKeyStore(),
})

export const wallet = new naj.WalletConnection(near, null)

export const getCoinBalance = async (
    accountId: string,
    contractAccountId: string
) => {
	const masterAccount = await near.account('')
    const balance = await masterAccount.viewFunction({
        contractId: contractAccountId,
        methodName: 'ft_balance_of',
        args: {
            account_id: accountId,
        },
    })
    return balance
}

export const getNEARBalance = async (accountId: string) => {
	const masterAccount = await near.account(accountId)
    const balance = await masterAccount.getAccountBalance();
    return balance.total;
}