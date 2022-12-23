// @ts-nocheck
import { Card } from 'antd'
import dynamic from 'next/dynamic'
import { numericToUSD } from '../lib/utils'
const ReactApexCharts = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const generateExchangeTokenState = (
    tokenTransactions,
    type: 'withdraws' | 'deposits'
) => {
    const tokenDeposits = tokenTransactions.filter((deposit) => {
        return deposit.transaction_type == type
    })

    return {
        series: [
            {
                name: type,
                data: tokenDeposits.map((deposit) => deposit.value),
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
                categories: tokenDeposits.map((deposit) =>
                    new Date(deposit.timestamp).toDateString()
                ),
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
                    text: type,
                },
            },
            fill: {
                opacity: 1,
                colors: [type == 'deposits' ? '#A98BC2' : '#87BE59'],
            },
        },
    }
}

const generateExchangeFlowState = (tokenFlows, type: 'stablecoin' | 'eth') => {
    const tokenFlowsFiltered = tokenFlows.filter((tokenFlow) => {
        return tokenFlow.token_name === type
    })

    const tokenInflows = tokenFlowsFiltered.filter((tokenFlow) => {
        return tokenFlow.value > 0
    })

    const tokenOutflows = tokenFlowsFiltered.filter((tokenFlow) => {
        return tokenFlow.value < 0
    })

    return {
        series: [
            {
                name: 'Inflow',
                data: tokenInflows.map((tokenFlow) => tokenFlow.value),
                color: '#0094F6'
            },
            {
                name: 'Outflow',
                data: tokenOutflows.map((tokenFlow) => Math.abs(tokenFlow.value)),
                color: '#D2042D'
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
                categories: tokenFlowsFiltered.map((tokenFlow) =>
                    new Date(tokenFlow.timestamp).toDateString()
                ),
                title: {
                    text: 'date',
                },
                labels: {
                    show: false
                },
            },
            yaxis: {
                title: {
                    text: type === 'stablecoin' ? 'USD Amount' : 'Amount',
                },
                labels: {
                    formatter: (value) => {
                        return numericToUSD(value)
                    }
                }
            },
            fill: {
                opacity: 1,
                colors: ['#0094F6', '#D2042D'],
            },
        },
    }
}

const CEXDashboard = ({ tokenTransactions, tokenFlows }) => {
    const tokenDepositorsState = generateExchangeTokenState(
        tokenTransactions,
        'deposits'
    )
    const tokenWithdrawsState = generateExchangeTokenState(
        tokenTransactions,
        'withdraws'
    )

    const tokenStablecoinState = generateExchangeFlowState(
        tokenFlows,
        'stablecoin'
    )

    const tokenEthState = generateExchangeFlowState(
        tokenFlows,
        'eth'
    )

    return (
        <div className="text-left">
            <div className="flex my-1">
                <Card title="Exchange Token Depositors" className="mx-1 w-1/2">
                    <ReactApexCharts
                        options={tokenDepositorsState.options}
                        series={tokenDepositorsState.series}
                        type="bar"
                        width={768}
                    />
                </Card>
                <Card title="Exchange Token Withdraws" className="mx-1 w-1/2">
                    <ReactApexCharts
                        options={tokenWithdrawsState.options}
                        series={tokenWithdrawsState.series}
                        type="bar"
                        width={768}
                    />
                </Card>
            </div>
            <div className="flex my-1">
                <Card
                    title="Exchange Stablecoin In/Out Flow 15 Days"
                    className="mx-1 w-1/2"
                >
                    <ReactApexCharts
                        options={tokenStablecoinState.options}
                        series={tokenStablecoinState.series}
                        type="bar"
                        width={768}
                    />
                </Card>
                <Card
                    title="Exchange ETH In/Out Flow 15 Days"
                    className="mx-1 w-1/2"
                >
                    <ReactApexCharts
                        options={tokenEthState.options}
                        series={tokenEthState.series}
                        type="bar"
                        width={768}
                    />
                </Card>
            </div>
        </div>
    )
}

export default CEXDashboard
