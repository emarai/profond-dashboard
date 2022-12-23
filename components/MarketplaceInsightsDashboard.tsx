// @ts-nocheck
import Card from 'antd/lib/card/Card'
import { Table } from 'antd'
import { numericToUSD } from '../lib/utils'
import dynamic from 'next/dynamic'
const ReactApexCharts = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

type CollectionInfo = {
    collection_slug: string
    chain: string
    amount_currency: string
    marketplace: string
    trading_volume: number
    buyer: number
    seller: number
    trading_amount: number
    transactions: number
}

const columnCollections: ColumnType<CollectionInfo> = [
    {
        title: 'Collection Slug',
        dataIndex: 'collection_slug',
        key: 'collection_slug',
    },
    {
        title: 'Chain',
        dataIndex: 'chain',
        key: 'chain',
    },
    {
        title: 'Trading Volume (USD)',
        dataIndex: 'trading_volume',
        key: 'trading_volume',
    },
    {
        title: 'Trading Amount',
        dataIndex: 'trading_amount',
        key: 'trading_amount',
    },
    {
        title: 'Amount Currency',
        dataIndex: 'amount_currency',
        key: 'amount_currency',
    },
    {
        title: 'Buyer',
        dataIndex: 'buyer',
        key: 'buyer',
    },
    {
        title: 'Seller',
        dataIndex: 'seller',
        key: 'seller',
    },
    {
        title: 'Transactions',
        dataIndex: 'transactions',
        key: 'transactions',
    },
]

const generateChainState = (
    chainStats,
    type: 'trading_volume' | 'number_of_transactions' | 'number_of_users'
) => {
    return {
        series: chainStats.map((chain) => chain[type]),
        options: {
            chart: {
                width: 1024,
                type: 'pie',
            },
            labels: chainStats.map((chain) => chain.chain),
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                    },
                },
            ],
        },
    }
}

const generateDailyStatsState = (dailyStats) => {
    const temp = {
        series: [
            {
                name: '',
                data: [],
            },
        ],
        options: {
            chart: {
                width: 1024,
                type: 'bar',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'date',
                },
                labels: {
                    show: true,
                    rotate: 0,
                },
            },
            yaxis: {
                title: {
                    text: '',
                },
            },
            fill: {
                opacity: 1,
                colors: []
            },
        },
    }

    const tradingValueState = (() => {
        let result = JSON.parse(JSON.stringify(temp))
        result.series[0].data = dailyStats.map((stat) => stat.trading_value)
        result.options.xaxis.categories = dailyStats.map((stat) => new Date(stat.timestamp).toDateString())
        result.options.yaxis.title.text = 'Volume (USD)'
        result.options.fill.colors = ['#87BE59']
        return result
    })()
    
    const transactionsState = (() => {
        let result = JSON.parse(JSON.stringify(temp))
        result.series[0].data = dailyStats.map((stat) => stat.number_of_transactions)
        result.options.xaxis.categories = dailyStats.map((stat) => new Date(stat.timestamp).toDateString())
        result.options.yaxis.title.text = 'Count'
        result.options.fill.colors = ['#213CAE']
        return result
    })()

    const dailyActiveUsersState = (() => {
        let result = JSON.parse(JSON.stringify(temp))
        result.series[0].data = dailyStats.map((stat) => stat.active_users)
        result.options.xaxis.categories = dailyStats.map((stat) => new Date(stat.timestamp).toDateString())
        result.options.yaxis.title.text = 'Addresses'
        result.options.fill.colors = ['#FFD77D']
        return result
    })()

    const sellersBuyersState = (() => {
        let result = JSON.parse(JSON.stringify(temp))
        result.series[0].name = 'Buyers'
        result.series[0].data = dailyStats.map((stat) => stat.buyers)
        result.series.push({name: 'Sellers', data: dailyStats.map((stat) => stat.sellers)})
        result.options.xaxis.categories = dailyStats.map((stat) => new Date(stat.timestamp).toDateString())
        result.options.fill.colors = ['#2E94DE', '#8F552E']
        return result
    })()



    return [tradingValueState, transactionsState, dailyActiveUsersState, sellersBuyersState]
}

