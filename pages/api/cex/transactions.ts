// @ts-nocheck
import { getExchangeTokenTransactions } from './../../../lib/pgdb';
export default async function handler(req, res) {
    const exchange = req.query.exchange

    const result = await getExchangeTokenTransactions(exchange)

    res.status(200).json(result)
}
