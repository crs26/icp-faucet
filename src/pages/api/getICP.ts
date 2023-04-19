// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {execa} from 'execa';
import csv from 'csvtojson'
import { appendFile } from 'fs'

type Data = {
  name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    function check (x : any) {
        return (x.accountId === req.body.accountId)
    }
    if (req.method === 'POST') {
        try {
            const jsonArray = await csv().fromFile('src/data/account-ids.csv')
            if(jsonArray.filter(check).length > 0) {
                console.log('ICP already claimed', req.body.accountId);
                throw `ICP already claimed ${req.body.accountId}`
            }
            const {stdout} = await execa('dfx', ['ledger', 'transfer', '--amount', '0.0001', '--memo', '1234', req.body.accountId, '--network', 'ic'])
            appendFile('src/data/account-ids.csv', '\n'+req.body.accountId, () => {})
            console.log(`ICP claimed by ${req.body.accountId}`)
            res.status(201).end()
        } catch (error) {
            res.status(400).send(error as Error)
        }
    } else {
        res.status(400).end()
    }
}