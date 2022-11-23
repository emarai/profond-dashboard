// @ts-nocheck
import { Card, Table } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { ColumnsType } from 'antd/lib/table'
import axios from 'axios'
import { useState, useEffect } from 'react'

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
    const [news, setNews] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/config")
            setChartCode(result.data.tradingview)

            const resultNews = await axios.get("/api/news")
            setNews(resultNews.data)
        }

        fetchData().catch(console.error)

    }, [])
    console.log(chartCode)

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
                <iframe
                    className="w-full h-screen aspect-auto"
                    src="https://www.footprint.network/public/wl/dashboard/TVL-Overview-fp-e501369f-125a-455d-8794-2baa1e711c85?date_filter=past120days"
                    allowTransparency
                    title="TVL Overview"
                ></iframe>
                <br />
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
