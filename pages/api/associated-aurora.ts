// @ts-nocheck
import { getAssociatedAuroraAddress } from '../../lib/pgdb';
import { getWalletProfile, setWalletProfile } from '../../lib/mongodb';

export default async function handler(req, res) {
    const accountId = req.query.account_id

    const accountWalletProfile = await getWalletProfile(accountId);

    if (accountWalletProfile && accountWalletProfile.associated_aurora_addresses) {
        res.status(200).json(accountWalletProfile.associated_aurora_addresses)
    } else {
        const addresses = await getAssociatedAuroraAddress(accountId)
        await setWalletProfile({
            account_id: accountId,
            associated_aurora_addresses: addresses
        })
        res.status(200).json(addresses)
    }
}
