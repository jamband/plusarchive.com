import { CenteredLoading } from "@/components/centered-loading";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { GridActions } from "@/components/grid/actions";
import { GridContainer } from "@/components/grid/container";
import { GridContent } from "@/components/grid/content";
import { GridFilter } from "@/components/grid/filter";
import { GridHeader } from "@/components/grid/header";
import { GridHeaderActions } from "@/components/grid/header-actions";
import { GridHeaderSort } from "@/components/grid/header-sort";
import { Pagination } from "@/components/pagination";
import { useSelectFilter, useTextFilter } from "@/hooks/filter";
import { useDeletePlaylist, usePlaylistsAdmin } from "@/hooks/playlists";
import { useRequireAdmin } from "@/hooks/require";
import { useTracksProviders } from "@/hooks/tracks";
import { IconAngleDown } from "@/icons/angle-down";
import { AdminLayout } from "@/layouts/admin/layout";
import { Fragment } from "react";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const playlists = usePlaylistsAdmin();
  const providers = useTracksProviders();
  const deletePlaylist = useDeletePlaylist();

  const title = useTextFilter("title");
  const provider = useSelectFilter("provider");

  if (playlists.isLoading) {
    return <CenteredLoading />;
  }

  if (playlists.isError) {
    return <FailedToFetch />;
  }

  return (
    <div className="-mb-12">
      <GridContainer className="mb-8 grid-cols-[repeat(4,_minmax(0,_1fr))_7em]">
        <GridHeader>
          <GridHeaderSort column="title" type="string">
            Title
          </GridHeaderSort>
        </GridHeader>
        <GridHeader>Provider</GridHeader>
        <GridHeader>
          <GridHeaderSort column="created_at" type="string">
            Created at
          </GridHeaderSort>
        </GridHeader>
        <GridHeader>
          <GridHeaderSort column="updated_at" type="string">
            Updated at
          </GridHeaderSort>
        </GridHeader>
        <GridHeader>
          <GridHeaderActions />
        </GridHeader>
        <GridFilter>
          <input
            type="text"
            className="m-1 border-gray-600 bg-gray-800"
            placeholder="Search..."
            value={title.value}
            onChange={title.onChange}
            onKeyDown={title.onKeyDown}
          />
        </GridFilter>
        <GridFilter>
          <div className="relative m-1 w-full">
            <select
              className="border-gray-600 bg-gray-800 md:pr-8"
              value={provider.value}
              onChange={provider.onChange}
            >
              {providers.isError && <option value="">Request failed...</option>}
              {providers.isLoading && <option value="">Loading...</option>}
              <option value=""></option>
              {!!providers.data &&
                providers.data.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <IconAngleDown className="h-3 w-3" />
            </div>
          </div>
        </GridFilter>
        <GridFilter />
        <GridFilter />
        <GridFilter />
        {!!playlists.data &&
          playlists.data.data.map((playlist) => (
            <Fragment key={playlist.id}>
              <GridContent className="truncate font-semibold">
                {playlist.title}
              </GridContent>
              <GridContent className="truncate">
                {playlist.provider}
              </GridContent>
              <GridContent>{playlist.created_at}</GridContent>
              <GridContent>{playlist.updated_at}</GridContent>
              <GridActions
                resource="/playlists"
                id={playlist.id}
                mutation={() =>
                  confirm("Are you sure?") && deletePlaylist.mutate(playlist.id)
                }
              />
            </Fragment>
          ))}
      </GridContainer>
      {!!playlists.data && (
        <Pagination pagination={playlists.data.pagination} />
      )}
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Admin playlists">{page}</AdminLayout>
);

export default Page;
