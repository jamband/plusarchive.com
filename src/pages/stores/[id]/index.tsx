import { BrandIconLinks } from "~/components/brand-icon-links";
import { CenteredLoading } from "~/components/centered-loading";
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
      <div className="mb-8 grid grid-flow-col grid-rows-6 gap-0.5 text-sm leading-normal">
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Name</div>
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Country</div>
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Links</div>
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Tags</div>
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Created at</div>
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Updated at</div>
        <div className="bg-gray-700 px-4 py-2">
          <ExternalLink href={store.data.url} className="text-rose-500">
            <IconUpRightFromSquare className="mr-1 h-4 w-4 align-[-0.125em]" />
            {store.data.name}
          </ExternalLink>
        </div>
        <div className="bg-gray-700 px-4 py-2">{store.data.country}</div>
        <div className="bg-gray-700 px-4 py-2">
          <BrandIconLinks links={store.data.links} />
        </div>
        <div className="bg-gray-700 px-4 py-2">
          {store.data.tags.join(", ")}
        </div>
        <div className="bg-gray-700 px-4 py-2">{store.data.created_at}</div>
        <div className="bg-gray-700 px-4 py-2">{store.data.updated_at}</div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="rounded px-4 py-1 hover:bg-gray-700 hover:text-gray-100"
          onClick={() => {
            confirm("Are you sure?") &&
              !!store.data &&
              deleteStore.mutate(store.data.id);
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
  <AdminLayout title="View stores">{page}</AdminLayout>
);

export default Page;