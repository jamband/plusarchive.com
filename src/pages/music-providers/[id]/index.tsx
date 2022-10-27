import { CenteredLoading } from "~/components/centered-loading";
import { DetailColumn } from "~/components/detail/column";
import { DetailContainer } from "~/components/detail/container";
import { DetailContent } from "~/components/detail/content";
import { FailedToFetch } from "~/components/failed-to-fetch";
import {
  useDeleteMusicProvider,
  useMusicProvider,
} from "~/hooks/music-providers";
import { useRequireAdmin } from "~/hooks/require";
import { IconTrash } from "~/icons/trash";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "~/pages/_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const provider = useMusicProvider();
  const deleteProvider = useDeleteMusicProvider();

  if (provider.isLoading) {
    return <CenteredLoading />;
  }

  if (provider.isError) {
    return <FailedToFetch />;
  }

  if (!provider.data) {
    return null;
  }

  return (
    <>
      <DetailContainer className="mb-10 grid-rows-2">
        <DetailColumn>ID</DetailColumn>
        <DetailColumn>Name</DetailColumn>
        <DetailContent>{provider.data.id}</DetailContent>
        <DetailContent>{provider.data.name}</DetailContent>
      </DetailContainer>
      <div className="flex justify-center">
        <button
          type="button"
          className="rounded px-4 py-1 hover:bg-gray-700 hover:text-gray-100"
          onClick={() => {
            confirm("Are you sure?") &&
              !!provider.data &&
              deleteProvider.mutate(provider.data.id);
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
  <AdminLayout title="View music providers">{page}</AdminLayout>
);

export default Page;
