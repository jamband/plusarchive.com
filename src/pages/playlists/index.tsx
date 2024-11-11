import { IconAngleRight } from "@/icons/angle-right";
import { Layout } from "@/layouts/layout";
import type { Playlist } from "@/types/playlists";
import { http } from "@/utils/api";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import type { PageComponent } from "../_app";
import styles from "./index.module.css";

type Props = {
  playlists: Array<Playlist>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const playlists = await http("/playlists");

  if (!playlists.ok) {
    return { notFound: true };
  }

  return {
    props: {
      playlists: await playlists.json(),
    },
  };
};

const Page: PageComponent<Props> = (props) => {
  const description = "Playlists via SoundCloud or YouTube";

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <h1>Playlists</h1>
      <p>via SoundCloud or YouTube</p>
      <ul className={styles.list}>
        {props.playlists.map((playlist) => (
          <li key={playlist.id} className={styles.listItem}>
            <Link href={`/playlists/${playlist.id}`} className={styles.link}>
              {playlist.title}
              <IconAngleRight className={styles.linkIcon} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Playlists">{page}</Layout>;

export default Page;
