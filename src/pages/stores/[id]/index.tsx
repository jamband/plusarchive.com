import { ActionButton } from "~/components/action-button";
import { BrandIconLinks } from "~/components/brand-icon-links";
import { CenteredLoading } from "~/components/centered-loading";
import { DetailColumn } from "~/components/detail/column";
import { DetailContainer } from "~/components/detail/container";
import { DetailContent } from "~/components/detail/content";
import { ExternalLink } from "~/components/external-link";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { useRequireAdmin } from "~/hooks/require";
import { useDeleteStore, useStore } from "~/hooks/stores";
import { IconTrash } from "~/icons/trash";
import { IconUpRightFromSquare } from "~/icons/up-right-from-square";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "~/pages/_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const store = useStore();
  const deleteStore = useDeleteStore();

  if (store.isLoading) {
    return <CenteredLoading />;
  }

  if (store.isError) {
    return <FailedToFetch />;
  }

  if (!store.data) {
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
          <ExternalLink href={store.data.url} className="text-rose-500">
            <IconUpRightFromSquare className="mr-1 h-4 w-4 align-[-0.125em]" />
            {store.data.name}
          </ExternalLink>
        </DetailContent>
        <DetailContent>{store.data.country}</DetailContent>
        <DetailContent>
          <BrandIconLinks links={store.data.links} />
        </DetailContent>
        <DetailContent>{store.data.tags.join(", ")}</DetailContent>
        <DetailContent>{store.data.created_at}</DetailContent>
        <DetailContent>{store.data.updated_at}</DetailContent>
      </DetailContainer>
      <div className="flex justify-center">
        <ActionButton
          className="hover:bg-gray-700 hover:text-gray-100"
          onClick={() => {
            confirm("Are you sure?") &&
              !!store.data &&
              deleteStore.mutate(store.data.id);
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
  <AdminLayout title="View stores">{page}</AdminLayout>
);

export default Page;