export default function MarketplaceInsightsDashboard({
    topCollections,
    dailyStats,
    chainStats,
}) {
    topCollections.sort((a, b) => b.trading_volume - a.trading_volume)

    const tradingVolumeByChainState = generateChainState(
        chainStats,
        'trading_volume'
    )
    const totalTransactionsByChainState = generateChainState(
        chainStats,
        'number_of_transactions'
    )
    const totalUsersByChainState = generateChainState(
        chainStats,
        'number_of_users'
    )

    const totalTradingValue = chainStats.reduce(
        (a, c) => a + c.trading_volume,
        0
    )

    const totalTransactions = chainStats.reduce(
        (a, c) => a + c.number_of_transactions,
        0
    )

    const [tradingValueState, transactionsState, dailyActiveUsersState, sellersBuyersState] = generateDailyStatsState(dailyStats)

    const totalUsers = chainStats.reduce((a, c) => a + c.number_of_users, 0)

    return (
        <div className="text-left">
            <div className="flex my-1">
                <Card title="Top Collections (30D)" className="mx-1 w-full">
                    <Table
                        columns={columnCollections}
                        dataSource={topCollections}
                    />
                </Card>
            </div>
            <div className="flex my-1">
                <Card
                    title="Total Trading Volume by Chain"
                    className="mx-1 w-1/3"
                >
                    <ReactApexCharts
                        options={tradingVolumeByChainState.options}
                        series={tradingVolumeByChainState.series}
                        type="pie"
                        width={380}
                    />
                </Card>
                <Card
                    title="Total Transactions by Chain"
                    className="mx-1 w-1/3"
                >
                    <ReactApexCharts
                        options={totalTransactionsByChainState.options}
                        series={totalTransactionsByChainState.series}
                        type="pie"
                        width={380}
                    />
                </Card>
                <Card title="Total Users by Chain" className="mx-1 w-1/3">
                    <ReactApexCharts
                        options={totalUsersByChainState.options}
                        series={totalUsersByChainState.series}
                        type="pie"
                        width={380}
                    />
                </Card>
            </div>
            <div className="flex my-1">
                <Card title="Total Trading Value (USD)" className="mx-1 w-1/3">
                    {numericToUSD(totalTradingValue)}
                </Card>
                <Card title="Total Transactions" className="mx-1 w-1/3">
                    {numericToUSD(totalTransactions)}
                </Card>
                <Card title="Total Users" className="mx-1 w-1/3">
                    {numericToUSD(totalUsers)}
                </Card>
            </div>
            <div className="flex my-1">
                <Card title="Trading Value (USD)" className="mx-1 w-1/2">
                    <ReactApexCharts
                        options={tradingValueState.options}
                        series={tradingValueState.series}
                        type="bar"
                        width={768}
                    />
                </Card>
                <Card title="Transactions" className="mx-1 w-1/2">
                    <ReactApexCharts
                        options={transactionsState.options}
                        series={transactionsState.series}
                        type="bar"
                        width={768}
                    />
                </Card>
            </div>
            <div className="flex my-1">
                <Card title="Daily Active Users" className="mx-1 w-1/2">
                    <ReactApexCharts
                        options={dailyActiveUsersState.options}
                        series={dailyActiveUsersState.series}
                        type="bar"
                        width={768}
                    />
                </Card>
                <Card title="Sellers & Buyers" className="mx-1 w-1/2">
                    <ReactApexCharts
                        options={sellersBuyersState.options}
                        series={sellersBuyersState.series}
                        type="bar"
                        width={768}
                    />
                </Card>
            </div>
        </div>
    )
}
