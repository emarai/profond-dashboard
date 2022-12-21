import { Client } from 'pg'

const databaseConfigNEARExplorer = {
    user: 'public_readonly',
    host: 'mainnet.db.explorer.indexer.near.dev',
    database: 'mainnet_explorer',
    password: 'nearprotocol',
    port: 5432,
}

const databaseConfigAirflow = {
    user: process.env.PG_USER_AIRFLOW,
    host: process.env.PG_HOST_AIRFLOW,
    database: process.env.PG_DB_AIRFLOW,
    password: process.env.PG_PASSWORD_AIRFLOW,
    port: parseInt(process.env.PG_PORT_AIRFLOW as string)
}

export const getNFTMarketplaceStats = async () => {
    const client = new Client(databaseConfigAirflow)
    await client.connect()

    const result = await client.query(
        `SELECT CHAIN,
            TRADING_VOLUME,
            NUMBER_OF_TRANSACTIONS,
            NUMBER_OF_USERS
        FROM NFT_MARKETPLACE_TRANSACTIONS;
        `
    )

    await client.end()
    return result?.rows.length > 0 && result.rows
}

export const getNFTMarketplaceDailyStats = async () => {
    const client = new Client(databaseConfigAirflow)
    await client.connect()

    const result = await client.query(
        `SELECT TRADING_VALUE,
            NUMBER_OF_TRANSACTIONS,
            ACTIVE_USERS,
            SELLERS,
            BUYERS,
            TIMESTAMP
        FROM NFT_MARKETPLACE_DAILY_STATISTICS;
        `
    )

    await client.end()
    return result?.rows.length > 0 && result.rows
}

export const getNFTMarketplaceTopCollections = async (marketplace: string) => {
    const client = new Client(databaseConfigAirflow)
    await client.connect()

    const result = await client.query(
        `SELECT COLLECTION_SLUG,
            CHAIN,
            AMOUNT_CURRENCY,
            MARKETPLACE,
            TRADING_VOLUME,
            BUYER,
            SELLER,
            TRADING_AMOUNT,
            TRANSACTIONS
        FROM NFT_MARKETPLACE_COLLECTION
        WHERE MARKETPLACE = '${marketplace}'`
    )

    await client.end()
    return result?.rows.length > 0 && result.rows
}

export const getDappsMostActive = async () => {
    const client = new Client(databaseConfigAirflow)
    await client.connect()

    const result = await client.query(
        `SELECT PROTOCOL_NAME,
            CHAIN,
            TOTAL_TRANSACTIONS
        FROM DAPPS_MOST_ACTIVE;
        `
    )

    await client.end()
    return result?.rows.length > 0 && result.rows
}

export const getDappsUniqueActiveUsers = async () => {
    const client = new Client(databaseConfigAirflow)
    await client.connect()

    const result = await client.query(
        `SELECT PROTOCOL_NAME,
            CHAIN, TOTAL_USERS
        FROM DAPPS_UNIQUE_ACTIVE_USERS;
        `
    )

    await client.end()
    return result?.rows.length > 0 && result.rows
}

export const getHotTokens = async () => {
    const client = new Client(databaseConfigAirflow)
    await client.connect()

    const result = await client.query(
        `SELECT TOKEN_NAME,
            VOLUME
        FROM HOT_COIN;
        `
    )

    await client.end()
    return result?.rows.length > 0 && result.rows
}

export const getHotNFT = async () => {
    const client = new Client(databaseConfigAirflow)
    await client.connect()

    const result = await client.query(
        `SELECT TOKEN_NAME,
            VOLUME
        FROM HOT_NFT;
        `
    )

    await client.end()
    return result?.rows.length > 0 && result.rows
}


export const getDeFiTvlByChain = async (chain: string = 'near') => {
    const client = new Client(databaseConfigAirflow)
    await client.connect()

    const result = await client.query(
        `SELECT CHAIN,
            TVL, date
        FROM DEFI_TVL_BY_CHAIN
        WHERE CHAIN = '${chain}'`
    )

    await client.end()
    return result?.rows.length > 0 && result.rows
}

export const getDeFiTvlBreakDown = async () => {
    const client = new Client(databaseConfigAirflow)
    await client.connect()

    const result = await client.query(
        `SELECT CHAIN,
            NAME,
            CATEGORY,
            TVL,
            DAILY_CHANGE
        FROM 
            DEFI_TVL_BREAKDOWN`
    )
    await client.end()
    return result?.rows.length > 0 && result.rows
}

export const getExchangeTokenTransactions = async (exchange: string) => {
    // value,transaction_type,timestamp
    // 15492,"withdraws","2022-11-21 00:00:00"
    // 14280,"withdraws","2022-11-22 00:00:00"
    // 65188,"withdraws","2022-11-23 00:00:00"
    const client = new Client(databaseConfigAirflow)
    await client.connect()
    const result = await client.query(
        `SELECT VALUE,
            TRANSACTION_TYPE,timestamp
        FROM TOKEN_TRANSACTIONS
        WHERE EXCHANGE = '${exchange}';`
    )
    await client.end()
    return result?.rows.length > 0 && result.rows
}

export const getExchangeTokenFlows = async (exchange: string) => {
    // value,token_name,flow,timestamp
    // 162042123.78743473,"stablecoin","stablecoin_in","2022-12-07 00:00:00"
    // 1237530773.7522438,"stablecoin","stablecoin_in","2022-12-01 00:00:00"
    // -1257257384.2134442,"stablecoin","stablecoin_out","2022-12-01 00:00:00"
    const client = new Client(databaseConfigAirflow)
    await client.connect()
    const result = await client.query(
        `SELECT VALUE,
            TOKEN_NAME,
            FLOW, timestamp
        FROM TOKEN_FLOWS
        WHERE EXCHANGE = '${exchange}';`
    )
    await client.end()
    return result?.rows.length > 0 && result.rows
}

export const getTotalSignedTransactions = async (accountId: string) => {
    const client = new Client(databaseConfigNEARExplorer)
    await client.connect()
    const result = await client.query(
        `select count(*) from transactions where signer_account_id='${accountId}';`
    )
    await client.end()
    return result?.rows.length > 0 ? parseInt(result.rows[0]?.count) : 0
};

export const getTotalReceivedTransactions = async (accountId: string) => {
    const client = new Client(databaseConfigNEARExplorer)
    await client.connect()
    const result = await client.query(
        `select count(*) from transactions where receiver_account_id='${accountId}';`
    )
    await client.end()
    return result?.rows.length > 0 ? parseInt(result.rows[0]?.count) : 0
};

export const getTotalReflexiveTransactions = async (accountId: string) => {
    const client = new Client(databaseConfigNEARExplorer)
    await client.connect()
    const result = await client.query(
        `select count(*) from transactions where receiver_account_id='${accountId}' and signer_account_id='${accountId}';`
    )
    await client.end()
    return result?.rows.length > 0 ? parseInt(result.rows[0]?.count) : 0
};

export const getAssociatedAuroraAddress = async (accountId: string) => {
    // find from recent 100 wrap near transfers
    const client = new Client(databaseConfigNEARExplorer)
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