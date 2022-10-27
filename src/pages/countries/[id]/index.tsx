import { CenteredLoading } from "~/components/centered-loading";
import { DetailColumn } from "~/components/detail/column";
import { DetailContainer } from "~/components/detail/container";
import { DetailContent } from "~/components/detail/content";
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
      <DetailContainer className="mb-10 grid-rows-2">
        <DetailColumn>ID</DetailColumn>
        <DetailColumn>Name</DetailColumn>
        <DetailContent>{country.data.id}</DetailContent>
        <DetailContent>{country.data.name}</DetailContent>
      </DetailContainer>
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
