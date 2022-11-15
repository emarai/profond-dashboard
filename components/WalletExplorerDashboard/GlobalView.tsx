// @ts-nocheck
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import OverviewDashboard from './OverviewDashboard'


const GlobalView = () => {
    const [response, setResponse] = useState(null)
    const [coinBalances, setCoinBalances] = useState([])
    const [totalUSD, setTotalUSD] = useState([])
    const [nftOverview, setNftOverview] = useState([])
    const [nftCollections, setNftCollections] = useState([])
    const [nearHistory, setNearHistory] = useState([])
    const router = useRouter()
    const accountId = router.query.id

    useEffect(() => {
        if (accountId) {
            const fetchData = async () => {
                const dataCoinBalances = await fetch(
                    '/api/coin-balances?' +
                        new URLSearchParams({
                            account_id: accountId,
                        }),
                    {
                        method: 'GET',
                    }
                )

                const jsonDataCoinBalances = await dataCoinBalances.json()

                setCoinBalances(jsonDataCoinBalances.coinBalances)
                setTotalUSD(jsonDataCoinBalances.totalUSD)

                const dataNftOverview = await fetch(
                    '/api/nft-overview?' +
                        new URLSearchParams({
                            account_id: accountId,
                        }),
                    {
                        method: 'GET',
                    }
                )

                const jsonNftOverview = await dataNftOverview.json()

                setNftOverview(jsonNftOverview.nft_counts)

                const dataNftCollections = await fetch(
                    '/api/nft-collection?' +
                        new URLSearchParams({
                            account_id: accountId,
                            contract_account_id: 'x.paras.near',
                        }),
                    {
                        method: 'GET',
                    }
                )

                const jsonNftCollections = await dataNftCollections.json()

                setNftCollections(jsonNftCollections.nfts.slice(0, 10))

                const dataNearHistory = await fetch(
                    '/api/near-history?' +
                        new URLSearchParams({
                            account_id: accountId,
                        }),
                    {
                        method: 'GET',
                    }
                )

                const jsonNearHistory = await dataNearHistory.json()

                setNearHistory(jsonNearHistory.history.filter(history => history.involved_account_id !== null))

                const dataWalletProfile = await fetch(
                    '/api/wallet-profile?' +
                        new URLSearchParams({
                            account_id: accountId,
                        }),
                    {
                        method: 'GET',
                    }
                )

                const jsonWalletProfile = await dataWalletProfile.json()
                setResponse({
                    walletProfile: jsonWalletProfile,
                })

                const dataAssociatedAurora = await fetch(
                    '/api/associated-aurora?' +
                        new URLSearchParams({
                            account_id: accountId,
                        }),
                    {
                        method: 'GET',
                    }
                )
                const jsonAssociatedAurora = await dataAssociatedAurora.json()

                setResponse({
                    walletProfile: jsonWalletProfile,
                    associatedAuroraAddress: jsonAssociatedAurora,
                })
            }
            fetchData().catch(console.error)
        }
    }, [accountId])

    const accountCreatedAt = new Date(
        response?.walletProfile.account_created_at
    ).toDateString()
    const totalTransactions = response?.walletProfile.total_transactions
    const totalSignedTransactions =
        response?.walletProfile.total_signed_transactions
    const totalReceivedTransactions =
        response?.walletProfile.total_received_transactions
    const totalReflexiveTransactions =
        response?.walletProfile.total_reflexive_transactions
    const associatedAuroraAddress = response?.associatedAuroraAddress
    return (<OverviewDashboard 
        accountCreatedAt={accountCreatedAt}
        associatedAuroraAddress={associatedAuroraAddress}
        coinBalances={coinBalances}
        totalUSD={totalUSD}
        totalTransactions={totalTransactions}
        totalReceivedTransactions={totalReceivedTransactions}
        totalSignedTransactions={totalSignedTransactions}
        totalReflexiveTransactions={totalReflexiveTransactions}
        nftOverview={nftOverview}
        nftCollections={nftCollections}
        nearHistory={nearHistory}
    />)
}
export default GlobalView
