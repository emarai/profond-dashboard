import { near } from '../src/api/near'

type TokenMetadata = {
    spec: string
    name: string
    symbol: string
    reference: string
    reference_hash: string
    decimal: string
    contract_id: string
}

const main = async () => {
    const nearTokens: TokenMetadata[] = require('../config/near-tokens.json')
    const account = await near.account('asd.near')
    const accountId = "irfi.near"
    const allBalance = await Promise.all(
        nearTokens.map(async (tokenContract: TokenMetadata) => {
            return await account.viewFunction({
                contractId: tokenContract.contract_id,
                methodName: 'ft_balance_of',
                args: {"account_id": accountId},
            })
        })
    )
    console.log(allBalance)
}

main()
