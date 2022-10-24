import { BrandIconLinks } from "~/components/brand-icon-links";
import { CenteredLoading } from "~/components/centered-loading";
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
      <div className="mb-8 grid grid-flow-col grid-rows-6 gap-0.5 text-sm leading-normal">
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Name</div>
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Country</div>
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Links</div>
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Tags</div>
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Created at</div>
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Updated at</div>
        <div className="bg-gray-700 px-4 py-2">
          <ExternalLink href={bookmark.data.url} className="text-rose-500">
            <IconUpRightFromSquare className="mr-1 h-4 w-4 align-[-0.125em]" />
            {bookmark.data.name}
          </ExternalLink>
        </div>
        <div className="bg-gray-700 px-4 py-2">{bookmark.data.country}</div>
        <div className="bg-gray-700 px-4 py-2">
          <BrandIconLinks links={bookmark.data.links} />
        </div>
        <div className="bg-gray-700 px-4 py-2">
          {bookmark.data.tags.join(", ")}
        </div>
        <div className="bg-gray-700 px-4 py-2">{bookmark.data.created_at}</div>
        <div className="bg-gray-700 px-4 py-2">{bookmark.data.updated_at}</div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="rounded px-4 py-1 hover:bg-gray-700 hover:text-gray-100"
          onClick={() => {
            confirm("Are you sure?") &&
              !!bookmark.data &&
              deleteBookmark.mutate(bookmark.data.id);
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
  <AdminLayout title="View bookmarks">{page}</AdminLayout>
);

export default Page;
