import { APP_DESCRIPTION, APP_REPOSITORY_URL } from "@/constants/app";
import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import { Layout } from "@/layouts/layout";
import Head from "next/head";
import type { PageComponent } from "../_app";
import styles from "./index.module.css";

const Page: PageComponent = () => {
  return (
    <>
      <Head>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta property="og:description" content={APP_DESCRIPTION} />
      </Head>
      <div className={styles.container}>
        <h1>Contact</h1>
        <p className={styles.description}>
          Please to the message via{" "}
          <a
            href="https://twitter.com/livejam_db"
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            X
            <IconUpRightFromSquare className={styles.linkIcon} />
          </a>{" "}
          or{" "}
          <a
            href={`${APP_REPOSITORY_URL}/issues`}
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <IconUpRightFromSquare className={styles.linkIcon} />
          </a>{" "}
          Issues. Thank you.
        </p>
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Contact">{page}</Layout>;

export default Page;
