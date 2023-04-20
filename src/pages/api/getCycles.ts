// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {execa} from 'execa'

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
        return (x.wallet === req.body.wallet)
    }

    if (req.method === 'POST') {
        try {
            const jsonString = readFileSync('src/data/config.json', 'utf8');
            const config = JSON.parse(jsonString);
            if(!config.cycles.isEnabled) throw 'Claiming of Cycles is disabled'
            const jsonArray = await csv().fromFile('src/data/wallet-ids.csv')
            if(jsonArray.filter(check).length > 0) {
                console.log('Already claimed', req.body.wallet);
                throw `Already claimed ${req.body.wallet}`
            }
            const {stdout} = await execa('dfx', ['wallet', 'send', req.body.wallet, config.cycles.amount, '--network', 'ic'])
            appendFile('src/data/wallet-ids.csv', '\n'+req.body.wallet, () => {})
            console.log(`Cycles claimed by ${req.body.wallet}`)
            res.status(201).end()
        } catch (error) {
            console.error(error)
            res.status(400).send(error as Error)
        }  
    } else if (req.method === 'GET'){
        try {
            const {stdout} = await execa('dfx', ['wallet', 'balance', '--network', 'ic'])
            res.status(201).send(stdout as any)
        } catch (error) {
            console.error(error)
            res.status(400).send(error as Error)
        } 
    } else {
        res.status(400).end()
    }
}
