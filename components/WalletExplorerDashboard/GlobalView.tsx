import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import PortfolioChartView from './PortfolioChartView'

type Balance = {
    coin: string
    amount: number
}

const columns: ColumnsType<Balance> = [
    {
        title: 'Coin',
        dataIndex: 'coin',
        key: 'coin',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
]

const data: Balance[] = [
    {
        coin: 'NEAR',
        amount: 60.17,
    },
    {
        coin: 'GOLD',
        amount: 1000,
    },
    {
        coin: 'PARAS',
        amount: 338.36,
    },
    {
        coin: 'wNEAR',
        amount: 0.025,
    },
]

const GlobalView = () => {
    return (
        <div className="text-left">
            <div className="flex my-1">
                <Card title="Created At" className="mx-1 w-6/12">
                    <p>11:20:50 Feb 08 2022 UTC</p>
                </Card>
                <Card
                    title="Aurora/Ethereum Linked Address"
                    className="mx-1 w-6/12"
                >
                    <p>None</p>
                </Card>
            </div>
            <div className="flex">
                <Card title="Portfolio" className="mx-1 w-6/12">
                    <PortfolioChartView></PortfolioChartView>
                </Card>

                <Card title="Balances" className="mx-1 w-6/12">
                    <Table columns={columns} dataSource={data} />
                </Card>
            </div>
            <div className="flex my-1">
                <Card title="Total Transactions" className="mx-1 w-3/12">
                    <p>149</p>
                </Card>
                <Card title="Received" className="mx-1 w-3/12">
                    <p>4</p>
                </Card>
                <Card title="Signed" className="mx-1 w-3/12">
                    <p>56</p>
                </Card>
                <Card title="Reflexive" className="mx-1 w-3/12">
                    <p>89</p>
                </Card>
            </div>
            <div className="flex">
                <Card title="Daily Number of Transactions" className="mx-1 w-full">
                </Card>
            </div>
        </div>
    )
}
export default GlobalView
