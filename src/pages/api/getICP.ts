// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {execa} from 'execa';

type Data = {
  name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        try {
            const {stdout} = await execa('dfx', ['ledger', 'transfer', '--amount', '0.0001', '--memo', '1234', req.body.accountId, '--network', 'ic'])
            res.status(201).end()
        } catch (error) {
            res.status(400).send(error as Error)
        }
    } else {
        res.status(400).end()
    }
}