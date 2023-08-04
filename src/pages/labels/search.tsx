import type { LabelCollection } from "@/types/labels";
import { http, searchParams } from "@/utils/api";
import type { GetServerSideProps } from "next";
import Page from ".";

type Props = {
  labelCollection: LabelCollection;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const labels = await http(
    `/labels/search?${searchParams(query, ["q", "page"])}`,
  );

  if (!labels.ok) {
    return { notFound: true };
  }

  return {
    props: {
      labelCollection: await labels.json(),
    },
  };
};

export default Page;
