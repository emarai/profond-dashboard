// @ts-nocheck
import { getHotNFT } from './../../../lib/pgdb';
export default async function handler(req, res) {

    const result = await getHotNFT()

    res.status(200).json(result)
}