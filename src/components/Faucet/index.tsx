import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

type FaucetProps = {
    inputRef: any
    action: Function
    isLoading: boolean
    success: boolean
    placeholder: string
    status: string
    btnTxt: string
}

export const Faucet: React.FC<FaucetProps> = ({inputRef, action, isLoading, success, placeholder, status, btnTxt}) => {
  return (
    <div className='row'>
        <div className='col-12 text-center'>
            <InputGroup className="mb-3">
            <Form.Control
                placeholder={placeholder}
                aria-label={placeholder}
                aria-describedby="basic-addon2"
                ref={inputRef}
            />
            <Button className='col-2' variant="outline-success" id="button-addon2" onClick={() => action()} disabled={isLoading}>
                {isLoading ? 'Loading' : btnTxt}
            </Button>
            </InputGroup>
            <p className={`${success ? 'text-success' : 'text-danger'} ${isLoading ? 'dnone' : ''}`}>{status}</p>
        </div>
    </div>
  )
}


