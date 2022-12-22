// @ts-nocheck
import Card from 'antd/lib/card/Card'
import dynamic from 'next/dynamic'
const ReactApexCharts = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const numericToUSD = (numeric) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(numeric)
}

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

export default function TVLOverviewDashboard({tvlOverview, tvlBreakdown}) {
    const tvlOverviewState = generateTvlOverviewState(tvlOverview.slice(-120)) // last 120 days

    return (
        <div className="text-left">
            <div className="flex my-1">
                <Card title="TVL Overview (NEAR)" className="mx-1 w-full">
                    <div className="mx-auto text-center border-2 border-black">
                        <div className="text-3xl">
                            {numericToUSD(tvlOverviewState.tvl_today)}
                        </div>
                        <p>TVL: 1d Change</p>
                        <p>change {(100 * (tvlOverviewState.tvl_today - tvlOverviewState.tvl_last_day) / tvlOverviewState.tvl_last_day).toFixed(2)}%</p>
                        <p>was {numericToUSD(tvlOverviewState.tvl_last_day)} last day</p>
                    </div>
                    <ReactApexCharts
                        series={tvlOverviewState.series}
                        options={tvlOverviewState.options}
                        type="area"
                    />
                </Card>
            </div>
            <div className="flex my-1">
                <Card title="TVL Top Gainer" className="mx-1 w-6/12"></Card>
                <Card title="TVL Top Loser" className="mx-1 w-6/12"></Card>
            </div>
        </div>
    )
}
