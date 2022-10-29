import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState } from 'react';
import Sider from 'antd/lib/layout/Sider';
import { MenuInfo } from 'rc-menu/lib/interface';
import items from './sideItems';

const HomePageSider: React.FC<{handler: Function}> = ({handler}) => {

    const [current, setCurrent] = useState("WalletExplorer");

    const handleOnClick: MenuProps['onClick'] = (event: MenuInfo) => {
      setCurrent(event.key)
      handler(event.key);
    }

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
        <Menu onClick={handleOnClick} theme="dark" mode="inline" defaultSelectedKeys={[current]} selectedKeys={[current]} items={items} />
      </Sider>
    )
}

export default HomePageSider;