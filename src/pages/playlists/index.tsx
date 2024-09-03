import { IconAngleRight } from "@/icons/angle-right";
import { Layout } from "@/layouts/layout";
import type { Playlist } from "@/types/playlists";
import { http } from "@/utils/api";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import type { PageComponent } from "../_app";

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
      <ul className="mt-6 flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-x-12 sm:gap-y-6">
        {props.playlists.map((playlist) => (
          <li key={playlist.id} className="leading-tight">
            <Link
              href={`/playlists/${playlist.id}`}
              className="py-2 text-[1.425rem] font-bold text-rose-500 active:text-rose-500"
            >
              {playlist.title}
              <IconAngleRight className="ml-2 h-4 w-4 align-baseline text-rose-500/60" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Playlists">{page}</Layout>;

export default Page;
