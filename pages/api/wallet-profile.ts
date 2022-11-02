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

const nsToms = (ns) => {
    return parseInt(ns / 10**6)

}
export default async function handler(req, res) {
    const accountId = req.query.account_id

    const client = new GraphQLClient("https://api2.nearblocks.io/v1/graphql");
    const accountCreatedReceiptId = (await client.request(findCreatedReceiptAccountId(accountId))).accounts[0].created_by_receipt_id
    const accountCreatedBlocktimestamp = (await client.request(findBlockTimestampbyReceiptId(accountCreatedReceiptId))).receipts[0].included_in_block_timestamp

    res.status(200).json({
        account_created_at: nsToms(parseInt(accountCreatedBlocktimestamp))
    })
}