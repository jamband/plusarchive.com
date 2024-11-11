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
import { useBookmarksCountries, useBookmarksTags } from "@/hooks/bookmarks";
import { useUrlQuery } from "@/hooks/url-query";
import { IconRotateRight } from "@/icons/rotate-right";
import { IconTriangleExclamation } from "@/icons/triangle-exclamation";
import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import { Layout } from "@/layouts/layout";
import type { BookmarkCollection } from "@/types/bookmarks";
import { http, searchParams } from "@/utils/api";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { PageComponent } from "../_app";
import styles from "../labels/index.module.css";

type Props = {
  bookmarkCollection: BookmarkCollection;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const bookmarks = await http(
    `/bookmarks?${searchParams(query, ["country", "tag", "page"])}`,
  );

  if (!bookmarks.ok) {
    return { notFound: true };
  }

  return {
    props: {
      bookmarkCollection: await bookmarks.json(),
    },
  };
};

const Page: PageComponent<Props> = (props) => {
  const countries = useBookmarksCountries();
  const tags = useBookmarksTags();
  const { query } = useRouter();
  const { appendUrlQuery, resetUrlQuery } = useUrlQuery();

  const description = "My favorite bookmarks";

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Bookmarks</h1>
        <div className={styles.header}>
          <Link href="/bookmarks" className={styles.headerReset}>
            <IconRotateRight className={styles.headerResetIcon} />
            Reset All
          </Link>
          <TotalCount
            total={props.bookmarkCollection.pagination.total}
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
                  pathname: "/bookmarks",
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
                      pathname: "/bookmarks",
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
                  pathname: "/bookmarks",
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
                      pathname: "/bookmarks",
                      query: appendUrlQuery("tag", tag),
                    }}
                  >
                    {tag}
                  </DropdownLink>
                ))}
            </Dropdown>
          </div>
          <div className={styles.searchFormContainer}>
            <SearchForm className={styles.searchForm} />
            <TotalCount
              total={props.bookmarkCollection.pagination.total}
              className={styles.searchFormTotalCount}
            />
          </div>
        </div>
        <div className={styles.main}>
          {props.bookmarkCollection.data.map((bookmark) => (
            <article key={bookmark.name} className={styles.mainItems}>
              <section>
                <a
                  href={bookmark.url}
                  className={styles.mainName}
                  target="_blank"
                  rel="noreferrer"
                >
                  {bookmark.name}
                  <IconUpRightFromSquare className={styles.mainNameIcon} />
                </a>
              </section>
              <section className={styles.mainCountryContainer}>
                <span className={styles.mainCountry}>Country:</span>
                <Link
                  href={{
                    pathname: "/bookmarks",
                    query: { country: bookmark.country },
                  }}
                  className={styles.mainCountryLink}
                >
                  {bookmark.country}
                </Link>
              </section>
              <section className={styles.mainLinksContainer}>
                <span className={styles.mainLinks}>Links:</span>
                <BrandIconLinks links={bookmark.links} />
              </section>
              <TagLinks data={bookmark.tags} pathname="/bookmarks" />
              <hr className={styles.mainDivider} />
            </article>
          ))}
        </div>
        <Pagination
          pagination={props.bookmarkCollection.pagination}
          className={styles.pagination}
        />
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Bookmarks">{page}</Layout>;

export default Page;
