// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {execa} from 'execa';
import csv from 'csvtojson'
import { appendFile, readFileSync } from 'fs'

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
            const jsonString = readFileSync('src/data/config.json', 'utf8');
            const config = JSON.parse(jsonString);
            if(!config.icp.isEnabled) throw 'Claiming of ICP is disabled'
            const jsonArray = await csv().fromFile('src/data/account-ids.csv')
            if(jsonArray.filter(check).length > 0) {
                console.log('ICP already claimed', req.body.accountId);
                throw `ICP already claimed ${req.body.accountId}`
            }
            const {stdout} = await execa('dfx', ['ledger', 'transfer', '--amount', config.icp.amount, '--memo', '1234', req.body.accountId, '--network', 'ic'])
            appendFile('src/data/account-ids.csv', '\n'+req.body.accountId, () => {})
            console.log(`ICP claimed by ${req.body.accountId}`)
            res.status(201).end()
        } catch (error) {
            console.error(error)
            res.status(400).send(error as Error)
        }
    } else if (req.method === 'GET'){
        try {
            const {stdout} = await execa('dfx', ['ledger', 'balance', '--network', 'ic'])
            res.status(201).send(stdout as any)
        } catch (error) {
            console.error(error)
            res.status(400).send(error as Error)
        }
    } else {
        res.status(400).end()
    }
}
