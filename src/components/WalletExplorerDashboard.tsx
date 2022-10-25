type WalletExplorerDashboardProps = {
    address: string
}

const WalletExplorerDashboard = ({address}: WalletExplorerDashboardProps) => {

    // get account data from blockcypher
    // https://api.blockcypher.com/v1/eth/main/addrs/0x39D03d8E03E2627fA027149f43d1CAecE1DcB4F2/full

    // List of informations
    // Account created At
    // Etherscan Link
    // Portfolio and each token balances (codefi)
    // total Transactions -> received, signed, reflexive
    // Daily number of transactions

    // Transfers

    // Incoming ETH
    // Outgoing ETH
    // Incoming Tokens
    // Outgoing Tokens


    // History

    // All events (event!)
    // All Transactions

    return (<>{address}</>)

}

export default WalletExplorerDashboard;