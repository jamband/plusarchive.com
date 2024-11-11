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
import { useLabelsCountries, useLabelsTags } from "@/hooks/labels";
import { useUrlQuery } from "@/hooks/url-query";
import { IconRotateRight } from "@/icons/rotate-right";
import { IconTriangleExclamation } from "@/icons/triangle-exclamation";
import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import { Layout } from "@/layouts/layout";
import type { LabelCollection } from "@/types/labels";
import { http, searchParams } from "@/utils/api";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { PageComponent } from "../_app";
import styles from "./index.module.css";

type Props = {
  labelCollection: LabelCollection;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const labels = await http(
    `/labels?${searchParams(query, ["country", "tag", "page"])}`,
  );

  if (!labels.ok) {
    return { notFound: true };
  }

  return {
    props: {
      labelCollection: await labels.json(),
    },
  };
};

const Page: PageComponent<Props> = (props) => {
  const countries = useLabelsCountries();
  const tags = useLabelsTags();
  const { query } = useRouter();
  const { appendUrlQuery, resetUrlQuery } = useUrlQuery();

  const description = "My favorite labels";

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Labels</h1>
        <div className={styles.header}>
          <Link href="/labels" className={styles.headerReset}>
            <IconRotateRight className={styles.headerResetIcon} />
            Reset All
          </Link>
          <TotalCount
            total={props.labelCollection.pagination.total}
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
                  pathname: "/labels",
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
                      pathname: "/labels",
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
                  pathname: "/labels",
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
                      pathname: "/labels",
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
              total={props.labelCollection.pagination.total}
              className={styles.searchFormTotalCount}
            />
          </div>
        </div>
        <div className={styles.main}>
          {props.labelCollection.data.map((label) => (
            <article key={label.name} className={styles.mainItems}>
              <section>
                <a
                  href={label.url}
                  className={styles.mainName}
                  target="_blank"
                  rel="noreferrer"
                >
                  {label.name}
                  <IconUpRightFromSquare className={styles.mainNameIcon} />
                </a>
              </section>
              <section className={styles.mainCountryContainer}>
                <span className={styles.mainCountry}>Country:</span>
                <Link
                  href={{
                    pathname: "/labels",
                    query: { country: label.country },
                  }}
                  className={styles.mainCountryLink}
                >
                  {label.country}
                </Link>
              </section>
              <section className={styles.mainLinksContainer}>
                <span className={styles.mainLinks}>Links:</span>
                <BrandIconLinks links={label.links} />
              </section>
              <TagLinks data={label.tags} pathname="/labels" />
              <hr className={styles.mainDivider} />
            </article>
          ))}
        </div>
        <Pagination
          pagination={props.labelCollection.pagination}
          className={styles.pagination}
        />
      </div>
    </>
  );
};

Page.getLayout = (page) => <Layout title="Labels">{page}</Layout>;

export default Page;
