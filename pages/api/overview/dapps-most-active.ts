// @ts-nocheck
import { getDappsMostActive } from './../../../lib/pgdb';
export default async function handler(req, res) {

    const result = await getDappsMostActive()

    res.status(200).json(result)
}