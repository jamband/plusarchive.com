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
import styles from "../labels/index.module.css";

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
      <div className={styles.container}>
        <h1 className={styles.title}>Stores</h1>
        <div className={styles.header}>
          <Link href="/stores" className={styles.headerReset}>
            <IconRotateRight className={styles.headerResetIcon} />
            Reset All
          </Link>
          <TotalCount
            total={props.storeCollection.pagination.total}
            className={styles.headerTotalCount}
          />
          <div className={styles.headerDropdowns}>
            <Dropdown
              label={`${query.country || "Countries"}`}
              className={styles.headerDropdown}
              iconClass={styles.headerDropdownIcon}
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
                <DropdownText className={styles.headerDropdownError}>
                  <IconTriangleExclamation
                    className={styles.headerDropdownErrorIcon}
                  />
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
              className={styles.headerDropdown}
              iconClass={styles.headerDropdownIcon}
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
                <DropdownText className={styles.headerDropdownError}>
                  <IconTriangleExclamation
                    className={styles.headerDropdownErrorIcon}
                  />
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
        <div className={styles.searchFormContainer}>
          <SearchForm className={styles.searchForm} />
          <TotalCount
            total={props.storeCollection.pagination.total}
            className={styles.searchFormTotalCount}
          />
        </div>
        <div className={styles.main}>
          {props.storeCollection.data.map((store) => (
            <article key={store.name} className={styles.mainItems}>
              <section>
                <a
                  href={store.url}
                  className={styles.mainName}
                  target="_blank"
                  rel="noreferrer"
                >
                  {store.name}
                  <IconUpRightFromSquare className={styles.mainNameIcon} />
                </a>
              </section>
              <section className={styles.mainCountryContainer}>
                <span className={styles.mainCountry}>Country:</span>
                <Link
                  href={{
                    pathname: "/stores",
                    query: { country: store.country },
                  }}
                  className={styles.mainCountryLink}
                >
                  {store.country}
                </Link>
              </section>
              <section className={styles.mainLinksContainer}>
                <span className={styles.mainLinks}>Links:</span>
                <BrandIconLinks links={store.links} />
              </section>
              <TagLinks data={store.tags} pathname="/stores" />
              <hr className={styles.mainDivider} />
            </article>
          ))}
        </div>
        <Pagination
          pagination={props.storeCollection.pagination}
          className={styles.pagination}
        />
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Stores">{page}</Layout>;

export default Page;
