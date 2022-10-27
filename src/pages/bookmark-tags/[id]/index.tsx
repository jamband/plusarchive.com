import { CenteredLoading } from "~/components/centered-loading";
import { DetailColumn } from "~/components/detail/column";
import { DetailContainer } from "~/components/detail/container";
import { DetailContent } from "~/components/detail/content";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { useBookmarkTag, useDeleteBookmarkTag } from "~/hooks/bookmark-tags";
import { useRequireAdmin } from "~/hooks/require";
import { IconTrash } from "~/icons/trash";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "~/pages/_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const tag = useBookmarkTag();
  const deleteTag = useDeleteBookmarkTag();

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
        <button
          type="button"
          className="rounded px-4 py-1 hover:bg-gray-700 hover:text-gray-100"
          onClick={() => {
            confirm("Are you sure?") &&
              !!tag.data &&
              deleteTag.mutate(tag.data.id);
          }}
        >
          <IconTrash className="mr-1 h-4 w-4 align-[-0.125em]" />
          Delete
        </button>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="View bookmark tags">{page}</AdminLayout>
);

export default Page;
