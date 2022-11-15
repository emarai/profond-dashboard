// @ts-nocheck
import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
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

const OverviewDashboard = ({
    accountCreatedAt,
    associatedAuroraAddress,
    coinBalances,
    totalUSD,
    totalTransactions,
    totalReceivedTransactions,
    totalSignedTransactions,
    totalReflexiveTransactions,
    nftOverview,
    nftCollections,
    nearHistory
}) => {
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

export  default OverviewDashboard;