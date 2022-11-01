import Head from "next/head";
import Link from "next/link";
import { APP_DESCRIPTION } from "~/constants/app";
import { IconAngleLeft } from "~/icons/angle-left";
import { IconCircleInfo } from "~/icons/circle-info";
import { Layout } from "~/layouts/layout";
import type { PageComponent } from "./_app";

const Page: PageComponent = () => {
  return (
    <>
      <Head>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta property="og:description" content={APP_DESCRIPTION} />
      </Head>
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1>An error occurred</h1>
        <div className="mb-10">
          <IconCircleInfo className="mr-1 h-4 w-4 align-[-0.125em]" />
          An error occurred.
        </div>
        <Link href="/" className="text-rose-500 active:text-rose-500">
          <IconAngleLeft className="mr-0.5 h-4 w-4 align-[-0.125em]" />
          Back to Home
        </Link>
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="An error occurred">{page}</Layout>;

export default Page;
