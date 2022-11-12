// @ts-nocheck
import { GraphQLClient, gql } from "graphql-request"

const findCreatedReceiptAccountId = (accountId) => gql`
    {
        accounts(where: {account_id: {_eq: "${accountId}"}, receipt: {}}) {
            created_by_receipt_id
        }
    }
`

const findBlockTimestampbyReceiptId = (receiptId) => gql`
    {
        receipts(
            where: {receipt_id: {_eq: "${receiptId}"}}
        ) {
            included_in_block_timestamp
        }
    }
`



export const getAccountCreatedTimestamp = (accountId: string) => {
    const client = new GraphQLClient(process.env.GRAPHQL_URL);
    const accountCreatedReceiptId = (await client.request(findCreatedReceiptAccountId(accountId))).accounts[0].created_by_receipt_id
    const accountCreatedBlocktimestamp = (await client.request(findBlockTimestampbyReceiptId(accountCreatedReceiptId))).receipts[0].included_in_block_timestamp
}