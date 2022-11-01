import { Card } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'

type IHolding = {
    coin: string
    avgAmountHeld: string
    avgQuantityHeld: number
}

const columns: ColumnsType<IHolding> = [
    {
        title: 'NAME',
        dataIndex: 'coin',
        key: 'coin',
    },
    {
        title: 'AVG AMT HELD',
        dataIndex: 'avgAmountHeld',
        key: 'avgAmountHeld',
    },
    {
        title: 'AVG QTY HELD',
        dataIndex: 'avgQuantityHeld',
        key: 'avgQuantityHeld',
    },
]

const data: IHolding[] = [
    {
        coin: 'ETH',
        avgAmountHeld: '$24,833,466',
        avgQuantityHeld: 15626,
    },
]

const Holding = () => {
    return (
        <div className="text-left">
            <div className="flex my-1">
                <Card title="Top 10 holdings" className="mx-1 w-6/12">
                    <Table columns={columns} dataSource={data} />
                </Card>
                <Card
                    title="Top 10 small cap holdings (<$100 million)"
                    className="mx-1 w-6/12"
                >
                    <Table columns={columns} dataSource={data} />
                </Card>
            </div>
            <Card
                title="Total holdings of all tokens - excluding ETH"
                className="mx-1 "
            >
            </Card>
        </div>
    )
}
export default Holding
