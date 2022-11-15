import React, { useState } from 'react'
import BulkWhaleForm from '../components/BulkWhaleForm'

const WhaleExplorer = () => {
    const [wallets, setWallets] = useState([]);

    return (
        <BulkWhaleForm />
    )
}

export default WhaleExplorer
