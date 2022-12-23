// @ts-nocheck
import { Tabs } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import CEXDashboard from '../components/CEXDashboard'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CEXCharts = ({ exchange }) => {
    const [tokenTransactions, setTokenTransactions] = useState([])
    const [tokenFlows, setTokenFlows] = useState([])

    useEffect(() => {
        axios
            .get('/api/cex/transactions', { params: { exchange: exchange } })
            .then((response) => {
                if (response.data)
                    setTokenTransactions(response.data)
            })
    }, [])

    useEffect(() => {
        axios
            .get('/api/cex/flows', { params: { exchange: exchange } })
            .then((response) => {
                if (response.data)
                    setTokenFlows(response.data)
            })
    }, [])

    return (
        <>
            <div>
                <CEXDashboard
                    tokenTransactions={tokenTransactions}
                    tokenFlows={tokenFlows}
                />
            </div>
        </>
    )
}

const tabItems = [
    {
        label: 'Binance',
        key: 'binance',
        children: <CEXCharts exchange="binance" />,
    },
    {
        label: 'Gate.io',
        key: 'gate.io',
        children: <CEXCharts exchange="gate.io" />,
    },
    {
        label: 'Bitfinex',
        key: 'bitfinex',
        children: <CEXCharts exchange="bitfinex" />,
    },
    {
        label: 'Kucoin',
        key: 'kucoin',
        children: <CEXCharts exchange="kucoin" />,
    },
    {
        label: 'Crypto.com',
        key: 'crypto.com',
        children: <CEXCharts exchange="crypto.com" />,
    },
    {
        label: 'OKx',
        key: 'OKx',
        children: <CEXCharts exchange="okx" />,
    },
]

const CEXFlows = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-full text-center">
                <div className="mt-2 mx-auto max-w-lg"></div>
                <Tabs items={tabItems} defaultActiveKey="1"></Tabs>
            </div>
        </Content>
    )
}

export default CEXFlows
