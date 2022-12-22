// @ts-nocheck
import { Card, Table } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { ColumnsType } from 'antd/lib/table'
import axios from 'axios'
import { useState, useEffect } from 'react'
import TVLOverviewDashboard from '../components/Overview/TVLOverviewDashboard'
import EthereumOverviewDashboard from '../components/Overview/EthereumOverviewDashboard'
import { getDeFiTvlBreakDown } from '../lib/pgdb'

const columnsNews: ColumnsType = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
            return (
                <a href={record.url}>{text}</a>
            )
        }
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date"
    }
]

const HomePageDashboard = () => {
    const [chartCode, setChartCode] = useState(null)
    const [tvlOverview, setTvlOverview] = useState([])
    const [tvlBreakdown, setTvlBreakdown] = useState([])
    const [news, setNews] = useState(null)

    useEffect(() => {
        axios.get("/api/config").then((response) => setChartCode(response.data.tradingview))
    }, [])

    useEffect(() => {
        axios.get("/api/news").then((response) => setNews(response.data))
    }, [])

    useEffect(() => {
        axios.get("/api/overview/tvl-by-chain").then((response) => setTvlOverview(response.data))
    }, [])

    useEffect(() => {
        axios.get("/api/overview/tvl-breakdown").then((response) => setTvlBreakdown(response.data))
    }, [])

    let tradingView = `
        <script src="https://s3.tradingview.com/tv.js"></script>
        <script>
                    var tradingview_embed_options = {};
                    tradingview_embed_options.width = '100%';
                    tradingview_embed_options.height = '100%';
                    tradingview_embed_options.chart = '${chartCode}';
                    new TradingView.chart(tradingview_embed_options);
        </script>
    `
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-full">
                <Card title="Bitcoin Price History" className="mx-1">
                    <iframe 
                        className="w-full h-screen aspect-auto"
                        allowTransparency
                        title="TVL Overview"
                        src={`data:text/html;charset=utf-8,${tradingView}`}>
                    </iframe>
                </Card>
                <br />
                <TVLOverviewDashboard tvlOverview={tvlOverview} tvlBreakdown={tvlBreakdown} />
                <br />
                <EthereumOverviewDashboard />
                <iframe
                    className="w-full h-screen aspect-auto"
                    src="https://www.footprint.network/public/wl/dashboard/Overview-Dashboard-fp-b0cad94a-2949-4e7e-a355-147344eac132"
                    allowTransparency
                    title="Home Page Dashboard Ethereum"
                ></iframe>
                <br />
                <Card title="News" className="mx-1">
                    <Table
                        columns={columnsNews}
                        dataSource={news}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 240 }}
                    />
                </Card>
            </div>
        </Content>
    )
}

export default HomePageDashboard
