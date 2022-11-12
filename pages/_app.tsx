import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useState } from 'react'
import { Breadcrumb, Layout } from 'antd'
import SiteFooter from '../components/Footer'
import SiteSider from '../components/SiteSider'

export default function App({ Component, pageProps }: AppProps) {
    const [selected, setSelected] = useState('Home')

    const setMenuAndAddress = (selectedMenu: string, address: string) => {
        setSelected(selectedMenu)
    }

    return (
        <Layout hasSider>
            <SiteSider handler={setMenuAndAddress} />
            <Layout className="bg-slate-100" style={{ marginLeft: 200 }}>
                <Breadcrumb className="ml-2 mt-2">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>{selected}</Breadcrumb.Item>
                </Breadcrumb>
                <Component {...pageProps} />
                <SiteFooter />
            </Layout>
        </Layout>
    )
}
