import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { useState } from "react";

export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR("/api/quote", fetcher);

  const [index, setIndex] = useState(0);

  if (error) return <div>Failed to Load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>Quote Machine for FCC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Quote Machine for{" "}
          <a href="https://freecodecamp.org" target="_blank">
            FCC
          </a>
        </h3>
        <div className={styles.card} id="quote-box">
          <h1 id="text">{data[index].text}</h1>
          <p id="author" className={styles.floatRight}>
            - {data[index].author}
          </p>
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${data[index].text} ${data[index].author}`}
            id="tweet-quote"
          >
            Tweet
          </a>
          <br />
          <button
            className={styles.button}
            onClick={() => setIndex(index + 1)}
            id="new-quote"
          >
            New Quote
          </button>
        </div>
        <footer className={styles.footer}>
          <p>
            by <strong>Muhammd Mejanul Haque</strong>
          </p>
        </footer>
      </main>
    </div>
  );
}
