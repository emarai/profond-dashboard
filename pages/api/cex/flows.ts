// @ts-nocheck
import { getExchangeTokenFlows } from './../../../lib/pgdb';
export default async function handler(req, res) {
    const exchange = req.query.exchange

    const result = await getExchangeTokenFlows(exchange)

    res.status(200).json(result)
}
