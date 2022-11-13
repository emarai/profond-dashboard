import { Client } from 'pg'

const databaseConfig = {
    user: 'public_readonly',
    host: 'mainnet.db.explorer.indexer.near.dev',
    database: 'mainnet_explorer',
    password: 'nearprotocol',
    port: 5432,
}

export const getTotalSignedTransactions = async (accountId: string) => {
    const client = new Client(databaseConfig)
    await client.connect()
    const result = await client.query(
        `select count(*) from transactions where signer_account_id='${accountId}';`
    )
    await client.end()
    return result?.rows.length > 0 ? parseInt(result.rows[0]?.count) : 0
};

export const getTotalReceivedTransactions = async (accountId: string) => {
    const client = new Client(databaseConfig)
    await client.connect()
    const result = await client.query(
        `select count(*) from transactions where receiver_account_id='${accountId}';`
    )
    await client.end()
    return result?.rows.length > 0 ? parseInt(result.rows[0]?.count) : 0
};

export const getTotalReflexiveTransactions = async (accountId: string) => {
    const client = new Client(databaseConfig)
    await client.connect()
    const result = await client.query(
        `select count(*) from transactions where receiver_account_id='${accountId}' and signer_account_id='${accountId}';`
    )
    await client.end()
    return result?.rows.length > 0 ? parseInt(result.rows[0]?.count) : 0
};

export const getAssociatedAuroraAddress = async (accountId: string) => {
    // find from recent 100 wrap near transfers
    const client = new Client(databaseConfig)
    await client.connect()
    const result = await client.query(
        `select * from action_receipt_actions where action_kind='FUNCTION_CALL' and receipt_predecessor_account_id='${accountId}' and receipt_receiver_account_id='wrap.near' limit 100;`
    )
    await client.end()
    let auroraAddresses = new Set()
    if (result?.rows.length > 0) {
        result?.rows.map((tx) => {
            if (tx.args.method_name === 'ft_transfer_call' && tx.args.args_json.receiver_id === 'aurora') {
                auroraAddresses.add(tx.args.args_json.msg)
            }
        })
    }
    return Array.from(auroraAddresses)
}