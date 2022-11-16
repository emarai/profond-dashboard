import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import React, { useState } from 'react'
import Sider from 'antd/lib/layout/Sider'
import { MenuInfo } from 'rc-menu/lib/interface'
import Link from 'next/link'
import {
    AreaChartOutlined,
    HomeOutlined,
    UserOutlined,
    ClusterOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'

const SiteSider = () => {
    const router = useRouter()

    const pathSplitted = router.pathname.split('/')
    const currentPage = pathSplitted[1] || 'home'

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
            <div className="h-8 m-4 text-cyan-500 text-bold text-2xl text-center">
                profond.ai
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[currentPage]}
                selectedKeys={[currentPage]}
            >
                <Menu.Item key="home" icon={React.createElement(HomeOutlined)}>
                    <Link href="/">Overview</Link>
                </Menu.Item>
                <Menu.Item
                    key="wallet"
                    icon={React.createElement(UserOutlined)}
                >
                    <Link href="/wallet">Wallet Explorer</Link>
                </Menu.Item>
                <Menu.Item
                    key="marketplace-insights"
                    icon={React.createElement(AreaChartOutlined)}
                >
                    <Link href="/marketplace-insights">
                        Marketplace Insights
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="whale-insights"
                    icon={React.createElement(ClusterOutlined)}
                >
                    <Link href="/whale-insights">Whale Insights</Link>
                </Menu.Item>
                <Menu.Item
                    key="cex-flows"
                    icon={React.createElement(AreaChartOutlined)}
                >
                    <Link href="/cex-flows">CEX Flows</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SiteSider
