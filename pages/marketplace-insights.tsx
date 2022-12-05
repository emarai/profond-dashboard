import { Content } from 'antd/lib/layout/layout'
import React from 'react'

const MarketplaceInsights = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-full text-center">
                <iframe
                    className="w-full h-screen aspect-auto"
                    src="https://www.footprint.network/public/wl/dashboard/Marketplace-Explorer-fp-902a7557-e8f1-4ffb-a574-e3799f920281?marketplace=opensea"
                    allowTransparency
                    title="Home Page Dashboard Ethereum"
                ></iframe>
                <br />
            </div>
        </Content>
    )
}

export default MarketplaceInsights