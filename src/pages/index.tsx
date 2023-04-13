import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen items-center p-24">
      <div className='row'>
        <div className='col-12 text-center'>
          <h1>
            ICP Faucet
          </h1>
        </div>
      </div>
    </main>
  )
}
