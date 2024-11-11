import { APP_DESCRIPTION } from "@/constants/app";
import { IconAngleLeft } from "@/icons/angle-left";
import { IconCircleInfo } from "@/icons/circle-info";
import { Layout } from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import styles from "./404.module.css";
import type { PageComponent } from "./_app";

const Page: PageComponent = () => {
  return (
    <>
      <Head>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta property="og:description" content={APP_DESCRIPTION} />
      </Head>
      <div className={styles.container}>
        <h1>An error occurred</h1>
        <div className={styles.description}>
          <IconCircleInfo className={styles.descriptionIcon} />
          An error occurred.
        </div>
        <Link href="/" className={styles.link}>
          <IconAngleLeft className={styles.linkIcon} />
          Back to Home
        </Link>
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="An error occurred">{page}</Layout>;

export default Page;
