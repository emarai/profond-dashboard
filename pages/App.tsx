import { Breadcrumb, Layout } from 'antd';
import { useState } from 'react';
import HomePageDashboard from './HomePageDashboard';
import SiteFooter from '../components/Footer';
import SiteSider from '../components/SiteSider';
import WalletExplorer from './wallet';
import WalletExplorerDashboard from './wallet/[id]';
import WhaleAnalysisDashboard from './whale-analysis';

const App = () => {
  return <HomePageDashboard />
}

export default App;