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
import { useNotificationAction } from "@/hooks/notification";
import { useRequireAdmin } from "@/hooks/require";
import {
  useDeleteTrack,
  useToggleUrge,
  useTracksAdmin,
  useTracksGenres,
  useTracksProviders,
} from "@/hooks/tracks";
import { IconAngleDown } from "@/icons/angle-down";
import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import { AdminLayout } from "@/layouts/admin/layout";
import { Fragment } from "react";
import type { PageComponent } from "../_app";
import styles from "./admin.module.css";

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

  const toggleUrge = useToggleUrge();
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
    <div className={styles.container}>
      <GridContainer className={styles.grid}>
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
            className={styles.filterTextbox}
            placeholder="Search..."
            value={title.value}
            onChange={title.onChange}
            onKeyDown={title.onKeyDown}
          />
        </GridFilter>
        <GridFilter>
          <div className={styles.filterComboboxContainer}>
            <select
              className={styles.filterCombobox}
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
            <div className={styles.filterComboboxIconContainer}>
              <IconAngleDown className={styles.filterComboboxIcon} />
            </div>
          </div>
        </GridFilter>
        <GridFilter>
          <div className={styles.filterComboboxContainer}>
            <select
              className={styles.filterCombobox}
              value={urge.value}
              onChange={urge.onChange}
            >
              <option value=""></option>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
            <div className={styles.filterComboboxIconContainer}>
              <IconAngleDown className={styles.filterComboboxIcon} />
            </div>
          </div>
        </GridFilter>
        <GridFilter>
          <div className={styles.filterComboboxContainer}>
            <select
              className={styles.filterCombobox}
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
            <div className={styles.filterComboboxIconContainer}>
              <IconAngleDown className={styles.filterComboboxIcon} />
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
                <a
                  href={track.url}
                  className={styles.contentLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <picture>
                    <img
                      src={track.image}
                      className={styles.contentLinkImage}
                      alt=""
                      loading="lazy"
                    />
                  </picture>
                  {track.title}
                  <IconUpRightFromSquare className={styles.contentLinkIcon} />
                </a>
              </GridContent>
              <GridContent className={styles.content}>
                {track.provider}
              </GridContent>
              <GridContent>
                <button
                  type="button"
                  className={`${styles.contentToggleButton} ${
                    track.urge
                      ? styles.contentToggleButtonActive
                      : styles.contentToggleButtonInactive
                  }`}
                  onClick={() => onToggleUrge(track.id)}
                >
                  {track.urge ? "Yes" : "No"}
                </button>
              </GridContent>
              <GridContent className={styles.content}>
                {track.genres.join(", ")}
              </GridContent>
              <GridContent>{track.created_at}</GridContent>
              <GridContent>{track.updated_at}</GridContent>
              <GridActions
                resource="/tracks"
                id={track.id}
                mutation={() =>
                  confirm("Are you sure?") && deleteTrack.mutate(track.id)
                }
              />
            </Fragment>
          ))}
      </GridContainer>
      {!!tracks.data && (
        <Pagination
          pagination={tracks.data.pagination}
          className={styles.pagination}
        />
      )}
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Admin tracks">{page}</AdminLayout>
);

export default Page;
