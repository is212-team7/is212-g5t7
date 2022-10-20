import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>IS212 G5T7 - Learning Journey Planning System</title>
                <meta
                    name="description"
                    content="Learning Journey Planning System"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Learning Journey Planning System
                </h1>

                <p className={styles.description}>
                    Get a boost in building your own career ladder 🪜
                </p>

                <div className={styles.grid}>
                    <Link href={'/roles'}>
                        <div className={styles.card}>
                            <h2>Staff &rarr;</h2>
                            <p>
                                Plan your learning journeys, find tailored
                                courses and track your progress.
                            </p>
                        </div>
                    </Link>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h2>Manager &rarr;</h2>
                        <p>
                            View your employees&apos; skills and courses, create
                            job roles and assign skills to the role.
                        </p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/canary/examples"
                        className={styles.card}
                    >
                        <h2>HR &rarr;</h2>
                        <p>
                            Create courses and indicate their respective skills,
                            and create job roles and assign skills to the role.
                        </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
};

export default Home;
