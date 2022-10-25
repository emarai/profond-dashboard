import { Button, Input } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";

type WalletExplorerProps = {
    handler: Function
}

const WalletExplorer = ({handler}: WalletExplorerProps) => {
    const [address, setAddress] = useState('');

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    }

    return (
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="bg-white p-6 h-full text-center">
            <p className="text-2xl">Wallet Explorer</p>
            <div className="mt-2 mx-auto max-w-lg">
              <Input.Group compact>
                <Input value={address} onChange={handleAddressChange} style={{ width: 'calc(100% - 200px)' }} placeholder="Ethereum Address" />
                <Button onClick = {() => handler("WalletExplorerDashboard", address)} className="bg-blue-500" type="primary">Submit</Button>
              </Input.Group>
            </div>
          </div>
        </Content>
    )
}

export default WalletExplorer;

