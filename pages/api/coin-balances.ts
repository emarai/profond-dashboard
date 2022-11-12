// @ts-nocheck
import nearTokens from '../../config/near-tokens.json'
import { getCoinBalance, getNEARBalance } from './../../lib/near'
import axios from 'axios'

const listTokenPriceFromREF = async () => {
    const res = await axios.get('https://indexer.ref.finance/list-token-price')
    return res.data
}
export default async function handler(req, res) {
    const accountId = req.query.account_id
    const tokenPrice = await listTokenPriceFromREF()

    let coinBalances = await Promise.all(
        nearTokens.map(async (token) => {
            const coinAmount = await getCoinBalance(
                accountId,
                token.contract_id
            )
            const coinAmountDivided = coinAmount / 10 ** token.decimals
            if (coinAmountDivided > 0) {
                return {
                    coin: token.symbol,
                    contractId: token.contract_id,
                    amount: coinAmountDivided,
                    usd: parseFloat(
                        tokenPrice[token.contract_id]?.price * coinAmountDivided
                    ).toFixed(2),
                    icon: token.icon
                }
            }
        })
    )
    const nearBalance = (await getNEARBalance(accountId)) / 10 ** 24
    coinBalances.push({
        coin: 'NEAR',
        amount: nearBalance,
        usd: tokenPrice['wrap.near'].price * nearBalance,
        icon: nearTokens[0].icon //hack
    })
    coinBalances = coinBalances.filter((coin) => coin)
    coinBalances.sort((a, b) => (a.usd < b.usd ? 1 : -1))

    const result = {
        coinBalances: coinBalances,
        totalUSD: coinBalances.reduce((a, b) => {
            return a + b.usd
        }, 0),
    }
    res.status(200).json(result)
}
