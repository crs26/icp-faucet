import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { useRef, useState } from 'react';
import { FormControlProps } from 'react-bootstrap';
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const icpRef = useRef<any>(null)
  const cycleRef = useRef<any>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const getICP = async () => {
    setIsLoading(true)
    const response = await axios.post('/api/getICP', {principal: icpRef.current.value})
    if (response.status === 201) {
      setSuccess(true)
    } else {
      setSuccess(false)
    }
    setIsLoading(false)
  }

  const getCycles = async () => {
    setIsLoading(true)
    const response = await axios.post('/api/getCycles', {wallet: cycleRef.current.value})
    if (response.status === 201) {
      setSuccess(true)
    } else {
      setSuccess(false)
    }
    setIsLoading(false)
  }

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
              ref={icpRef}
            />
            <Button className='col-1' variant="outline-success" id="button-addon2" onClick={getICP} disabled={isLoading}>
              {isLoading ? 'Loading' : 'Get ICP'}
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
              ref={cycleRef}
            />
            <Button className='col-1' variant="outline-success" id="button-addon2" onClick={getCycles} disabled={isLoading}>
              {isLoading ? 'Loading' : 'Get Cycles'}
            </Button>
          </InputGroup>
        </div>
      </div>
    </main>
  )
}
