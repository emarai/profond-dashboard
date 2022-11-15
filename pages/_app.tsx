import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useState } from 'react'
import { Breadcrumb, Layout } from 'antd'
import SiteFooter from '../components/Footer'
import SiteSider from '../components/SiteSider'
import { useRouter } from 'next/router'

const pages = {
    "": "Overview",
    "wallet": "Wallet Explorer",
    "whale-analysis": "Whale Analysis",
    "whale-explorer": "Whale Explorer"
}

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const pathSplitted = router.pathname.split('/')
    const currentPage = pathSplitted[1] || 'home'

    return (
        <Layout hasSider>
            <SiteSider/>
            <Layout className="bg-slate-100" style={{ marginLeft: 200 }}>
                <Breadcrumb className="ml-2 mt-2">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>{pages[currentPage]}</Breadcrumb.Item>
                </Breadcrumb>
                <Component {...pageProps} />
                <SiteFooter />
            </Layout>
        </Layout>
    )
}
