import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BrandIconLinks } from "~/components/brand-icon-links";
import { Dropdown } from "~/components/dropdown";
import { DropdownDivider } from "~/components/dropdown/divider";
import { DropdownHeader } from "~/components/dropdown/header";
import { DropdownLink } from "~/components/dropdown/link";
import { DropdownText } from "~/components/dropdown/text";
import { ExternalLink } from "~/components/external-link";
import { Pagination } from "~/components/pagination";
import { SearchForm } from "~/components/search-form";
import { TotalCount } from "~/components/total-count";
import { useStoresCountries, useStoresTags } from "~/hooks/stores";
import { useUrlQuery } from "~/hooks/url-query";
import { IconRotateRight } from "~/icons/rotate-right";
import { IconTriangleExclamation } from "~/icons/triangle-exclamation";
import { IconUpRightFromSquare } from "~/icons/up-right-from-square";
import { Layout } from "~/layouts/layout";
import type { StoreCollection } from "~/types/stores";
import { http, searchParams } from "~/utils/api";
import type { PageComponent } from "../_app";

type Props = {
  storeCollection: StoreCollection;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const stores = await http(
    `/stores?${searchParams(query, ["country", "tag", "page"])}`
  );

  if (!stores.ok) {
    return { notFound: true };
  }

  return {
    props: {
      storeCollection: await stores.json(),
    },
  };
};

const Page: PageComponent<Props> = (props) => {
  const countries = useStoresCountries();
  const tags = useStoresTags();
  const { query } = useRouter();
  const { appendUrlQuery, resetUrlQuery } = useUrlQuery();

  const description = "My favorite stores";

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <div className="-mb-6">
        <div className="mb-8">
          <h1 className="flex justify-center">Stores</h1>
          <div className="mb-3 text-sm md:mb-8 md:flex md:items-center md:justify-center md:text-base">
            <div className="flex justify-center">
              <Link
                href="/stores"
                className="rounded px-2 py-0.5 hover:bg-gray-700 hover:text-gray-100 active:bg-gray-700 md:px-3 md:py-1"
              >
                <IconRotateRight className="mr-1 h-4 w-4 align-[-0.125em]" />
                Reset All
              </Link>
            </div>
            <TotalCount
              total={props.storeCollection.pagination.total}
              className="hidden px-3 py-1 md:block"
            />
            <div className="flex justify-center gap-x-1">
              <Dropdown
                className="px-2 py-0.5 hover:bg-gray-700 hover:text-gray-100 focus:bg-gray-700 focus:text-gray-100 md:px-3 md:py-1"
                label={`${query.country || "Countries"}`}
              >
                <DropdownHeader>Actions</DropdownHeader>
                <DropdownLink
                  href={{
                    pathname: "/stores",
                    query: resetUrlQuery("country"),
                  }}
                >
                  Reset
                </DropdownLink>
                <DropdownDivider />
                <DropdownHeader>Countries</DropdownHeader>
                {countries.isLoading && <DropdownText>Loading...</DropdownText>}
                {countries.isError && (
                  <DropdownText className="text-red-600">
                    <IconTriangleExclamation className="mr-1 h-4 w-4 align-[-0.125em]" />
                    Request failed
                  </DropdownText>
                )}
                {!!countries.data &&
                  countries.data.map((country) => (
                    <DropdownLink
                      key={country}
                      href={{
                        pathname: "/stores",
                        query: appendUrlQuery("country", country),
                      }}
                    >
                      {country}
                    </DropdownLink>
                  ))}
              </Dropdown>
              <Dropdown
                className="px-2 py-0.5 hover:bg-gray-700 hover:text-gray-100 focus:bg-gray-700 focus:text-gray-100 md:px-3 md:py-1"
                label={`${query.tag || "Tags"}`}
              >
                <DropdownHeader>Actions</DropdownHeader>
                <DropdownLink
                  href={{
                    pathname: "/stores",
                    query: resetUrlQuery("tag"),
                  }}
                >
                  Reset
                </DropdownLink>
                <DropdownDivider />
                <DropdownHeader>Tags</DropdownHeader>
                {tags.isLoading && <DropdownText>Loading...</DropdownText>}
                {tags.isError && (
                  <DropdownText className="text-red-600">
                    <IconTriangleExclamation className="mr-1 h-4 w-4 align-[-0.125em]" />
                    Request failed
                  </DropdownText>
                )}
                {!!tags.data &&
                  tags.data.map((tag) => (
                    <DropdownLink
                      key={tag}
                      href={{
                        pathname: "/stores",
                        query: appendUrlQuery("tag", tag),
                      }}
                    >
                      {tag}
                    </DropdownLink>
                  ))}
              </Dropdown>
            </div>
          </div>
          <div className="mb-5 md:hidden">
            <SearchForm className="border-gray-700 bg-gray-900 md:hidden" />
            <TotalCount
              total={props.storeCollection.pagination.total}
              className="flex justify-end text-sm"
            />
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-6">
            {props.storeCollection.data.map((store) => (
              <article key={store.name} className="mb-10 lg:mb-2">
                <section>
                  <ExternalLink
                    href={store.url}
                    className="font-semibold text-rose-500 active:text-rose-500"
                  >
                    <IconUpRightFromSquare className="mr-1 h-4 w-4 align-[-0.05em]" />
                    {store.name}
                  </ExternalLink>
                </section>
                <section className="flex flex-wrap gap-x-3">
                  <span className="text-gray-100">Country:</span>
                  <Link
                    href={{
                      pathname: "/stores",
                      query: { country: store.country },
                    }}
                    className="hover:text-gray-100"
                  >
                    {store.country}
                  </Link>
                </section>
                <section className="flex flex-wrap gap-x-3">
                  <span className="text-gray-100">Links:</span>
                  <BrandIconLinks links={store.links} />
                </section>
                <section className="mb-2 flex flex-wrap gap-x-3">
                  <span className="text-gray-100">Tags:</span>
                  {store.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={{
                        pathname: "/stores",
                        query: { tag },
                      }}
                      className="hover:text-gray-100"
                    >
                      {tag}
                    </Link>
                  ))}
                </section>
                <hr className="border-b-1 border-gray-600" />
              </article>
            ))}
          </div>
        </div>
        <Pagination pagination={props.storeCollection.pagination} />
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Stores">{page}</Layout>;

export default Page;
