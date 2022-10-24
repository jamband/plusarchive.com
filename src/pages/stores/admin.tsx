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
import { useSelectFilter, useTextFilter } from "~/hooks/filter";
import { useRequireAdmin } from "~/hooks/require";
import {
  useDeleteStore,
  useStoresAdmin,
  useStoresCountries,
  useStoresTags,
} from "~/hooks/stores";
import { IconAngleDown } from "~/icons/angle-down";
import { IconUpRightFromSquare } from "~/icons/up-right-from-square";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const countries = useStoresCountries();
  const tags = useStoresTags();

  const stores = useStoresAdmin();
  const deleteStore = useDeleteStore();

  const name = useTextFilter("name");
  const country = useSelectFilter("country");
  const tag = useSelectFilter("tag");

  if (stores.isLoading) {
    return <CenteredLoading />;
  }

  if (stores.isError) {
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
        {!!stores.data &&
          stores.data.data.map((store) => (
            <Fragment key={store.id}>
              <GridContent>
                <ExternalLink
                  href={store.url}
                  className="text-rose-500 active:text-rose-500"
                >
                  <IconUpRightFromSquare className="mr-1 h-3 w-3 align-baseline" />
                  {store.name}
                </ExternalLink>
              </GridContent>
              <GridContent className="truncate">{store.country}</GridContent>
              <GridContent className="truncate">
                <BrandIconLinks links={store.links} />
              </GridContent>
              <GridContent className="truncate">
                {store.tags.join(", ")}
              </GridContent>
              <GridContent>{store.created_at}</GridContent>
              <GridContent>{store.updated_at}</GridContent>
              <GridActions
                resource="/stores"
                id={store.id}
                mutation={() => {
                  confirm("Are you sure?") && deleteStore.mutate(store.id);
                }}
              />
            </Fragment>
          ))}
      </GridContainer>
      {!!stores.data && <Pagination pagination={stores.data.pagination} />}
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Admin stores">{page}</AdminLayout>
);

export default Page;
