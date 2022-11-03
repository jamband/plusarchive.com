import { Fragment } from "react";
import { CenteredLoading } from "~/components/centered-loading";
import { ExternalLink } from "~/components/external-link";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { GridActions } from "~/components/grid/actions";
import { GridContainer } from "~/components/grid/container";
import { GridContent } from "~/components/grid/content";
import { GridFilter } from "~/components/grid/filter";
import { GridHeader } from "~/components/grid/header";
import { GridHeaderActions } from "~/components/grid/header-actions";
import { GridHeaderSort } from "~/components/grid/header-sort";
import { Pagination } from "~/components/pagination";
import { useSelectFilter, useTextFilter } from "~/hooks/filter";
import { useNotificationAction } from "~/hooks/notification";
import { useRequireAdmin } from "~/hooks/require";
import {
  useDeleteTrack,
  useTracksAdmin,
  useTracksGenres,
  useTracksProviders,
  useTrackToggleUrge,
} from "~/hooks/tracks";
import { IconAngleDown } from "~/icons/angle-down";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const tracks = useTracksAdmin();
  const providers = useTracksProviders();
  const genres = useTracksGenres();
  const deleteTrack = useDeleteTrack();

  const title = useTextFilter("title");
  const provider = useSelectFilter("provider");
  const urge = useSelectFilter("urge");
  const genre = useSelectFilter("genre");

  const toggleUrge = useTrackToggleUrge();
  const { setNotification } = useNotificationAction();

  const onToggleUrge = (id: string) => {
    toggleUrge.mutate(id, {
      onError: async (response) => {
        const { message } = await response.json();
        setNotification(message);
      },
    });
  };

  if (tracks.isLoading) {
    return <CenteredLoading />;
  }

  if (tracks.isError) {
    return <FailedToFetch />;
  }

  return (
    <div className="-mb-12">
      <GridContainer className="mb-8 grid-cols-[repeat(6,_minmax(0,_1fr))_7em]">
        <GridHeader>
          <GridHeaderSort column="title" type="string">
            Title
          </GridHeaderSort>
        </GridHeader>
        <GridHeader>Provider</GridHeader>
        <GridHeader>Urge</GridHeader>
        <GridHeader>Genre</GridHeader>
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
              {providers.isLoading && <option value="">Loading...</option>}
              {providers.isError && <option value="">Request failed</option>}
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
        <GridFilter>
          <div className="relative m-1 w-full">
            <select
              className="border-gray-600 bg-gray-800 md:pr-8"
              value={urge.value}
              onChange={urge.onChange}
            >
              <option value=""></option>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <IconAngleDown className="h-3 w-3" />
            </div>
          </div>
        </GridFilter>
        <GridFilter>
          <div className="relative m-1 w-full">
            <select
              className="border-gray-600 bg-gray-800 md:pr-8"
              value={genre.value}
              onChange={genre.onChange}
            >
              {genres.isLoading && <option value="">Loading...</option>}
              {genres.isError && <option value="">Request failed</option>}
              <option value=""></option>
              {!!genres.data &&
                genres.data.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
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
        {!!tracks.data &&
          tracks.data.data.map((track) => (
            <Fragment key={track.id}>
              <GridContent>
                <ExternalLink
                  href={track.url}
                  className="text-rose-500 active:text-rose-500"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={track.image}
                    className="mr-2 inline h-6 w-6 rounded-full bg-gray-600"
                    alt=""
                    loading="lazy"
                  />
                  {track.title}
                </ExternalLink>
              </GridContent>
              <GridContent className="truncate">{track.provider}</GridContent>
              <GridContent>
                <button
                  type="button"
                  className={`rounded p-0.5 px-3 ${
                    track.urge
                      ? "bg-rose-500 text-gray-100"
                      : "bg-gray-600 text-gray-400"
                  }`}
                  onClick={() => onToggleUrge(track.id)}
                >
                  {track.urge ? "Yes" : "No"}
                </button>
              </GridContent>
              <GridContent className="truncate">
                {track.genres.join(", ")}
              </GridContent>
              <GridContent>{track.created_at}</GridContent>
              <GridContent>{track.updated_at}</GridContent>
              <GridActions
                resource="/tracks"
                id={track.id}
                mutation={() => {
                  confirm("Are you sure?") && deleteTrack.mutate(track.id);
                }}
              />
            </Fragment>
          ))}
      </GridContainer>
      {!!tracks.data && <Pagination pagination={tracks.data.pagination} />}
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Admin tracks">{page}</AdminLayout>
);

export default Page;
