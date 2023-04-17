import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] });

const keyboardEventToString = (ev: KeyboardEvent): string => {
  return `altKey: ${ev.altKey}, code: ${ev.code}, ctrlKey: ${ev.ctrlKey}, isComposing: ${ev.isComposing}, key: ${ev.key}, location: ${ev.location}, metaKey: ${ev.metaKey}, repeat: ${ev.repeat}, shiftKey: ${ev.shiftKey}`;
}

export default function Home() {

  const [messages, setMessages] = useState([] as string[]);

  useEffect(() => {
    window.addEventListener("keydown", (ev) => {
      setMessages([`KeyDown: ${keyboardEventToString(ev)}`, ...messages]);
    });
    window.addEventListener("keypress", (ev) => {
      setMessages([`KeyPress: ${keyboardEventToString(ev)}`, ...messages]);
    });
    window.addEventListener("keyup", (ev) => {
      setMessages([`KeyUp: ${keyboardEventToString(ev)}`, ...messages]);
    });
  });

  return (
    <>
      <Head>
        <title>TV Samples</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p>MESSAGES:</p>
        <div>
          {messages.map((msg, index) => {
            return (
              <p key={`msg${index}`}>{msg}</p>
            );
          })}
        </div>
      </main>
    </>
  )
}
