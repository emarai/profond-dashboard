import { Card  } from 'antd'

const Overview = () => {
    return (
        <div className="text-left">
            <div className="flex my-1">
                <div className="mx-1 w-6/12">
                    <Card title="Most traded token">
                        <p>IONX</p>
                    </Card>
                    <Card title="Most widely held token">
                        <p>UNI</p>
                    </Card>
                    <Card title="Biggest token position by dollar value">
                        <p>SHIB</p>
                    </Card>
                </div>
                <Card
                    title="Transactions Chart"
                    className="mx-1 w-9/12"
                >
                    <p>None</p>
                </Card>
            </div>
        </div>
    )
}
export default Overview
