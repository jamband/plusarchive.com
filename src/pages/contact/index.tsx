import Head from "next/head";
import { ExternalLink } from "~/components/external-link";
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
        <h1>
          Contact{" "}
          <small className="text-base text-gray-400">
            for bugs and questions
          </small>
        </h1>
        <p>
          Please to the message via{" "}
          <ExternalLink
            href="https://twitter.com/livejam_db"
            className="text-rose-500 underline active:text-rose-500"
          >
            <IconTwitter className="mr-1 h-4 w-4 align-[-0.125em]" />
            Twitter
          </ExternalLink>{" "}
          or{" "}
          <ExternalLink
            href={`${APP_REPOSITORY_URL}/issues`}
            className="text-rose-500 underline active:text-rose-500"
          >
            <IconGitHub className="mr-1 h-4 w-4 align-[-0.125em]" />
            GitHub
          </ExternalLink>{" "}
          Issues. Thank you.
        </p>
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Contact">{page}</Layout>;

export default Page;
