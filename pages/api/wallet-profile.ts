// @ts-nocheck
import { getAccountCreatedTimestamp, nsToms } from './../../lib/graphql';

export default async function handler(req, res) {
    const accountId = req.query.account_id

    // first check mongodb if backup exist

    // if it doesn't check the public postgresql

    const accountCreatedBlocktimestamp = getAccountCreatedTimestamp(accountId);
    res.status(200).json({
        account_created_at: nsToms(parseInt(accountCreatedBlocktimestamp))
    })
}