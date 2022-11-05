import { Fragment } from "react";
import { BrandIconLinks } from "~/components/brand-icon-links";
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
import {
  useBookmarksAdmin,
  useBookmarksCountries,
  useBookmarksTags,
  useDeleteBookmark,
} from "~/hooks/bookmarks";
import { useSelectFilter, useTextFilter } from "~/hooks/filter";
import { useRequireAdmin } from "~/hooks/require";
import { IconAngleDown } from "~/icons/angle-down";
import { IconUpRightFromSquare } from "~/icons/up-right-from-square";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "../_app";

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
    <div className="-mb-12">
      <GridContainer className="mb-6 grid-cols-[repeat(6,_minmax(0,_1fr))_7em]">
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
            className="m-1 border-gray-600 bg-gray-800"
            placeholder="Search..."
            value={name.value}
            onChange={name.onChange}
            onKeyDown={name.onKeyDown}
          />
        </GridFilter>
        <GridFilter>
          <div className="relative m-1 w-full">
            <select
              className="border-gray-600 bg-gray-800 md:pr-8"
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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <IconAngleDown className="h-3 w-3" />
            </div>
          </div>
        </GridFilter>
        <GridFilter />
        <GridFilter>
          <div className="relative m-1 w-full">
            <select
              className="border-gray-600 bg-gray-800 md:pr-8"
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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <IconAngleDown className="h-3 w-3" />
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
                <ExternalLink
                  href={bookmark.url}
                  className="text-rose-500 active:text-rose-500"
                >
                  <IconUpRightFromSquare className="mr-1 h-3 w-3 align-baseline" />
                  {bookmark.name}
                </ExternalLink>
              </GridContent>
              <GridContent className="truncate">{bookmark.country}</GridContent>
              <GridContent>
                <BrandIconLinks links={bookmark.links} />
              </GridContent>
              <GridContent className="truncate">
                {bookmark.tags.join(", ")}
              </GridContent>
              <GridContent>{bookmark.created_at}</GridContent>
              <GridContent>{bookmark.updated_at}</GridContent>
              <GridActions
                resource="/bookmarks"
                id={bookmark.id}
                mutation={() => {
                  confirm("Are you sure?") &&
                    deleteBookmark.mutate(bookmark.id);
                }}
              />
            </Fragment>
          ))}
      </GridContainer>
      {!!bookmarks.data && (
        <Pagination pagination={bookmarks.data.pagination} />
      )}
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Admin bookmarks">{page}</AdminLayout>
);

export default Page;
