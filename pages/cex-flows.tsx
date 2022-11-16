import { Tabs } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React from 'react'

const Binance = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-[1200px] text-center">
                <iframe
                    className="w-full h-[1000px] aspect-auto"
                    src="https://www.footprint.network/public/dashboard/Binance-fp-bf4e6922-3e7a-4901-9ae3-51f4da3868f1"
                    allowTransparency
                    title="Binance"
                ></iframe>
                <br />
            </div>
        </Content>
    )
}

const FTX = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-[1200px] text-center">
                <iframe
                    className="w-full h-[1000px] aspect-auto"
                    src="https://www.footprint.network/public/dashboard/FTX-Exchanges-fp-471e372d-f2fd-4871-9f98-f456319b951d"
                    allowTransparency
                    title="FTX"
                ></iframe>
                <br />
            </div>
        </Content>
    )
}

const GateIo = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-[1200px] text-center">
                <iframe
                    className="w-full h-[1000px] aspect-auto"
                    src="https://www.footprint.network/public/dashboard/Gate.io-fp-da2aadd0-caaa-473a-9303-23b7d40374ea"
                    allowTransparency
                    title="GateIo"
                ></iframe>
                <br />
            </div>
        </Content>
    )
}

const Bitfinex = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-[1200px] text-center">
                <iframe
                    className="w-full h-[1000px] aspect-auto"
                    src="https://www.footprint.network/public/dashboard/Bitfitnex-Exchange-fp-a0538ee4-7999-411c-aaff-93495baaad58"
                    allowTransparency
                    title="Bitfinex"
                ></iframe>
                <br />
            </div>
        </Content>
    )
}

const Kucoin = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-[1200px] text-center">
                <iframe
                    className="w-full h-[1000px] aspect-auto"
                    src="https://www.footprint.network/public/dashboard/Kucoin-Exchange-fp-45fb2dd2-2847-4850-92f9-47df348e24e1"
                    allowTransparency
                    title="Kucoin"
                ></iframe>
                <br />
            </div>
        </Content>
    )
}


const CryptoCom = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-[1200px] text-center">
                <iframe
                    className="w-full h-[1000px] aspect-auto"
                    src="https://www.footprint.network/public/dashboard/Crypto.com-fp-e2d46e62-0aaf-463b-b436-901a60f4e63f"
                    allowTransparency
                    title="FTX"
                ></iframe>
                <br />
            </div>
        </Content>
    )
}

const OKx = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-[1200px] text-center">
                <iframe
                    className="w-full h-[1000px] aspect-auto"
                    src="https://www.footprint.network/public/dashboard/OKx-Exchange-fp-73fb402e-aadb-4444-9eb1-31fa6a5c3566"
                    allowTransparency
                    title="OKx"
                ></iframe>
                <br />
            </div>
        </Content>
    )
}


const tabItems = [
    {
        label: 'Binance',
        key: 'binance',
        children: <Binance />
    },
    {
        label: 'FTX',
        key: 'ftx',
        children: <FTX />
    },
    {
        label: 'Gate.io',
        key: 'gate.io',
        children: <GateIo />
    },
    {
        label: 'Bitfinex',
        key: 'bitfinex',
        children: <Bitfinex />
    },
    {
        label: 'Kucoin',
        key: 'kucoin',
        children: <Kucoin />
    },
    {
        label: 'Crypto.com',
        key: 'crypto.com',
        children: <CryptoCom />
    },
    {
        label: 'OKx',
        key: 'OKx',
        children: <OKx />
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