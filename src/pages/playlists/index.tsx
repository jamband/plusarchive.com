import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { IconAngleRight } from "~/icons/angle-right";
import { Layout } from "~/layouts/layout";
import type { Playlist } from "~/types/playlists";
import { http } from "~/utils/api";
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
      <div className="grid gap-4 md:grid-cols-2 md:px-16 lg:px-32">
        <div>
          <h1>Playlists</h1>
          <p>via SoundCloud or YouTube</p>
        </div>
        <ul className="flex flex-col gap-y-2">
          {props.playlists.map((playlist) => (
            <li key={playlist.id}>
              <Link
                href={`/playlists/${playlist.id}`}
                className="inline-flex items-center text-[24px] font-semibold text-rose-500 active:text-rose-500"
              >
                {playlist.title}
                <IconAngleRight className="mx-2 h-4 w-4 text-rose-500/60" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Playlists">{page}</Layout>;

export default Page;
