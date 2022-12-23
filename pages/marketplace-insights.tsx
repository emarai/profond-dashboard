import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
const { Option } = Select
import MarketplaceInsightsDashboard from '../components/MarketplaceInsightsDashboard'
import axios from 'axios'

const MarketplaceInsights = () => {
    const [chainStats, setChainStats] = useState([])
    const [dailyStats, setDailyStats] = useState([])
    const [topCollections, setTopCollections] = useState([])
    const [topCollectionMarketplace, setTopCollectionMarketplace] =
        useState('opensea')

    useEffect(() => {
        axios
            .get('/api/nft-marketplace/top-collections', {
                params: { marketplace: topCollectionMarketplace },
            })
            .then((response) => {
                setTopCollections(response.data || [])
            })
    }, [topCollectionMarketplace])

    useEffect(() => {
        axios.get('/api/nft-marketplace/chain-stats').then((response) => {
            setChainStats(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get('/api/nft-marketplace/daily-stats').then((response) => {
            setDailyStats(response.data)
        })
    }, [])

    return (
        <Content>
            <div className="bg-white m-5 p-6 h-full text-center">
                <div className="text-2xl">Marketplace Insights</div>
                <div className="flex mx-auto my-auto text-center">
                    <p className="font-semibold my-1 mx-1">
                        Select Marketplace
                    </p>
                    <Select value={topCollectionMarketplace} onChange={(e) => {setTopCollectionMarketplace(e)}}>
                        <Option value="opensea">opensea</Option>
                        <Option value="aavegotchi">aavegotchi</Option>
                        <Option value="cryptopunks">cryptopunks</Option>
                        <Option value="decentraland">decentraland</Option>
                        <Option value="element">element</Option>
                        <Option value="era7-game-of-truth">
                            era7-game-of-truth
                        </Option>
                        <Option value="foundation">foundation</Option>
                        <Option value="looks-rare">looks-rare</Option>
                        <Option value="magic-eden">magic-eden</Option>
                        <Option value="rarible">rarible</Option>
                        <Option value="superrare">superrare</Option>
                        <Option value="the-sandbox">the-sandbox</Option>
                        <Option value="walken">walken</Option>
                        <Option value="x2y2">x2y2</Option>
                    </Select>
                </div>
                <MarketplaceInsightsDashboard topCollections={topCollections} chainStats={chainStats} dailyStats={dailyStats} />
                <br />
            </div>
        </Content>
    )
}

export default MarketplaceInsights
