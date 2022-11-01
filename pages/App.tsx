import { Breadcrumb, Layout } from 'antd';
import { useState } from 'react';
import HomePageDashboard from '../components/HomePageDashboard';
import HomePageFooter from '../components/HomePageFooter';
import HomePageSider from '../components/HomePageSider';
import WalletExplorer from '../components/WalletExplorer';
import WalletExplorerDashboard from '../components/WalletExplorerDashboard';
import WhaleAnalysisDashboard from '../components/WhaleAnalysisDashboard';

const App = () => {
  const [selected, setSelected] = useState("Whale Analysis");
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
        {selected === "Home" && <HomePageDashboard /> }
        {selected === "Whale Analysis" && <WhaleAnalysisDashboard />}
        <HomePageFooter />
      </Layout>
    </Layout>
  )
}

export default App;