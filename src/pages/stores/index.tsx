import { BrandIconLinks } from "@/components/brand-icon-links";
import { Dropdown } from "@/components/dropdown";
import { DropdownDivider } from "@/components/dropdown/divider";
import { DropdownHeader } from "@/components/dropdown/header";
import { DropdownLink } from "@/components/dropdown/link";
import { DropdownText } from "@/components/dropdown/text";
import { Pagination } from "@/components/pagination";
import { SearchForm } from "@/components/search-form";
import { TagLinks } from "@/components/tag-links";
import { TotalCount } from "@/components/total-count";
import { useStoresCountries, useStoresTags } from "@/hooks/stores";
import { useUrlQuery } from "@/hooks/url-query";
import { IconRotateRight } from "@/icons/rotate-right";
import { IconTriangleExclamation } from "@/icons/triangle-exclamation";
import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import { Layout } from "@/layouts/layout";
import type { StoreCollection } from "@/types/stores";
import { http, searchParams } from "@/utils/api";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { PageComponent } from "../_app";

type Props = {
  storeCollection: StoreCollection;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const stores = await http(
    `/stores?${searchParams(query, ["country", "tag", "page"])}`,
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
            <div className="mb-1 flex justify-center md:mb-0">
              <Link
                href="/stores"
                className="group rounded px-2 py-0.5 hover:bg-gray-700 hover:text-gray-100 active:bg-gray-700 md:px-3 md:py-1"
              >
                <IconRotateRight className="mr-1.5 h-4 w-4 align-[-0.125em] text-gray-400/70 group-hover:text-gray-400" />
                Reset All
              </Link>
            </div>
            <TotalCount
              total={props.storeCollection.pagination.total}
              className="hidden px-3 py-1 md:block"
            />
            <div className="flex justify-center gap-x-1">
              <Dropdown
                label={`${query.country || "Countries"}`}
                className="px-2 py-0.5 hover:bg-gray-700 hover:text-gray-100 focus:bg-gray-700 focus:text-gray-100 md:px-3 md:py-1"
                iconClass="text-gray-400/70 group-hover:text-gray-400 group-focus:text-gray-400"
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
                label={`${query.tag || "Tags"}`}
                className="px-2 py-0.5 hover:bg-gray-700 hover:text-gray-100 focus:bg-gray-700 focus:text-gray-100 md:px-3 md:py-1"
                iconClass="text-gray-400/70 group-hover:text-gray-400 group-focus:text-gray-400"
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
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-6">
            {props.storeCollection.data.map((store) => (
              <article
                key={store.name}
                className="mt-8 flex flex-col gap-0.5 lg:mt-2"
              >
                <section>
                  <a
                    href={store.url}
                    className="text-[1.2rem] font-bold text-rose-500 active:text-rose-500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {store.name}
                    <IconUpRightFromSquare className="ml-1.5 h-4 w-4 align-[-0.05em] text-rose-500/60" />
                  </a>
                </section>
                <section className="flex gap-x-3">
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
                <section className="flex gap-x-3 overflow-scroll">
                  <span className="text-gray-100">Links:</span>
                  <BrandIconLinks links={store.links} />
                </section>
                <TagLinks data={store.tags} pathname="/stores" />
                <hr className="border-b-1 mt-8 border-gray-600" />
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
