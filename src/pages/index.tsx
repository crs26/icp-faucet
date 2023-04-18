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
  const [errorMsg, setErrorMsg] = useState('')

  const getICP = async () => {
    setIsLoading(true)
    const response = await axios.post('/api/getICP', {accountId: icpRef.current.value}, { validateStatus: () => true })
    if (response.status === 201) {
      setSuccess(true)
    } else {
      setSuccess(false)
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
    }
    setIsLoading(false)
  }


  const renderFaucet = () => {
    if (activeTab === 'icp') {
      return <Faucet inputRef={icpRef} action={getICP} isLoading={isLoading} success={success} placeholder={'Identity Account ID'} status={errorMsg} btnTxt={'Get ICP'}/>
    } else {
      return <Faucet inputRef={cycleRef} action={getCycles} isLoading={isLoading} success={success} placeholder={'Wallet Canister ID'} status={errorMsg} btnTxt={'Get Cycles'}/>
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
