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
        const {stdout} = await execa('dfx', ['wallet', 'send', req.body.wallet, '1000000000000'])
        setTimeout(() => {
            res.status(201).end()
        }, 5000);
    } else {
        res.status(400).end()
    }
}