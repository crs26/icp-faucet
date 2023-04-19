import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import { useRef, useState } from 'react';
import { FormControlProps } from 'react-bootstrap';
import axios from 'axios'
import { Faucet } from '@/component/Faucet';

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const icpRef = useRef<any>(null)
  const cycleRef = useRef<any>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('icp')
  const [status, setStatus] = useState('')

  const getICP = async () => {
    setIsLoading(true)
    const response = await axios.post('/api/getICP', {accountId: icpRef.current.value}, { validateStatus: () => true })
    if (response.status === 201) {
      setSuccess(true)
    } else {
      setSuccess(false)
      setStatus(response.data?.stderr ? cleanError(response.data.stderr) : response.data)
    }
    setIsLoading(false)
  }

  const getCycles = async () => {
    setIsLoading(true)
    const response = await axios.post('/api/getCycles', {wallet: cycleRef.current.value}, { validateStatus: () => true })
    if (response.status === 201) {
      setSuccess(true)
    } else {
      setSuccess(false)
      setStatus(response.data?.stderr ? cleanError(response.data.stderr) : response.data)
    }
    setIsLoading(false)
  }

  const cleanError = (error : string) => {
    return error.replace(/\u001b\[\d{1,2}m|\u001b\(B\u001b\[m/g, '')
  }


  const renderFaucet = () => {
    if (activeTab === 'icp') {
      return <Faucet inputRef={icpRef} action={getICP} isLoading={isLoading} success={success} placeholder={'Identity Account ID'} status={status} btnTxt={'Get ICP'}/>
    } else {
      return <Faucet inputRef={cycleRef} action={getCycles} isLoading={isLoading} success={success} placeholder={'Wallet Canister ID'} status={status} btnTxt={'Get Cycles'}/>
    }
  }

  return (
    <main className="min-h-screen items-center p-24">
      <div className='row text-center'>
        <h1>Faucet</h1>
      </div>
      <div className='row py-5'>
        <ul className="nav nav-tabs">
          <li className="nav-item col-6 text-center">
            <a className={`nav-link ${activeTab === 'icp' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('icp')}>ICP</a>
          </li>
          <li className="nav-item col-6 text-center">
            <a className={`nav-link ${activeTab === 'cycles' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('cycles')}>Cycles</a>
          </li>
        </ul>
      </div>
      {renderFaucet()}
    </main>
  )
}
