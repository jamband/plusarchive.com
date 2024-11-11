import { TrackCard } from "@/components/track-card";
import { IconAngleRight } from "@/icons/angle-right";
import { IconClock } from "@/icons/clock";
import { Layout } from "@/layouts/layout";
import type { TrackCollection } from "@/types/tracks";
import { http } from "@/utils/api";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import type { PageComponent } from "./_app";
import styles from "./index.module.css";

type Props = {
  tracks: TrackCollection["data"];
  genres: Array<string>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tracks = await http("/tracks/favorites");
  const genres = await http("/tracks/minimal-genres?limit=38");

  if (!tracks.ok || !genres.ok) {
    return { notFound: true };
  }

  return {
    props: {
      tracks: await tracks.json(),
      genres: await genres.json(),
    },
  };
};

const Page: PageComponent<Props> = (props) => {
  const description = "Recent favorite tracks and search by genres";

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <section>
        <h2>
          Recent{" "}
          <small className={styles.recentTitleSuffix}>favorite tracks</small>
        </h2>
        <div className={styles.recentMain}>
          {props.tracks.map((track) => (
            <TrackCard key={track.id} track={track}>
              <IconClock className={styles.recentMainCardIcon} />
              {track.created_at}
            </TrackCard>
          ))}
        </div>
      </section>
      <section className={styles.search}>
        <h2>
          Search <small className={styles.searchTitleSuffix}>by genres</small>
        </h2>
        <ul className={styles.searchList}>
          {props.genres.map((genre) => (
            <li key={genre}>
              <Link
                href={{
                  pathname: "/tracks",
                  query: { genre },
                }}
                className={styles.searchLink}
              >
                {genre}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <div className={styles.footer}>
        <Link href="/tracks" className={styles.footerLink}>
          Go to Tracks
        </Link>
        <span className={styles.footerLinkDivider}>or</span>
        <Link href="/playlists" className={styles.footerLink}>
          Playlists
          <IconAngleRight className={styles.footerLinkIcon} />
        </Link>
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="">{page}</Layout>;

export default Page;
