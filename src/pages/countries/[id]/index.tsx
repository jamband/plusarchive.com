import { CenteredLoading } from "~/components/centered-loading";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { useCountry, useDeleteCountry } from "~/hooks/countries";
import { IconTrash } from "~/icons/trash";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "~/pages/_app";

const Page: PageComponent = () => {
  const country = useCountry();
  const deleteCountry = useDeleteCountry();

  if (country.isLoading) {
    return <CenteredLoading />;
  }

  if (country.isError) {
    return <FailedToFetch />;
  }

  if (!country.data) {
    return null;
  }

  return (
    <>
      <div className="mb-10 grid grid-flow-col grid-rows-2 gap-0.5 text-sm leading-normal">
        <div className="bg-gray-600 px-4 py-2 text-gray-200">ID</div>
        <div className="bg-gray-600 px-4 py-2 text-gray-200">Name</div>
        <div className="bg-gray-700 px-4 py-2">{country.data.id}</div>
        <div className="bg-gray-700 px-4 py-2">{country.data.name}</div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="rounded px-4 py-1 hover:bg-gray-700 hover:text-gray-100"
          onClick={() => {
            confirm("Are you sure?") &&
              !!country.data &&
              deleteCountry.mutate(country.data.id);
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
  <AdminLayout title="View countries">{page}</AdminLayout>
);

export default Page;
