import Head from "next/head";
import { APP_DESCRIPTION, APP_REPOSITORY_URL } from "~/constants/app";
import { IconGitHub } from "~/icons/github";
import { IconTwitter } from "~/icons/twitter";
import { Layout } from "~/layouts/layout";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  return (
    <>
      <Head>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta property="og:description" content={APP_DESCRIPTION} />
      </Head>
      <div className="lg:px-40">
        <h1>Contact</h1>
        <p>
          Please to the message via{" "}
          <a
            href="https://twitter.com/livejam_db"
            className="text-rose-500 underline active:text-rose-500"
            target="_blank"
            rel="noreferrer"
          >
            <IconTwitter className="mr-1 h-4 w-4 align-[-0.125em]" />
            Twitter
          </a>{" "}
          or{" "}
          <a
            href={`${APP_REPOSITORY_URL}/issues`}
            className="text-rose-500 underline active:text-rose-500"
            target="_blank"
            rel="noreferrer"
          >
            <IconGitHub className="mr-1 h-4 w-4 align-[-0.125em]" />
            GitHub
          </a>{" "}
          Issues. Thank you.
        </p>
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Contact">{page}</Layout>;

export default Page;
