import { APP_NAME } from "@/constants/app";
import { PlayerProvider } from "@/contexts/player";
import { ServerStateProvider } from "@/contexts/server-state";
import Head from "next/head";
import { Footer } from "../footer";
import { Header } from "../header";
import { Loading } from "../loading";
import { Player } from "../player";
import { Title } from "../title";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width,viewport-fit=cover" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:url" content={props.url} />
    </Head>
    <ServerStateProvider>
      <PlayerProvider>
        <Title title={props.title} />
        <Loading />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="container mx-auto grow pb-24 pt-10">
            <Player />
            {props.children}
          </main>
          <Footer />
        </div>
      </PlayerProvider>
    </ServerStateProvider>
  </>
);
