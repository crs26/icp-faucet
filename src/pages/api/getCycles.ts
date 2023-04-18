// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {execa} from 'execa'

import csv from 'csvtojson'
import { appendFile } from 'fs'

type Data = {
  name: string
}

let list : any = []



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    function check (x : any) {
        return (x.wallet === req.body.wallet)
    }

    if (req.method === 'POST') {
        try {
            list = []
            const jsonArray = await csv().fromFile('src/data/wallet-ids.csv')
            if(jsonArray.filter(check).length > 0) {
                console.log('Already claimed', req.body.wallet);
                throw `Already claimed ${req.body.wallet}`
            }
            const {stdout} = await execa('dfx', ['wallet', 'send', req.body.wallet, '1000000000000'])
            appendFile('src/data/wallet-ids.csv', '\n'+req.body.wallet, () => {})
            res.status(201).end()
        } catch (error) {
            console.log(error)
            res.status(400).send(error as Error)
        }   
    } else {
        res.status(400).end()
    }
}