import type { NextPage } from 'next'
import React, { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

interface Opction {
  method: string,
  headers: any,
  body: any,
}

const Home: NextPage = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const endpoint: string = '/api/brackets-balance'
    const options: Opction = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code
      }),
    }

    try {
      const response: Response = await fetch(endpoint, options)
      const result: any = await response.json()
      const { balance } = result

      if (balance) {
        setSuccess('Is balanced')
        setError('')
      } else {
        setSuccess('')
        setError("Isn't balanced")
      }
    } catch (error: any) {
      setSuccess('')
      setError(error.message)
    }
  }

  const handleChange = (event: any) => {
    setCode(event.target.value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Brackets Balance</title>
        <meta name="description" content="Brackets Balance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Brackets Balance
        </h1>

        <p className={styles.description}>
          To get started write{' '}
          <code className={styles.code}>the code</code>
        </p>

        {success && (
          <div className={styles.success}>
            {success}
          </div>
        )}

        {error && (
          <div className={styles.alert}>
            {error}
          </div>
        )}

        <div className={styles.grid}>
          <form onSubmit={handleSubmit}>
            <textarea className={styles.textarea} value={code} onChange={handleChange} id="code" name="code" />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>@Reinaldo Porto</p>
      </footer>
    </div>
  )
}

export default Home
