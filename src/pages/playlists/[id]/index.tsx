import { usePlayerAction } from "@/hooks/player";
import { Layout } from "@/layouts/layout";
import type { PageComponent } from "@/pages/_app";
import type { Playlist } from "@/types/playlists";
import { http } from "@/utils/api";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

type Props = {
  playlist: Playlist;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const playlists = await http("/playlists").then((response) => {
    return response.json();
  });

  return {
    paths: playlists.map(({ id }: Playlist) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const playlist = await http(`/playlists/${params?.id}`);

  if (!playlist.ok) {
    return { notFound: true };
  }

  return {
    props: {
      playlist: await playlist.json(),
    },
  };
};

const Page: PageComponent<Props> = (props) => {
  const { setPlayer } = usePlayerAction();

  const description = `${props.playlist.title} (via ${props.playlist.provider})`;

  useEffect(() => {
    setPlayer({
      ...props.playlist,
      type: "playlist",
    });
  }, [setPlayer, props.playlist]);

  return (
    <Head>
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
    </Head>
  );
};

Page.getLayout = (page) => (
  <Layout title={page.props.playlist.title}>{page}</Layout>
);

export default Page;
