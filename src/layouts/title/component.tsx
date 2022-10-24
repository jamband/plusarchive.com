import Head from "next/head";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <Head>
    <meta property="og:title" content={props.title} />
    <title>{props.title}</title>
  </Head>
);
