import { Layout } from 'antd';
import { useState } from 'react';
import HomePageFooter from './components/HomePageFooter';
import HomePageSider from './components/HomePageSider';
import WalletExplorer from './components/WalletExplorer';
import WalletExplorerDashboard from './components/WalletExplorerDashboard';
const { Header } = Layout;

const App = () => {
  const [selected, setSelected] = useState("WalletExplorer");
  const [walletExplorerAddress, setWalletExplorerAddress] = useState('');

  const setMenuAndAddress = (selectedMenu: string, address: string) => {
    setSelected(selectedMenu);
    setWalletExplorerAddress(address);
  }

  return (
    <Layout hasSider>
      <HomePageSider />
      <Layout className="bg-white" style={{ marginLeft: 200 }}>
        <Header className="h-8 m-4 bg-gray-500" style={{ padding: 0 }} />
        {selected === "WalletExplorer" && <WalletExplorer handler={setMenuAndAddress} /> }
        {selected === "WalletExplorerDashboard" && <WalletExplorerDashboard address={walletExplorerAddress}/> }
        <HomePageFooter />
      </Layout>
    </Layout>
  )
}

export default App;