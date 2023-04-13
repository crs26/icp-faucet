import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen items-center p-24">
      <div className='row'>
        <div className='col-12 text-center'>
          <h1>
            ICP Faucet
          </h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Principal ID"
              aria-label="Principal ID"
              aria-describedby="basic-addon2"
            />
            <Button className='col-1' variant="outline-success" id="button-addon2">
              Get ICP
            </Button>
          </InputGroup>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 text-center'>
          <h1>
            Cycles Faucet
          </h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Wallet Canister ID"
              aria-label="Wallet Canister ID"
              aria-describedby="basic-addon2"
            />
            <Button className='col-1' variant="outline-success" id="button-addon2">
              Get Cycles
            </Button>
          </InputGroup>
        </div>
      </div>
    </main>
  )
}
