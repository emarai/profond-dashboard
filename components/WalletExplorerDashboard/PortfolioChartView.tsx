// @ts-nocheck
import dynamic from 'next/dynamic'
const ReactApexCharts = dynamic(() => import('react-apexcharts'), {ssr: false});

const PortfolioChartView = ({coinBalances}) => {
    coinBalances = coinBalances.filter(coin => parseFloat(coin.usd).toFixed(2) !== '0.00')
    const state = {
        series: coinBalances.map((coin) => parseFloat(parseFloat(coin.usd).toFixed(2))),
        options: {
            chart: {
                width: 1024,
                type: 'pie',
            },
            labels: coinBalances.map((coin) => coin.coin),
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
    console.log(state)

    return (
        <ReactApexCharts
            options={state.options}
            series={state.series}
            type="pie"
            width={380}
        />
    )
}

export default PortfolioChartView
