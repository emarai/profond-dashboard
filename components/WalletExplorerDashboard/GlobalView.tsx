// @ts-nocheck
import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PortfolioChartView from './PortfolioChartView'

type Balance = {
    coin: string
    amount: number
}

const columns: ColumnsType<Balance> = [
    {
        title: 'Coin',
        dataIndex: 'coin',
        key: 'coin',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
]

const data: Balance[] = [
    {
        coin: 'NEAR',
        amount: 60.17,
    },
    {
        coin: 'GOLD',
        amount: 1000,
    },
    {
        coin: 'PARAS',
        amount: 338.36,
    },
    {
        coin: 'wNEAR',
        amount: 0.025,
    },
]

const GlobalView = () => {
    const [response, setResponse] = useState(null)
    const router = useRouter()
    const accountId = router.query.id

    useEffect(() => {
        if (accountId) {
            const fetchData = async () => {
                const dataWalletProfile = await fetch(
                    '/api/wallet-profile?' +
                        new URLSearchParams({
                            account_id: accountId,
                        }),
                    {
                        method: 'GET',
                    }
                )

                const jsonWalletProfile = await dataWalletProfile.json()

                const dataAssociatedAurora = await fetch(
                    '/api/associated-aurora?' +
                        new URLSearchParams({
                            account_id: accountId,
                        }),
                    {
                        method: 'GET',
                    }
                )
                const jsonAssociatedAurora = await dataAssociatedAurora.json()

                setResponse({
                    "walletProfile": jsonWalletProfile,
                    "associatedAuroraAddress": jsonAssociatedAurora
                })
            }
            fetchData().catch(console.error)
        }
    }, [accountId])

    const accountCreatedAt = new Date(response?.walletProfile.account_created_at).toDateString();
    const totalTransactions = response?.walletProfile.total_transactions
    const totalSignedTransactions = response?.walletProfile.total_signed_transactions
    const totalReceivedTransactions = response?.walletProfile.total_received_transactions
    const totalReflexiveTransactions = response?.walletProfile.total_reflexive_transactions
    const associatedAuroraAddress = response?.associatedAuroraAddress
    return (
        <div className="text-left">
            <div className="flex my-1">
                <Card title="Created At" className="mx-1 w-6/12">
                    <p>{accountCreatedAt}</p>
                </Card>
                <Card
                    title="Aurora/Ethereum Linked Address"
                    className="mx-1 w-6/12"
                >
                    <p>{associatedAuroraAddress}</p>
                </Card>
            </div>
            <div className="flex">
                <Card title="Portfolio" className="mx-1 w-6/12">
                    <PortfolioChartView></PortfolioChartView>
                </Card>

                <Card title="Balances" className="mx-1 w-6/12">
                    <Table columns={columns} dataSource={data} />
                </Card>
            </div>
            <div className="flex my-1">
                <Card title="Total Transactions" className="mx-1 w-3/12">
                    <p>{totalTransactions}</p>
                </Card>
                <Card title="Received" className="mx-1 w-3/12">
                    <p>{totalReceivedTransactions}</p>
                </Card>
                <Card title="Signed" className="mx-1 w-3/12">
                    <p>{totalSignedTransactions}</p>
                </Card>
                <Card title="Reflexive" className="mx-1 w-3/12">
                    <p>{totalReflexiveTransactions}</p>
                </Card>
            </div>
            <div className="flex">
                <Card
                    title="Daily Number of Transactions"
                    className="mx-1 w-full"
                ></Card>
            </div>
        </div>
    )
}
export default GlobalView
