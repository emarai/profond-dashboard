// @ts-nocheck
import { Card } from 'antd'
import { ColumnType } from 'antd/lib/table'
import Table from 'antd/lib/table'

type HotToken = {
    token_name: string
    volume: numeric
}

type DappUser = {
    protocol_name: string
    chain: string
    total_users: number
}

type DappTransaction = {
    protocol_name: string
    chain: string
    total_transactions: number
}

const columnHotNFTs: ColumnType<HotToken> = [
    {
        title: 'Collection',
        dataIndex: 'token_name',
        key: 'token_name',
    },
    {
        title: 'Volume (ETH)',
        dataIndex: 'volume',
        key: 'volume',
    },
]

const columnHotTokens: ColumnType<HotToken> = [
    {
        title: 'Token name',
        dataIndex: 'token_name',
        key: 'token_name',
    },
    {
        title: 'Volume (ETH)',
        dataIndex: 'volume',
        key: 'volume',
    },
]

const columnDappUniqueActiveUsers:  ColumnType<DappUser> = [
    {
        title: 'Protocol Name',
        dataIndex: 'protocol_name',
        key: 'protocol_name'
    },
    {
        title: 'Chain',
        dataIndex: 'chain',
        key: 'chain'
    },
    {
        title: 'Total Users',
        dataIndex: 'total_users',
        key: 'total_users'
    },
]


const columnDappMostActive:  ColumnType<DappTransaction> = [
    {
        title: 'Protocol Name',
        dataIndex: 'protocol_name',
        key: 'protocol_name'
    },
    {
        title: 'Chain',
        dataIndex: 'chain',
        key: 'chain'
    },
    {
        title: 'Total Transaction',
        dataIndex: 'total_transactions',
        key: 'total_transactions'
    },
]

export default function EthereumOverviewDashboard({ hotNFTs, hotTokens, dappsMostActive, dappsUniqueActiveUsers }) {

    hotNFTs.sort((a, b) => b.volume - a.volume)
    hotTokens.sort((a, b) => b.volume - a.volume)
    dappsMostActive.sort((a, b) => b.total_transactions - a.total_transactions)
    dappsUniqueActiveUsers.sort((a, b) => b.total_users - a.total_users)

    return (
        <div className="text-left">
            <div className="flex my-1">
                <Card title="Hot NFTs by Daily Volume" className="mx-1 w-6/12">
                    <Table columns={columnHotNFTs} dataSource={hotNFTs} />
                </Card>
                <Card
                    title="Hot Tokens by Daily Volume"
                    className="mx-1 w-6/12"
                >
                    <Table columns={columnHotTokens} dataSource={hotTokens} />
                </Card>
            </div>
            {/**
            <div className="flex my-1">
                <Card
                    title="Total Ethereum Transactions"
                    className="mx-1 w-6/12"
                >
                    2,448,476,493
                </Card>
                <Card
                    title="Unique Active Ethereum Users"
                    className="mx-1 w-6/12"
                >
                    156,420,528
                </Card>
            </div>
            <div className="flex my-1">
                <Card
                    title="Daily number of Ethereum Transactions"
                    className="mx-1 w-6/12"
                ></Card>
                <Card
                    title="Unique Active Users (ETH)"
                    className="mx-1 w-6/12"
                ></Card>
            </div>
            */}
            <div className="flex my-1">
                <Card title="Most Active Dapps" className="mx-1 w-6/12">
                    <Table 
                        columns={columnDappMostActive}
                        dataSource={dappsMostActive}
                    />
                </Card>
                <Card
                    title="Unique Active Users by Dapp"
                    className="mx-1 w-6/12"
                >
                    <Table 
                        columns={columnDappUniqueActiveUsers}
                        dataSource={dappsUniqueActiveUsers}
                    />
                </Card>
            </div>
        </div>
    )
}
