import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SparkLearn EdTech ICP & Cycles Faucet</title>
      </Head>
      <Component {...pageProps}/>
    </>
  )
}
