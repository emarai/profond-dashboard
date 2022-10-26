import { Breadcrumb, Layout } from 'antd';
import { useState } from 'react';
import HomePageFooter from './components/HomePageFooter';
import HomePageSider from './components/HomePageSider';
import WalletExplorer from './components/WalletExplorer';
import WalletExplorerDashboard from './components/WalletExplorerDashboard';

const App = () => {
  const [selected, setSelected] = useState("Wallet Explorer");
  const [walletExplorerAddress, setWalletExplorerAddress] = useState('');

  const setMenuAndAddress = (selectedMenu: string, address: string) => {
    setSelected(selectedMenu);
    setWalletExplorerAddress(address);
  }

  return (
    <Layout hasSider>
      <HomePageSider handler={setMenuAndAddress} />
      <Layout className="bg-slate-100" style={{ marginLeft: 200 }}>
        <Breadcrumb className="ml-2 mt-2">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>{selected}</Breadcrumb.Item>
        </Breadcrumb>
        {selected === "Wallet Explorer" && <WalletExplorer handler={setMenuAndAddress} /> }
        {selected === "Wallet Explorer Dashboard" && <WalletExplorerDashboard address={walletExplorerAddress}/> }
        <HomePageFooter />
      </Layout>
    </Layout>
  )
}

export default App;