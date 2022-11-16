import { Content } from 'antd/lib/layout/layout'

const HomePageDashboard = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-[4200px] text-center">
                <p className="text-2xl">Overview</p>
                <br />
                <iframe
                    className="w-full h-[2000px] aspect-auto"
                    src="https://www.footprint.network/public/dashboard/Overview-Dashboard-fp-b0cad94a-2949-4e7e-a355-147344eac132"
                    allowTransparency
                    title="Home Page Dashboard Ethereum"
                ></iframe>
                <br />
                <iframe
                    className="w-full h-[2000px] aspect-auto"
                    src="https://www.footprint.network/public/dashboard/TVL-Overview-fp-e501369f-125a-455d-8794-2baa1e711c85?date_filter=past120days"
                    allowTransparency
                    title="TVL Overview"
                ></iframe>
            </div>
        </Content>
    )
}

export default HomePageDashboard
