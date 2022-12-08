import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { TrackCard } from "~/components/track-card";
import { IconAngleRight } from "~/icons/angle-right";
import { IconClock } from "~/icons/clock";
import { Layout } from "~/layouts/layout";
import type { TrackCollection } from "~/types/tracks";
import { http } from "~/utils/api";
import type { PageComponent } from "./_app";

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
      <section className="mb-10">
        <h2 className="mb-2 text-4xl">
          Recent{" "}
          <small className="text-base text-gray-400">favorite tracks</small>
        </h2>
        <div className="md:grid md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {props.tracks.map((track) => (
            <TrackCard key={track.id} track={track}>
              <IconClock className="h-4 w-4 align-[-0.175em] md:h-4 md:w-4 md:align-[-0.175em]" />
              {track.created_at}
            </TrackCard>
          ))}
        </div>
      </section>
      <section className="mb-10">
        <h2 className="mb-2 text-4xl">
          Search <small className="text-base text-gray-400">by genres</small>
        </h2>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {props.genres.map((genre) => (
            <li key={genre}>
              <Link
                href={{
                  pathname: "/tracks",
                  query: { genre },
                }}
                className="hover:text-gray-100"
              >
                {genre}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <div className="flex justify-center">
        <Link href="/tracks" className="text-rose-500 active:text-rose-500">
          Go to Tracks
        </Link>
        <span className="mx-2">or</span>
        <Link href="/playlists" className="text-rose-500 active:text-rose-500">
          Playlists
          <IconAngleRight className="ml-1 h-4 w-4 align-[-0.125em] text-rose-500/60 md:align-[-0.1em]" />
        </Link>
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="">{page}</Layout>;

export default Page;
