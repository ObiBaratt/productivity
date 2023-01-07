import Head from "next/head";
import type { NextPage } from "next";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next UP: Home</title>
        <meta
          name="description"
          content="Todo and Productivity App Index Page created by Obi Baratt"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Next UP: Work Smarter.</h1>

        <section id="description" className={styles.fifty}>
          <h1>Benefits of Next UP</h1>
          <div>
            <p>
              Ever started using a productivity app but found all it did was add
              one more task to your day?
            </p>

            <p>
              Do you alternate between different tools for different needs and
              find syncing a headache?
            </p>

            <p>
              Next UP integrates a todo list, Kanban Board, Pomodoro timer and
              more to make this a one stop shop to manage the endless list of
              things to do!
            </p>
          </div>

          <h1>Ready to get started?</h1>
        </section>

        <section id="apps" className={styles.grid}>
          <span className={styles.card}>
            <Link href="/todo">
              <h2>TODO List &rarr;</h2>
              <p>Get right into it, manage your TODO list.</p>
            </Link>
          </span>

          <span className={styles.card}>
            <Link href="/about">
              <h2>About &rarr;</h2>
              <p>
                Learn about productivity techniques, and how to best use this
                app.
              </p>
            </Link>
          </span>

          <a
            href="https://kanban-ob.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Kanban &rarr;</h2>
            <p>
              Free cloud based Kanban board? Lets go! Currently hosted on
              another site.
            </p>
          </a>

          <span className={styles.card}>
            <Link href="/pomodoro">
              <h2>Pomodoro &rarr;</h2>
              <p>Setup a pomodoro timer to create focused work time.</p>
            </Link>
          </span>
        </section>
      </main>

      <Image height={150} width={150} src="/nu-logo.png" alt="logo" />
      <footer className={styles.footer}>
        <a
          href="https://github.com/ObiBaratt"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Obi Baratt
        </a>
      </footer>
    </div>
  );
};

export default Home;
