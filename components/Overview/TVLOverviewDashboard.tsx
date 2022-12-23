// @ts-nocheck
import Card from 'antd/lib/card/Card'
import { ColumnType } from 'antd/lib/table'
import Table from 'antd/lib/table'
import dynamic from 'next/dynamic'
import { numericToUSD } from '../../lib/utils'
const ReactApexCharts = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const generateTvlOverviewState = (tvlOverview) => {
    return {
        tvl_today: tvlOverview[tvlOverview.length - 1]?.tvl,
        tvl_last_day: tvlOverview[tvlOverview.length - 2]?.tvl,
        series: [
            {
                data: tvlOverview.map((tvl) => {
                    return [new Date(tvl.date).getTime(), tvl.tvl]
                }),
            },
        ],
        options: {
            chart: {
                type: 'area',
                id: 'area-datetime',
                height: 350,
                zoom: {
                    autoScaleYaxios: true,
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                title: {
                    text: 'date',
                },
                type: 'datetime',
                tickAmount: 6,
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy',
                },
            },
            markers: {
                size: 0,
                style: 'hollow',
            },
            yaxis: {
                labels: {
                    formatter: (value) => {
                        return numericToUSD(value)
                    },
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 100],
                },
            },
        },
    }
}

type TvlDefi = {
    chain: string
    name: string
    category: string
    tvl: number
    daily_change: number
}

const columnTvlBreakdown: ColumnType<TvlDefi> = [
    {
        title: 'Chain',
        dataIndex: 'chain',
        key: 'chain',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'tvl($)',
        dataIndex: 'tvl',
        key: 'tvl',
    },
    {
        title: '24h change',
        dataIndex: 'daily_change',
        key: 'daily_change',
        render: (text, record) => {
            return `${(record.daily_change * 100).toFixed(2)}%`
        },
    },
]

export default function TVLOverviewDashboard({ tvlOverview, tvlBreakdown }) {
    const tvlOverviewState = generateTvlOverviewState(tvlOverview.slice(-120)) // last 120 days

    tvlBreakdown.sort((a, b) => a.daily_change - b.daily_change)
    const tvlTopGainer = tvlBreakdown.slice(-10)
    const tvlTopLoser = tvlBreakdown.slice(0, 10)

    tvlTopGainer.sort((a, b) => b.daily_change - a.daily_change)

    return (
        <div className="text-left">
            <div className="flex my-1">
                <Card title="TVL Overview (NEAR)" className="mx-1 w-full">
                    <div className="mx-auto text-center border-2 border-black">
                        <div className="text-3xl">
                            {numericToUSD(tvlOverviewState.tvl_today)}
                        </div>
                        <p>TVL: 1d Change</p>
                        <p>
                            change{' '}
                            {(
                                (100 *
                                    (tvlOverviewState.tvl_today -
                                        tvlOverviewState.tvl_last_day)) /
                                tvlOverviewState.tvl_last_day
                            ).toFixed(2)}
                            %
                        </p>
                        <p>
                            was {numericToUSD(tvlOverviewState.tvl_last_day)}{' '}
                            last day
                        </p>
                    </div>
                    <ReactApexCharts
                        series={tvlOverviewState.series}
                        options={tvlOverviewState.options}
                        type="area"
                    />
                </Card>
            </div>
            <div className="flex my-1">
                <Card title="TVL Top Gainer" className="mx-1 w-6/12">
                    <Table
                        columns={columnTvlBreakdown}
                        dataSource={tvlTopGainer}
                    />
                </Card>
                <Card title="TVL Top Loser" className="mx-1 w-6/12">
                    <Table
                        columns={columnTvlBreakdown}
                        dataSource={tvlTopLoser}
                    />
                </Card>
            </div>
        </div>
    )
}
