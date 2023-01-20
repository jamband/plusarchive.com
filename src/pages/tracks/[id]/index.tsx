import { usePlayerAction } from "@/hooks/player";
import { Layout } from "@/layouts/layout";
import type { PageComponent } from "@/pages/_app";
import type { Track } from "@/types/tracks";
import { http } from "@/utils/api";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

type Props = {
  track: Track;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const track = await http(`/tracks/${params?.id}`);

  if (!track.ok) {
    return { notFound: true };
  }

  return {
    props: {
      track: await track.json(),
    },
  };
};

const Page: PageComponent<Props> = (props) => {
  const { setPlayer } = usePlayerAction();

  const description = `${props.track.title} (via ${props.track.provider})`;

  useEffect(() => {
    setPlayer({
      ...props.track,
      type: "track",
    });
  }, [setPlayer, props.track]);

  return (
    <Head>
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={props.track.image} />
    </Head>
  );
};

Page.getLayout = (page) => (
  <Layout title={page.props.track.title}>{page}</Layout>
);

export default Page;
