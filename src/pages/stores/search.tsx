import type { StoreCollection } from "@/types/stores";
import { http, searchParams } from "@/utils/api";
import type { GetServerSideProps } from "next";
import Page from ".";

type Props = {
  storeCollection: StoreCollection;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const stores = await http(
    `/stores/search?${searchParams(query, ["q", "page"])}`
  );

  if (!stores.ok) {
    return { notFound: true };
  }

  return {
    props: {
      storeCollection: await stores.json(),
    },
  };
};

export default Page;
