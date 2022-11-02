import { Content } from 'antd/lib/layout/layout'

const HomePageDashboard = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-full text-center">
                <p className="text-2xl">Home</p>
                <iframe
                    className="w-full h-screen aspect-auto"
                    src="https://www.footprint.network/public/dashboard/Profond-Home-fp-7a636e0a-3bf2-4119-9b84-96058631223e"
                    allowTransparency
                    title="Home Page Dashboard Ethereum"
                ></iframe>
            </div>
        </Content>
    )
}

export default HomePageDashboard
