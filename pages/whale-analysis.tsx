import { Content } from 'antd/lib/layout/layout'
import { Tabs } from 'antd'
import Overview from '../components/WhaleAnalysisDashboard/Overview'
import Holding from '../components/WhaleAnalysisDashboard/Holding'

const tabItems = [
    {
        label: 'Overview',
        key: 'overview',
        children: <Overview />
    },
    {
        label: 'Holding',
        key: 'holding',
        children: <Holding />
    },
    {
        label: 'Whale',
        key: 'whale',
        children: 'whale',
    },
    {
        label: 'Transactions',
        key: 'transactions',
        children: 'transactions',
    },
]

const WhaleAnalysisDashboard = () => {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-full text-center">
                <div className="mt-2 mx-auto max-w-lg"></div>
                <Tabs items={tabItems} defaultActiveKey="1"></Tabs>
            </div>
        </Content>
    )
}

export default WhaleAnalysisDashboard
