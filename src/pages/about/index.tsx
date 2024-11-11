import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_REPOSITORY_NAME,
  APP_REPOSITORY_URL,
} from "@/constants/app";
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
        <h1>About</h1>
        <div className={styles.descriptionContainer}>
          <p>{APP_NAME} is music archive website for everyday.</p>
          <p>This website is an open source project.</p>
        </div>
        <a
          href={APP_REPOSITORY_URL}
          className={styles.link}
          target="_blank"
          rel="noreferrer"
        >
          GitHub: {APP_REPOSITORY_NAME}
          <IconUpRightFromSquare className={styles.linkIcon} />
        </a>{" "}
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="About">{page}</Layout>;

export default Page;
