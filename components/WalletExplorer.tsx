import { Button, Input } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useState } from 'react'

type WalletExplorerProps = {
    handler: Function
}

const WalletExplorer = ({ handler }: WalletExplorerProps) => {
    const [address, setAddress] = useState('')

    const handleAddressChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAddress(event.target.value)
    }

    const gotoWalletExplorer = () => handler('Wallet Explorer Dashboard', address)

    const handleKeyDown = (event: { key: string }) => {
        console.log(event)
        if (event.key === 'Enter') {
            gotoWalletExplorer()
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
                            onClick={gotoWalletExplorer}
                            className="bg-blue-500"
                            type="primary"
                        >
                            Submit
                        </Button>
                    </Input.Group>
                </div>
            </div>
        </Content>
    )
}

export default WalletExplorer
