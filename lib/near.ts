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