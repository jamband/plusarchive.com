import type { TrackCollection } from "@/types/tracks";
import { http, searchParams } from "@/utils/api";
import type { GetServerSideProps } from "next";
import Page from ".";

type Props = {
  trackCollection: TrackCollection;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const tracks = await http(
    `/tracks/search?${searchParams(query, ["q", "page"])}`
  );

  if (!tracks.ok) {
    return { notFound: true };
  }

  return {
    props: {
      trackCollection: await tracks.json(),
    },
  };
};

export default Page;
