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