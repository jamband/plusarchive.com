import Head from "next/head";
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_REPOSITORY_NAME,
  APP_REPOSITORY_URL,
} from "~/constants/app";
import { IconUpRightFromSquare } from "~/icons/up-right-from-square";
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
        <h1>About</h1>
        <p>{APP_NAME} is music archive website for everyday.</p>
        <p>This website is an open source project.</p>
        <a
          href={APP_REPOSITORY_URL}
          className="text-rose-500 underline active:text-rose-500"
          target="_blank"
          rel="noreferrer"
        >
          GitHub: {APP_REPOSITORY_NAME}
          <IconUpRightFromSquare className="ml-1 h-4 w-4 align-[-0.125em] text-rose-500/70" />
        </a>{" "}
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="About">{page}</Layout>;

export default Page;
