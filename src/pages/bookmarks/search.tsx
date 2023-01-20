import type { BookmarkCollection } from "@/types/bookmarks";
import { http, searchParams } from "@/utils/api";
import type { GetServerSideProps } from "next";
import Page from ".";

type Props = {
  bookmarkCollection: BookmarkCollection;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const bookmarks = await http(
    `/bookmarks/search?${searchParams(query, ["q", "page"])}`
  );

  if (!bookmarks.ok) {
    return { notFound: true };
  }

  return {
    props: {
      bookmarkCollection: await bookmarks.json(),
    },
  };
};

export default Page;
