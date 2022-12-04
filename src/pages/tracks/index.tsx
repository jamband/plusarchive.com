import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dropdown } from "~/components/dropdown";
import { DropdownDivider } from "~/components/dropdown/divider";
import { DropdownHeader } from "~/components/dropdown/header";
import { DropdownLink } from "~/components/dropdown/link";
import { DropdownText } from "~/components/dropdown/text";
import { Pagination } from "~/components/pagination";
import { SearchForm } from "~/components/search-form";
import { TotalCount } from "~/components/total-count";
import { TrackCard } from "~/components/track-card";
import { useTracksGenres, useTracksProviders } from "~/hooks/tracks";
import { useUrlQuery } from "~/hooks/url-query";
import { IconClock } from "~/icons/clock";
import { IconRotateRight } from "~/icons/rotate-right";
import { IconTriangleExclamation } from "~/icons/triangle-exclamation";
import { Layout } from "~/layouts/layout";
import type { TrackCollection } from "~/types/tracks";
import { http, searchParams } from "~/utils/api";
import type { PageComponent } from "../_app";

type Props = {
  trackCollection: TrackCollection;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const tracks = await http(
    `/tracks?${searchParams(query, ["provider", "genre", "page"])}`
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
      <div className="-mt-4 -mb-6">
        <div className="text-sm md:mb-5 md:flex md:items-center md:justify-center md:text-base">
          <div className="mb-1 flex justify-center md:mb-0">
            <Link
              href="/tracks"
              className="group rounded py-0.5 px-2 hover:bg-gray-700 hover:text-gray-100 active:bg-gray-700 md:px-3 md:py-1"
            >
              <IconRotateRight className="mr-1.5 h-4 w-4 align-[-0.125em] text-gray-400/70 group-hover:text-gray-400" />
              Reset All
            </Link>
          </div>
          <TotalCount
            total={props.trackCollection.pagination.total}
            className="hidden px-3 py-1 md:block"
          />
          <div className="mb-3 flex justify-center gap-x-1 md:mb-0">
            <Dropdown
              label={`${query.provider || "Providers"}`}
              className="px-2 py-0.5 hover:bg-gray-700 hover:text-gray-100 focus:bg-gray-700 focus:text-gray-100 md:px-3 md:py-1"
              iconClass="text-gray-400/70 group-hover:text-gray-400 group-focus:text-gray-400"
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
                <DropdownText className="text-red-600">
                  <IconTriangleExclamation className="mr-1 h-4 w-4 align-[-0.125em]" />
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
              className="px-2 py-0.5 hover:bg-gray-700 hover:text-gray-100 focus:bg-gray-700 focus:text-gray-100 md:px-3 md:py-1"
              iconClass="text-gray-400/70 group-hover:text-gray-400 group-focus:text-gray-400"
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
                <DropdownText className="text-red-600">
                  <IconTriangleExclamation className="mr-1 h-4 w-4 align-[-0.125em]" />
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
        <div className="mb-5 md:hidden">
          <SearchForm className="border-gray-700 bg-gray-900 md:hidden" />
          <TotalCount
            total={props.trackCollection.pagination.total}
            className="flex justify-end text-sm"
          />
        </div>
        <div className="mb-8 md:grid md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {props.trackCollection.data.map((track) => (
            <TrackCard key={track.id} track={track}>
              <IconClock className="mr-1.5 h-3 w-3 align-[-0.125em] md:align-[-0.04em]" />
              {track.created_at}
            </TrackCard>
          ))}
        </div>
        <Pagination pagination={props.trackCollection.pagination} />
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Tracks">{page}</Layout>;

export default Page;
