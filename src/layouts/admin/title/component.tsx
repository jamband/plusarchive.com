import Head from "next/head";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <Head>
    <title>{props.title}</title>
  </Head>
);
