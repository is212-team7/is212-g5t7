import { Button, Spacer } from '@geist-ui/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    const router = useRouter();

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

                <Button type="secondary" onClick={() => router.push('/login')}>
                    Login
                </Button>

                <Spacer height={3} />

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h2>Staff</h2>
                        <p>
                            Plan your learning journeys, find tailored courses
                            and track your progress.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h2>Manager</h2>
                        <p>
                            View your employees&apos; skills and courses, create
                            job roles and assign skills to the role.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h2>HR</h2>
                        <p>
                            Create courses and indicate their respective skills,
                            and create job roles and assign skills to the role.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
