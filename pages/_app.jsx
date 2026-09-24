import Head from 'next/head'
import '../src/App.css'
import '../styles/next-root.css'

export default function BlazelinkApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blazelink 鏈客行銷 — 自動化獲客的成長引擎</title>
        <meta
          name="description"
          content="為 B2B 企業、知識服務、跨國品牌打造，自動化獲客的成長引擎，讓品牌擁有可持續的正向循環。"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
