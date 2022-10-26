import fs from 'fs'
import { near } from '../src/api/near'

type TokenMetadata = {
    spec: string
    name: string
    symbol: string
    reference: string
    reference_hash: string
    decimal: string
}

const main = async () => {
    const account = await near.account('asd.near')
    const refSmartContract = 'v2.ref-finance.near'
    const whitelistedTokens = await account.viewFunction({
        contractId: refSmartContract,
        methodName: 'get_whitelisted_tokens',
        args: {},
    })
    const allTokenMetadata: TokenMetadata[] = await Promise.all(
        whitelistedTokens.map(async (tokenContract: string) => {
            return await account.viewFunction({
                contractId: tokenContract,
                methodName: 'ft_metadata',
                args: {},
            })
        })
    )

    console.log(allTokenMetadata)
    fs.writeFileSync(
        './config/near-tokens.json',
        JSON.stringify(allTokenMetadata, null, 2)
    )
}

main()
