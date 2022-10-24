import { Fragment } from "react";
import { CenteredLoading } from "~/components/centered-loading";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { GridActions } from "~/components/grid/actions";
import { GridContainer } from "~/components/grid/container";
import { GridContent } from "~/components/grid/content";
import { GridFilter } from "~/components/grid/filter";
import { GridHeader } from "~/components/grid/header";
import { GridHeaderActions } from "~/components/grid/header-actions";
import { GridHeaderSort } from "~/components/grid/header-sort";
import { Pagination } from "~/components/pagination";
import { useTextFilter } from "~/hooks/filter";
import { useRequireAdmin } from "~/hooks/require";
import { useAdminTrackGenres, useDeleteTrackGenre } from "~/hooks/track-genres";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const name = useTextFilter("name");
  const genres = useAdminTrackGenres();
  const deleteGenre = useDeleteTrackGenre();

  if (genres.isLoading) {
    return <CenteredLoading />;
  }

  if (genres.isError) {
    return <FailedToFetch />;
  }

  return (
    <div className="-mb-12">
      <GridContainer className="mb-6 grid-cols-[repeat(2,_minmax(0,_1fr))_7em]">
        <GridHeader>
          <GridHeaderSort column="id" type="number">
            ID
          </GridHeaderSort>
        </GridHeader>
        <GridHeader>
          <GridHeaderSort column="name" type="string">
            Name
          </GridHeaderSort>
        </GridHeader>
        <GridHeader>
          <GridHeaderActions />
        </GridHeader>
        <GridFilter />
        <GridFilter>
          <input
            type="text"
            className="m-1 border-gray-600 bg-gray-800"
            placeholder="Search..."
            value={name.value}
            onChange={name.onChange}
            onKeyDown={name.onKeyDown}
          />
        </GridFilter>
        <GridFilter />
        {!!genres.data &&
          genres.data.data.map((genre) => (
            <Fragment key={genre.id}>
              <GridContent>{genre.id}</GridContent>
              <GridContent>{genre.name}</GridContent>
              <GridActions
                resource="/track-genres"
                id={genre.id}
                mutation={() => {
                  confirm("Are you sure?") && deleteGenre.mutate(genre.id);
                }}
              />
            </Fragment>
          ))}
      </GridContainer>
      {!!genres.data && <Pagination pagination={genres.data.pagination} />}
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Admin track genres">{page}</AdminLayout>
);

export default Page;
