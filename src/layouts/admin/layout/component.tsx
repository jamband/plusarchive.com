import Head from "next/head";
import { NotificationProvider } from "~/contexts/notification";
import { ServerStateProvider } from "~/contexts/server-state";
import { Loading } from "~/layouts/loading";
import { AdminFooter } from "../footer";
import { AdminHeader } from "../header";
import { AdminLinks } from "../links";
import { AdminNotification } from "../notification";
import { AdminPages } from "../pages";
import { AdminTitle } from "../title";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width" />
    </Head>
    <ServerStateProvider>
      <NotificationProvider>
        <AdminTitle title={props.title} />
        <Loading />
        <AdminNotification />
        <div className="flex min-h-screen flex-col">
          <AdminHeader />
          <main className="container mx-auto grow pt-6 pb-28">
            <div className="mb-6 flex justify-center gap-x-2 text-sm md:text-base">
              <AdminPages />
              <AdminLinks />
            </div>
            {props.children}
          </main>
          <AdminFooter />
        </div>
      </NotificationProvider>
    </ServerStateProvider>
  </>
);
