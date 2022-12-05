// @ts-nocheck
import React, { useEffect, useState } from 'react'
import BulkWhaleForm from '../components/BulkWhaleForm'
import WhaleOverviewDashboard from '../components/WhaleExplorerDashboard/WhaleOverviewDashboard'

const WhaleExplorer = () => {
    const [wallets, setWallets] = useState([])
    const [coinBalancesAggregated, setCoinBalancesAggregated] = useState([])
    const [aggregatedTotalUSD, setAggregatedTotalUSD] = useState(0.0)
    const [coinBalanceHighest, setCoinBalanceHighest] = useState([])
    const [coinBalanceFlat, setCoinBalanceFlat] = useState([])
    const [walletProfileAggregated, setWalletProfileAggregated] = useState([])
    const [nftOverviewFlat, setNftOverviewFlat]= useState([])
    const [nearHistoryFlat, setNearHistoryFlat] = useState([])

    useEffect(() => {
        if (wallets.length > 0) {
            const fetchData = async () => {
                const accountBalances = await Promise.all(
                    wallets.map(async (accountId) => {
                        const dataCoinBalances = await fetch(
                            '/api/coin-balances?' +
                                new URLSearchParams({
                                    account_id: accountId,
                                }),
                            {
                                method: 'GET',
                            }
                        )

                        return {
                            ...(await dataCoinBalances.json()),
                            accountId: accountId,
                        }
                    })
                )

                let coinBalancesAggregatedTemp = []
                let coinBalanceHighestTemp = []
                let coinBalanceFlatTemp = []

                let totalUSDTemp = 0.0

                for (const accountBalance of accountBalances) {
                    coinBalanceHighestTemp.push({
                        accountId: accountBalance.accountId,
                        totalUSD: accountBalance.totalUSD
                    })
                    for (const coinBalance of accountBalance.coinBalances) {
                        let processed = false
                        coinBalanceFlatTemp.push({
                            ...coinBalance,
                            accountId: accountBalance.accountId
                        })
                        for (const coinRow of coinBalancesAggregatedTemp) {
                            if (coinRow.contractId === coinBalance.contractId) {
                                coinRow.amount = parseFloat(coinBalance.amount)
                                coinRow.usd += parseFloat(coinBalance.usd)
                                totalUSDTemp += parseFloat(coinBalance.usd)
                                processed = true
                                break
                            }
                        }
                        if (!processed) {
                            coinBalancesAggregatedTemp.push({
                                ...coinBalance,
                                usd: parseFloat(coinBalance.usd)
                            })
                        }
                    }
                }
                coinBalanceHighestTemp.sort((a, b) => (a.totalUSD < b.totalUSD ? 1 : -1))

                setCoinBalancesAggregated(coinBalancesAggregatedTemp)
                setCoinBalanceHighest(coinBalanceHighestTemp)
                setCoinBalanceFlat(coinBalanceFlatTemp)

                setAggregatedTotalUSD(totalUSDTemp)

                const nftOverviews = await Promise.all(
                    wallets.map(async (accountId) => {
                        const dataNftOverview = await fetch(
                            '/api/nft-overview?' +
                                new URLSearchParams({
                                    account_id: accountId,
                                }),
                            {
                                method: 'GET',
                            }
                        )

                        return await dataNftOverview.json()
                    })
                )

                let nftOverviewFlatTemp = []
                for (const nftOverview of nftOverviews) {
                    for (const nftCount of nftOverview.nft_counts) {
                        nftOverviewFlatTemp.push({
                            ...nftCount,
                            accountId: nftOverview.account_id
                        })
                    }
                }
                setNftOverviewFlat(nftOverviewFlatTemp)

                const nearHistories = await Promise.all(
                    wallets.map(async (accountId) => {
                        const dataNearHistory = await fetch(
                            '/api/near-history?' +
                                new URLSearchParams({
                                    account_id: accountId,
                                }),
                            {
                                method: 'GET',
                            }
                        )

                        return {
                            ...await dataNearHistory.json(),
                            accountId: accountId
                        }
                    })
                )

                let nearHistoryFlatTemp = []
                for (const nearHistory of nearHistories) {
                    for (const nearEvent of nearHistory.history) {
                        nearHistoryFlatTemp.push({...nearEvent, accountId: nearHistory.accountId})
                    }
                }

                setNearHistoryFlat(nearHistoryFlatTemp)

                let walletProfileAggregatedTemp = {
                    total_received_transactions: 0,
                    total_reflexive_transactions: 0,
                    total_signed_transactions: 0,
                    total_transactions: 0
                }

                const walletProfiles = await Promise.all(
                    wallets.map(async (accountId) => {
                        const dataWalletProfile = await fetch(
                            '/api/wallet-profile?' +
                                new URLSearchParams({
                                    account_id: accountId,
                                }),
                            {
                                method: 'GET',
                            }
                        )

                        return await dataWalletProfile.json()
                    })
                )

                walletProfiles.map(walletProfile => {
                    walletProfileAggregatedTemp.total_received_transactions += walletProfile.total_received_transactions;
                    walletProfileAggregatedTemp.total_reflexive_transactions += walletProfile.total_reflexive_transactions;
                    walletProfileAggregatedTemp.total_signed_transactions += walletProfile.total_signed_transactions;
                    walletProfileAggregatedTemp.total_transactions += walletProfile.total_transactions;
                })

                setWalletProfileAggregated(walletProfileAggregatedTemp)
            }
            fetchData().catch(console.error)
        }
    }, [wallets])

    return (
        <>
            {wallets.length == 0 ? (
                <BulkWhaleForm setWalletHandler={setWallets} />
            ) : (
                <WhaleOverviewDashboard
                    coinBalancesAggregated={coinBalancesAggregated}
                    aggregatedTotalUSD={aggregatedTotalUSD}
                    coinBalanceHighest={coinBalanceHighest}
                    coinBalanceFlat={coinBalanceFlat}
                    totalTransactions={walletProfileAggregated.total_transactions}
                    totalReceivedTransactions={walletProfileAggregated.total_received_transactions}
                    totalSignedTransactions={walletProfileAggregated.total_signed_transactions}
                    totalReflexiveTransactions={walletProfileAggregated.total_reflexive_transactions}
                    nftOverviewFlat={nftOverviewFlat}
                    nearHistoryFlat={nearHistoryFlat}
                />
            )}
        </>
    )
}

export default WhaleExplorer
