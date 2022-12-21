// @ts-nocheck
import { getDappsUniqueActiveUsers } from './../../../lib/pgdb';
export default async function handler(req, res) {

    const result = await getDappsUniqueActiveUsers()

    res.status(200).json(result)
}