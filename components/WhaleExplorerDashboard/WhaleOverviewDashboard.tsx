// @ts-nocheck
import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import PortfolioChartView from '../WalletExplorerDashboard/PortfolioChartView'

type Balance = {
    coin: string
    amount: number
    usd: number
    totalUSD: number
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

const columnsCoinBalancePerAccount: ColumnsType<Balance> = [
    {
        title: 'Wallet Address',
        dataIndex: 'accountId',
        key: 'accountId',
    },
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

const columnsHighestBalance: ColumnsType<Balance> = [
    {
        title: 'Wallet Address',
        dataIndex: 'accountId',
        key: 'accountId',
        render: (text, record) => {
            return <a target="_blank" href={`/wallet/${text}`}>{text}</a>
        }
    },
    {
        title: 'Total USD',
        dataIndex: 'totalUSD',
        key: 'totalUSD',
    },
]

const columnsNftOverview: ColumnsType<NFTOverview> = [
    {
        title: 'Wallet Address',
        dataIndex: 'accountId',
        key: 'accountId',
    },
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
    }
]

const columnsNearHistory: ColumnsType<NEARHistory> = [
    {
        title: 'Wallet Address',
        dataIndex: 'accountId',
        key: 'accountId',
    },
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

const WhaleOverviewDashboard = ({
    coinBalancesAggregated,
    aggregatedTotalUSD,
    coinBalanceHighest,
    coinBalanceFlat,
    totalTransactions,
    totalReceivedTransactions,
    totalSignedTransactions,
    totalReflexiveTransactions,
    nftOverviewFlat,
    nearHistoryFlat,
}) => {
    return (
        <div className="text-left">
            <div className="flex my-1"></div>
            <div className="flex">
                <Card
                    title="Portfolio Aggregated (USD)"
                    className="mx-1 w-6/12"
                >
                    <PortfolioChartView
                        coinBalances={coinBalancesAggregated}
                    ></PortfolioChartView>
                </Card>
                <Card title="Balances Aggregated" className="mx-1 w-6/12">
                    <Table
                        columns={columnsCoinBalance}
                        dataSource={coinBalancesAggregated}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 240 }}
                    />
                    Total <b>{parseFloat(aggregatedTotalUSD).toFixed(2)} USD</b>
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
            <div>
                <Card title="Highest Balance" className="mx-1 w-full">
                    <Table
                        columns={columnsHighestBalance}
                        dataSource={coinBalanceHighest}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 240 }}
                    />
                </Card>
            </div>
            <div>
                <Card title="Balances per Account" className="mx-1 w-full">
                    <Table
                        columns={columnsCoinBalancePerAccount}
                        dataSource={coinBalanceFlat}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 240 }}
                    />
                </Card>
            </div>
            <div>
                <Card title="NEAR History" className="mx-1 w-full">
                    <Table
                        columns={columnsNearHistory}
                        dataSource={nearHistoryFlat}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 240 }}
                    />
                </Card>
            </div>
            <div className="flex">
                <Card title="NFT Overview" className="mx-1">
                    <Table
                        columns={columnsNftOverview}
                        dataSource={nftOverviewFlat}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 240 }}
                    />
                </Card>
            </div>
        </div>
    )
}

export default WhaleOverviewDashboard
