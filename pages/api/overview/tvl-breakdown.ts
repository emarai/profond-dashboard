// @ts-nocheck
import { getDeFiTvlBreakDown } from './../../../lib/pgdb';
export default async function handler(req, res) {

    const result = await getDeFiTvlBreakDown()

    res.status(200).json(result)
}