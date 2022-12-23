// @ts-nocheck
import { getHotTokens } from '../../../lib/pgdb';
export default async function handler(req, res) {

    const result = await getHotTokens()

    res.status(200).json(result)
}