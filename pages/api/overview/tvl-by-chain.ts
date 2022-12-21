// @ts-nocheck
import { getDeFiTvlByChain } from './../../../lib/pgdb';
export default async function handler(req, res) {
    const chain = req.query.chain

    const result = await getDeFiTvlByChain(chain || 'near')

    res.status(200).json(result)
}
