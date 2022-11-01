import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

type Wallet = {
    key: number
    address: string
    usdValue: string
    totalEth: string
    totalEthValue: string
    totalNumberofERC20: number
    totalDollarValueofERC20: string
    delta24H: number
}

const columns: ColumnsType<Wallet> = [
    {
        title: '#',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'WALLET ADDRESS',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'USD VALUE',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'WALLET ADDRESS',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'WALLET ADDRESS',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'WALLET ADDRESS',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'WALLET ADDRESS',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'WALLET ADDRESS',
        dataIndex: 'address',
        key: 'address',
    },
]

const data: Wallet[] = [
    {
        key: 1,
        address: 'irfi.near',
        usdValue: '$516,563,925',
        totalEth: '325,000',
        totalEthValue: '$516,563,620',
        totalNumberofERC20: 20,
        totalDollarValueofERC20: '$305',
        delta24H: 4
    },
]

const Whale = () => {
    return (
        <div className="text-left">
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
export default Whale
