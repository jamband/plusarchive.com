import { ActionButton } from "~/components/action-button";
import { BrandIconLinks } from "~/components/brand-icon-links";
import { CenteredLoading } from "~/components/centered-loading";
import { DetailColumn } from "~/components/detail/column";
import { DetailContainer } from "~/components/detail/container";
import { DetailContent } from "~/components/detail/content";
import { ExternalLink } from "~/components/external-link";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { useBookmark, useDeleteBookmark } from "~/hooks/bookmarks";
import { useRequireAdmin } from "~/hooks/require";
import { IconTrash } from "~/icons/trash";
import { IconUpRightFromSquare } from "~/icons/up-right-from-square";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "~/pages/_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const bookmark = useBookmark();
  const deleteBookmark = useDeleteBookmark();

  if (bookmark.isLoading) {
    return <CenteredLoading />;
  }

  if (bookmark.isError) {
    return <FailedToFetch />;
  }

  if (!bookmark.data) {
    return null;
  }

  return (
    <>
      <DetailContainer className="mb-10 grid-rows-6">
        <DetailColumn>Name</DetailColumn>
        <DetailColumn>Country</DetailColumn>
        <DetailColumn>Links</DetailColumn>
        <DetailColumn>Tags</DetailColumn>
        <DetailColumn>Created at</DetailColumn>
        <DetailColumn>Updated at</DetailColumn>
        <DetailContent>
          <ExternalLink href={bookmark.data.url} className="text-rose-500">
            <IconUpRightFromSquare className="mr-1 h-4 w-4 align-[-0.125em]" />
            {bookmark.data.name}
          </ExternalLink>
        </DetailContent>
        <DetailContent>{bookmark.data.country}</DetailContent>
        <DetailContent>
          <BrandIconLinks links={bookmark.data.links} />
        </DetailContent>
        <DetailContent>{bookmark.data.tags.join(", ")}</DetailContent>
        <DetailContent>{bookmark.data.created_at}</DetailContent>
        <DetailContent>{bookmark.data.updated_at}</DetailContent>
      </DetailContainer>
      <div className="flex justify-center">
        <ActionButton
          className="hover:bg-gray-700 hover:text-gray-100"
          onClick={() => {
            confirm("Are you sure?") &&
              !!bookmark.data &&
              deleteBookmark.mutate(bookmark.data.id);
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
  <AdminLayout title="View bookmarks">{page}</AdminLayout>
);

export default Page;
