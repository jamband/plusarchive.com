import { ActionButton } from "~/components/action-button";
import { BrandIconLinks } from "~/components/brand-icon-links";
import { CenteredLoading } from "~/components/centered-loading";
import { DetailColumn } from "~/components/detail/column";
import { DetailContainer } from "~/components/detail/container";
import { DetailContent } from "~/components/detail/content";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { useDeleteLabel, useLabel } from "~/hooks/labels";
import { useRequireAdmin } from "~/hooks/require";
import { IconTrash } from "~/icons/trash";
import { IconUpRightFromSquare } from "~/icons/up-right-from-square";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "~/pages/_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const label = useLabel();
  const deleteLabel = useDeleteLabel();

  if (label.isLoading) {
    return <CenteredLoading />;
  }

  if (label.isError) {
    return <FailedToFetch />;
  }

  if (!label.data) {
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
          <a
            href={label.data.url}
            className="font-bold text-rose-500"
            target="_blank"
            rel="noreferrer"
          >
            {label.data.name}
            <IconUpRightFromSquare className="ml-1.5 h-4 w-4 align-[-0.125em] text-rose-500/60" />
          </a>
        </DetailContent>
        <DetailContent>{label.data.country}</DetailContent>
        <DetailContent>
          <BrandIconLinks links={label.data.links} />
        </DetailContent>
        <DetailContent>{label.data.tags.join(", ")}</DetailContent>
        <DetailContent>{label.data.created_at}</DetailContent>
        <DetailContent>{label.data.updated_at}</DetailContent>
      </DetailContainer>
      <div className="flex justify-center">
        <ActionButton
          className="hover:bg-gray-700 hover:text-gray-100"
          onClick={() => {
            confirm("Are you sure?") &&
              !!label.data &&
              deleteLabel.mutate(label.data.id);
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
  <AdminLayout title="View labels">{page}</AdminLayout>
);

export default Page;
