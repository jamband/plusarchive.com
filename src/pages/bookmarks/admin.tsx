import { BrandIconLinks } from "@/components/brand-icon-links";
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
import {
  useBookmarksAdmin,
  useBookmarksCountries,
  useBookmarksTags,
  useDeleteBookmark,
} from "@/hooks/bookmarks";
import { useSelectFilter, useTextFilter } from "@/hooks/filter";
import { useRequireAdmin } from "@/hooks/require";
import { IconAngleDown } from "@/icons/angle-down";
import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import { AdminLayout } from "@/layouts/admin/layout";
import { Fragment } from "react";
import type { PageComponent } from "../_app";
import styles from "../labels/admin.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const countries = useBookmarksCountries();
  const tags = useBookmarksTags();

  const bookmarks = useBookmarksAdmin();
  const deleteBookmark = useDeleteBookmark();

  const name = useTextFilter("name");
  const country = useSelectFilter("country");
  const tag = useSelectFilter("tag");

  if (bookmarks.isLoading) {
    return <CenteredLoading />;
  }

  if (bookmarks.isError) {
    return <FailedToFetch />;
  }

  return (
    <div className={styles.container}>
      <GridContainer className={styles.grid}>
        <GridHeader>
          <GridHeaderSort column="name" type="string">
            Name
          </GridHeaderSort>
        </GridHeader>
        <GridHeader>Country</GridHeader>
        <GridHeader>Links</GridHeader>
        <GridHeader>Tags</GridHeader>
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
            value={name.value}
            onChange={name.onChange}
            onKeyDown={name.onKeyDown}
          />
        </GridFilter>
        <GridFilter>
          <div className={styles.filterComboboxContainer}>
            <select
              className={styles.filterCombobox}
              value={country.value}
              onChange={country.onChange}
            >
              {countries.isLoading && <option value="">Loading...</option>}
              {countries.isError && <option value="">Request failed</option>}
              <option value=""></option>
              {!!countries.data &&
                countries.data.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
            </select>
            <div className={styles.filterComboboxIconContainer}>
              <IconAngleDown className={styles.filterComboboxIcon} />
            </div>
          </div>
        </GridFilter>
        <GridFilter />
        <GridFilter>
          <div className={styles.filterComboboxContainer}>
            <select
              className={styles.filterCombobox}
              value={tag.value}
              onChange={tag.onChange}
            >
              {tags.isLoading && <option value="">Loading...</option>}
              {tags.isError && <option value="">Request failed</option>}
              <option value=""></option>
              {!!tags.data &&
                tags.data.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
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
        {!!bookmarks.data &&
          bookmarks.data.data.map((bookmark) => (
            <Fragment key={bookmark.id}>
              <GridContent>
                <a
                  href={bookmark.url}
                  className={styles.contentLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {bookmark.name}
                  <IconUpRightFromSquare className={styles.contentLinkIcon} />
                </a>
              </GridContent>
              <GridContent className={styles.content}>
                {bookmark.country}
              </GridContent>
              <GridContent>
                <BrandIconLinks links={bookmark.links} />
              </GridContent>
              <GridContent className={styles.content}>
                {bookmark.tags.join(", ")}
              </GridContent>
              <GridContent>{bookmark.created_at}</GridContent>
              <GridContent>{bookmark.updated_at}</GridContent>
              <GridActions
                resource="/bookmarks"
                id={bookmark.id}
                mutation={() =>
                  confirm("Are you sure?") && deleteBookmark.mutate(bookmark.id)
                }
              />
            </Fragment>
          ))}
      </GridContainer>
      {!!bookmarks.data && (
        <Pagination
          pagination={bookmarks.data.pagination}
          className={styles.pagination}
        />
      )}
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Admin bookmarks">{page}</AdminLayout>
);

export default Page;
