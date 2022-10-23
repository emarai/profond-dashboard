import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Input, Layout, Menu } from 'antd';
import React from 'react';

const { Header, Content, Footer, Sider } = Layout;

// const items: MenuProps['items'] = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));

const items: MenuProps['items'] = [
  {
    key: "1",
    icon: React.createElement(UserOutlined),
    label: 'Wallet Explorer'
  }
];

const App = () => {
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="h-8 m-4 text-cyan-500 text-bold text-2xl text-center" >profond.ai</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout className="bg-white" style={{ marginLeft: 200 }}>
        <Header className="h-8 m-4 bg-gray-500" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="bg-white p-6 h-full text-center">
            <p className="text-2xl">Wallet Explorer</p>
            <div className="mt-2 mx-auto max-w-lg">
              <Input.Group compact>
                <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="Ethereum Address" />
                <Button className="bg-blue-500" type="primary">Submit</Button>
              </Input.Group>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}> profond.ai ©2022 </Footer>
      </Layout>
    </Layout>
  )
}

export default App;