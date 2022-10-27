import { ActionButton } from "~/components/action-button";
import { CenteredLoading } from "~/components/centered-loading";
import { DetailColumn } from "~/components/detail/column";
import { DetailContainer } from "~/components/detail/container";
import { DetailContent } from "~/components/detail/content";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { useRequireAdmin } from "~/hooks/require";
import { useDeleteStoreTag, useStoreTag } from "~/hooks/store-tags";
import { IconTrash } from "~/icons/trash";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "~/pages/_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const tag = useStoreTag();
  const deleteTag = useDeleteStoreTag();

  if (tag.isLoading) {
    return <CenteredLoading />;
  }

  if (tag.isError) {
    return <FailedToFetch />;
  }

  if (!tag.data) {
    return null;
  }

  return (
    <>
      <DetailContainer className="mb-10 grid-rows-2">
        <DetailColumn>ID</DetailColumn>
        <DetailColumn>Name</DetailColumn>
        <DetailContent>{tag.data.id}</DetailContent>
        <DetailContent>{tag.data.name}</DetailContent>
      </DetailContainer>
      <div className="flex justify-center">
        <ActionButton
          className="hover:bg-gray-700 hover:text-gray-100"
          onClick={() => {
            confirm("Are you sure?") &&
              !!tag.data &&
              deleteTag.mutate(tag.data.id);
          }}
        >
          <IconTrash className="mr-1 h-4 w-4 align-[-0.125em]" />
          Delete
        </ActionButton>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="View store tags">{page}</AdminLayout>
);

export default Page;
