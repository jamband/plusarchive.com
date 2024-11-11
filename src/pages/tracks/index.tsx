import { Dropdown } from "@/components/dropdown";
import { DropdownDivider } from "@/components/dropdown/divider";
import { DropdownHeader } from "@/components/dropdown/header";
import { DropdownLink } from "@/components/dropdown/link";
import { DropdownText } from "@/components/dropdown/text";
import { Pagination } from "@/components/pagination";
import { SearchForm } from "@/components/search-form";
import { TotalCount } from "@/components/total-count";
import { TrackCard } from "@/components/track-card";
import { useTracksGenres, useTracksProviders } from "@/hooks/tracks";
import { useUrlQuery } from "@/hooks/url-query";
import { IconClock } from "@/icons/clock";
import { IconRotateRight } from "@/icons/rotate-right";
import { IconTriangleExclamation } from "@/icons/triangle-exclamation";
import { Layout } from "@/layouts/layout";
import type { TrackCollection } from "@/types/tracks";
import { http, searchParams } from "@/utils/api";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { PageComponent } from "../_app";
import styles from "./index.module.css";

type Props = {
  trackCollection: TrackCollection;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const tracks = await http(
    `/tracks?${searchParams(query, ["provider", "genre", "page"])}`,
  );

  if (!tracks.ok) {
    return { notFound: true };
  }

  return {
    props: {
      trackCollection: await tracks.json(),
    },
  };
};

const Page: PageComponent<Props> = (props) => {
  const providers = useTracksProviders();
  const genres = useTracksGenres();
  const { query } = useRouter();
  const { appendUrlQuery, resetUrlQuery } = useUrlQuery();

  const description = "My favorite tracks";

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/tracks" className={styles.headerReset}>
            <IconRotateRight className={styles.headerResetIcon} />
            Reset All
          </Link>
          <TotalCount
            total={props.trackCollection.pagination.total}
            className={styles.headerTotalCount}
          />
          <div className={styles.headerDropdowns}>
            <Dropdown
              label={`${query.provider || "Providers"}`}
              className={styles.headerDropdown}
              iconClass={styles.headerDropdownIcon}
            >
              <DropdownHeader>Actions</DropdownHeader>
              <DropdownLink
                href={{
                  pathname: "/tracks",
                  query: resetUrlQuery("provider"),
                }}
              >
                Reset
              </DropdownLink>
              <DropdownDivider />
              <DropdownHeader>Providers</DropdownHeader>
              {providers.isLoading && <DropdownText>Loading...</DropdownText>}
              {providers.isError && (
                <DropdownText className={styles.headerDropdownError}>
                  <IconTriangleExclamation
                    className={styles.headerDropdownErrorIcon}
                  />
                  Request failed
                </DropdownText>
              )}
              {!!providers.data &&
                providers.data.map((provider) => (
                  <DropdownLink
                    key={provider}
                    href={{
                      pathname: "/tracks",
                      query: appendUrlQuery("provider", provider),
                    }}
                  >
                    {provider}
                  </DropdownLink>
                ))}
            </Dropdown>
            <Dropdown
              label={`${query.genre || "Genres"}`}
              className={styles.headerDropdown}
              iconClass={styles.headerDropdownIcon}
            >
              <DropdownHeader>Actions</DropdownHeader>
              <DropdownLink
                href={{
                  pathname: "/tracks",
                  query: resetUrlQuery("genre"),
                }}
              >
                Reset
              </DropdownLink>
              <DropdownDivider />
              <DropdownHeader>Genres</DropdownHeader>
              {genres.isLoading && <DropdownText>Loading...</DropdownText>}
              {genres.isError && (
                <DropdownText className={styles.headerDropdownError}>
                  <IconTriangleExclamation
                    className={styles.headerDropdownErrorIcon}
                  />
                  Request failed
                </DropdownText>
              )}
              {!!genres.data &&
                genres.data.map((genre) => (
                  <DropdownLink
                    key={genre}
                    href={{
                      pathname: "/tracks",
                      query: appendUrlQuery("genre", genre),
                    }}
                  >
                    {genre}
                  </DropdownLink>
                ))}
            </Dropdown>
          </div>
        </div>
        <div className={styles.searchFormContainer}>
          <SearchForm className={styles.searchForm} />
          <TotalCount
            total={props.trackCollection.pagination.total}
            className={styles.searchFormTotalCount}
          />
        </div>
        <div className={styles.main}>
          {props.trackCollection.data.map((track) => (
            <TrackCard key={track.id} track={track}>
              <IconClock className={styles.trackCardIcon} />
              {track.created_at}
            </TrackCard>
          ))}
        </div>
        <Pagination
          pagination={props.trackCollection.pagination}
          className={styles.pagination}
        />
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Tracks">{page}</Layout>;

export default Page;
