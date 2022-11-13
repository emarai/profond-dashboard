// @ts-nocheck
import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { data } from 'autoprefixer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PortfolioChartView from './PortfolioChartView'

type Balance = {
    coin: string
    amount: number
    usd: number
}

type NFTOverview = {
    name: string
    count: number
}

type NFT = {
    title: string
    token_id: string
    parasLink: string
    collection: string
}

type NEARHistory = {
    involvedAccountId: string
    deltaBalance: string
    currentBalance: string
}

const columnsCoinBalance: ColumnsType<Balance> = [
    {
        title: 'Coin',
        dataIndex: 'coin',
        key: 'coin',
        render: (text, record) => {
            return (
                <div className="flex">
                    <img className="w-[25px]" src={record.icon} />
                    <a
                        className="ml-1 my-auto"
                        href={`https://explorer.near.org/accounts/${record.contractId}`}
                        target="_blank"
                    >
                        {text}
                    </a>
                </div>
            )
        },
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'USD',
        dataIndex: 'usd',
        key: 'usd',
    },
]

const columnsNftOverview: ColumnsType<NFTOverview> = [
    {
        title: 'Collection',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
            return (
                <div className="flex">
                    <img
                        className="w-[25px]"
                        src={record.contract_metadata.icon}
                    />
                    <a
                        className="ml-1 my-auto"
                        href={`https://paras.id/collection/${record.contract_account_id}`}
                        target="_blank"
                    >
                        {record.contract_metadata.name}
                    </a>
                </div>
            )
        },
    },
    {
        title: 'Hold',
        dataIndex: 'nft_count',
        key: 'count',
    },
]

const columnsNftCollections: ColumnsType<NFT> = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
            return (
                <div className="flex">
                    <img
                        className="w-[25px]"
                        src={`https://gateway.pinata.cloud/ipfs/${record.metadata.media}`}
                    />
                    <p>{record.metadata.title}</p>
                </div>
            )
        },
    },
    {
        title: 'Collection',
        dataIndex: 'collection',
        key: 'collection',
        render: (text, record) => {
            return 'Paras collectibles'
        },
    },
    {
        title: 'URL',
        dataIndex: 'token_id',
        key: 'token_id',
        render: (text, record) => {
            const contractId = 'x.paras.near'
            return (
                <a
                    target="_blank"
                    href={`https://paras.id/token/${contractId}::${text}/${text}`}
                >
                    Click here
                </a>
            )
        },
    },
]

const columnsNearHistory: ColumnsType<NEARHistory> = [
    {
        title: 'Involved Account Id',
        dataIndex: 'involved_account_id',
        key: 'involvedAccountId',
    },
    {
        title: 'Delta',
        dataIndex: 'delta_balance',
        key: 'deltaBalance',
        render: (text, record) => {
            return parseFloat(text / 10 ** 24).toFixed(2)
        },
    },
    {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'currentBalance',
        render: (text, record) => {
            return parseFloat(text / 10 ** 24).toFixed(2)
        },
    },
]

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
    return (
        <div className="text-left">
            <div className="flex my-1">
                <Card title="Created At" className="mx-1 w-6/12">
                    <p>{accountCreatedAt}</p>
                </Card>
                <Card
                    title="Aurora/Ethereum Linked Address"
                    className="mx-1 w-6/12"
                >
                    <p>{associatedAuroraAddress}</p>
                </Card>
            </div>
            <div className="flex">
                <Card title="Portfolio (USD)" className="mx-1 w-6/12">
                    <PortfolioChartView
                        coinBalances={coinBalances}
                    ></PortfolioChartView>
                </Card>
                <Card title="Balances" className="mx-1 w-6/12">
                    <Table
                        columns={columnsCoinBalance}
                        dataSource={coinBalances}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 240 }}
                    />
                    Total <b>{parseFloat(totalUSD).toFixed(2)} USD</b>
                </Card>
            </div>
            <div className="flex my-1">
                <Card title="Total Transactions" className="mx-1 w-3/12">
                    <p>{totalTransactions}</p>
                </Card>
                <Card title="Received" className="mx-1 w-3/12">
                    <p>{totalReceivedTransactions}</p>
                </Card>
                <Card title="Signed" className="mx-1 w-3/12">
                    <p>{totalSignedTransactions}</p>
                </Card>
                <Card title="Reflexive" className="mx-1 w-3/12">
                    <p>{totalReflexiveTransactions}</p>
                </Card>
            </div>
            <div className="flex">
                <Card title="NFT Overview" className="mx-1 w-6/12">
                    <Table
                        columns={columnsNftOverview}
                        dataSource={nftOverview}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="NFT Collections" className="mx-1 w-6/12">
                    <Table
                        columns={columnsNftCollections}
                        dataSource={nftCollections}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 240 }}
                    />
                </Card>
            </div>
            <div>
                <Card title="NEAR History" className="mx-1 w-full">
                    <Table
                        columns={columnsNearHistory}
                        dataSource={nearHistory}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 240 }}
                    />
                </Card>
            </div>
        </div>
    )
}
export default GlobalView
