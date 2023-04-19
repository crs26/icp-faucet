import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useRef, useState } from 'react'
import { FormControlProps } from 'react-bootstrap'
import axios from 'axios'
import { Faucet } from '@/component/Faucet'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  const icpRef = useRef<any>(null)
  const cycleRef = useRef<any>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('icp')
  const [status, setStatus] = useState('')

  const getICP = async () => {
    setIsLoading(true)
    const response = await axios.post(
      '/api/getICP',
      { accountId: icpRef.current.value },
      { validateStatus: () => true }
    )
    if (response.status === 201) {
      setSuccess(true)
    } else {
      setSuccess(false)
      setStatus(
        response.data?.stderr ? cleanError(response.data.stderr) : response.data
      )
    }
    setIsLoading(false)
  }

  const getCycles = async () => {
    setIsLoading(true)
    const response = await axios.post(
      '/api/getCycles',
      { wallet: cycleRef.current.value },
      { validateStatus: () => true }
    )
    if (response.status === 201) {
      setSuccess(true)
    } else {
      setSuccess(false)
      setStatus(
        response.data?.stderr ? cleanError(response.data.stderr) : response.data
      )
    }
    setIsLoading(false)
  }

  const cleanError = (error: string) => {
    try {
      return error.replace(/\u001b\[\d{1,2}m|\u001b\(B\u001b\[m/g, '')
    } catch (error) {
      return ''
    }
  }

  const renderFaucet = () => {
    if (activeTab === 'icp') {
      return (
        <Faucet
          inputRef={icpRef}
          action={getICP}
          isLoading={isLoading}
          success={success}
          placeholder={'Ledger Account ID'}
          status={status}
          btnTxt={'Get ICP'}
        />
      )
    } else {
      return (
        <Faucet
          inputRef={cycleRef}
          action={getCycles}
          isLoading={isLoading}
          success={success}
          placeholder={'Wallet Canister ID'}
          status={status}
          btnTxt={'Get Cycles'}
        />
      )
    }
  }

  return (
    <main className='min-h-screen items-center p-24'>
      <div className='card'>
        <div className='card-header text-center'>
          <div className='d-flex justify-content-center'>
            <Image
              alt='SparkLearn EdTech Logo'
              className='mx-2 p-2'
              src='/images/logo.png'
              height='69'
              width='80'
            />
            <Image
              alt='ICP Logo'
              className='mx-2 p-2'
              src='/images/icp-logo.svg'
              height='69'
              width='80'
            />
          </div>
          <h3>SparkLearn EdTech ICP & Cycles Faucet</h3>
        </div>
        <div className='card-body'>
          <div className='row py-5'>
            <ul className='nav nav-tabs p-0'>
              <li className='nav-item col-6 text-center'>
                <a
                  className={`nav-link ${activeTab === 'icp' ? 'active' : ''}`}
                  href='#'
                  onClick={() => setActiveTab('icp')}
                >
                  ICP (default)
                </a>
              </li>
              <li className='nav-item col-6 text-center'>
                <a
                  className={`nav-link ${
                    activeTab === 'cycles' ? 'active' : ''
                  }`}
                  href='#'
                  onClick={() => setActiveTab('cycles')}
                >
                  Cycles
                </a>
              </li>
            </ul>
          </div>
          <div className='row d-flex justify-content-center mb-2'>
            <div className='col-10'>{renderFaucet()}</div>
          </div>
          <div className='text-center'>
            <i>For official ICP cycles faucet, visit </i>
            <a href='https://faucet.dfinity.org/' target='_blank'>
              https://faucet.dfinity.org
            </a>
          </div>
        </div>
        <div className='card-footer d-flex justify-content-center'>
          <small>
            ©
            <a
              href='https://sparklearn-edtech.com/'
              target='_blank'
              rel='noreferrer'
            >
              SparkLearn EdTech Inc.
            </a>
          </small>
        </div>
      </div>
    </main>
  )
}
