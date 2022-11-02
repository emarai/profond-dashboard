import { Button, Input } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type WalletExplorerProps = {
    handler: Function
}

const WalletExplorer = ({ handler }: WalletExplorerProps) => {
    const router = useRouter()
    const [address, setAddress] = useState('')

    const handleAddressChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAddress(event.target.value)
    }


    const handleKeyDown = (event: { key: string }) => {
        if (event.key === 'Enter') {
            router.push(`wallet/${address}`)
        }
    }

    return (
        <Content>
            <div className="bg-white m-5 p-6 h-full text-center">
                <p className="text-2xl">Wallet Explorer</p>
                <div className="mt-2 mx-auto max-w-lg">
                    <Input.Group compact>
                        <Input
                            onKeyDown={handleKeyDown}
                            value={address}
                            onChange={handleAddressChange}
                            style={{ width: 'calc(100% - 200px)' }}
                            placeholder="NEAR Address"
                        />
                        <Button
                            className="bg-blue-500"
                            type="primary"
                        >
                            <Link href={`/wallet/${address}`} >
                                Submit
                            </Link>
                        </Button>
                    </Input.Group>
                </div>
            </div>
        </Content>
    )
}

export default WalletExplorer
