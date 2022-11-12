import { Content } from 'antd/lib/layout/layout'
import { Tabs } from 'antd'
import GlobalView from '../../components/WalletExplorerDashboard/GlobalView'

type WalletExplorerDashboardProps = {
    address: string
}

const tabItems = [
    {
        label: 'Overview',
        key: 'overview',
        children: <GlobalView></GlobalView>,
    },
    // {
    //     label: 'Transfers',
    //     key: 'transfers',
    //     children: 'transfers',
    // },
    // {
    //     label: 'History',
    //     key: 'History',
    //     children: 'history',
    // },
    // {
    //     label: 'Graph',
    //     key: 'graph',
    //     children: 'graph',
    // },
    // {
    //     label: 'NFTs',
    //     key: 'nfts',
    //     children: 'nfts',
    // },
]

const WalletExplorerDashboard = ({ address }: WalletExplorerDashboardProps) => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-full text-center">
                <p className="text-2xl">{address}</p>
                <div className="mt-2 mx-auto max-w-lg"></div>
                <Tabs items={tabItems} defaultActiveKey="1"></Tabs>
            </div>
        </Content>
    )
}

export default WalletExplorerDashboard
