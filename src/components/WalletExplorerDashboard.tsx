import { Content } from 'antd/lib/layout/layout'
import { Tabs } from 'antd'
import GlobalView from './WalletExplorerDashboard/GlobalView'

type WalletExplorerDashboardProps = {
    address: string
}

const tabItems = [
    {
        label: 'Overview',
        key: 'overview',
        children: <GlobalView></GlobalView>
    },
    {
        label: 'Transfers',
        key: 'transfers',
        children: 'transfers'
    },
    {
        label: 'History',
        key: 'History',
        children: 'history'
    },
    {
        label: 'Graph',
        key: 'graph',
        children: 'graph'
    },
    {
        label: 'NFTs',
        key: 'nfts',
        children: 'nfts'
    }
]

const WalletExplorerDashboard = ({ address }: WalletExplorerDashboardProps) => {
    // ETH
    // get account data from blockcypher
    // https://api.blockcypher.com/v1/eth/main/addrs/0x39D03d8E03E2627fA027149f43d1CAecE1DcB4F2/full

    // List of informations
    // Account created At
    // Etherscan Link
    // Portfolio and each token balances (codefi)
    // total Transactions -> received, signed, reflexive
    // Daily number of transactions

    // Transfers

    // Incoming ETH
    // Outgoing ETH
    // Incoming Tokens
    // Outgoing Tokens

    // History

    // All events (event!)
    // All Transactions

    // NEAR
    // get whitelisted account

    return (
        <Content>
            <div className="bg-white m-5 p-6 h-full text-center">
                <p className="text-2xl">{address}</p>
                <div className="mt-2 mx-auto max-w-lg"></div>
            <Tabs items={tabItems} defaultActiveKey="1">
            </Tabs>
            </div>
        </Content>
    )
}

export default WalletExplorerDashboard
