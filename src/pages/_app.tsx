import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "~/styles/app.css";

export type PageComponent<P = Record<string, unknown>> = NextPage<P> & {
  getLayout: (page: React.ReactElement) => React.ReactNode;
};

type Props = AppProps & {
  Component: PageComponent;
};

export default function MyApp({ Component, pageProps }: Props) {
  return Component.getLayout(<Component {...pageProps} />);
}
