import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import React from 'react';
import Sider from 'antd/lib/layout/Sider';


const items: MenuProps['items'] = [
  {
    key: "1",
    icon: React.createElement(UserOutlined),
    label: 'Wallet Explorer'
  }
];

const HomePageSider = () => {
    return (
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
    )
}

export default HomePageSider;