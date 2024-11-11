import { NotificationProvider } from "@/contexts/notification";
import { ServerStateProvider } from "@/contexts/server-state";
import { Loading } from "@/layouts/loading";
import Head from "next/head";
import { AdminFooter } from "../footer";
import { AdminHeader } from "../header";
import { AdminLinks } from "../links";
import { AdminNotification } from "../notification";
import { AdminPages } from "../pages";
import { AdminTitle } from "../title";
import styles from "./styles.module.css";
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
        <div className={styles.container}>
          <AdminHeader />
          <main className={styles.main}>
            <div className={styles.mainHeader}>
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
