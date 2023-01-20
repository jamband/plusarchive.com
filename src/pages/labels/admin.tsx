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
import { useSelectFilter, useTextFilter } from "@/hooks/filter";
import {
  useDeleteLabel,
  useLabelsAdmin,
  useLabelsCountries,
  useLabelsTags,
} from "@/hooks/labels";
import { useRequireAdmin } from "@/hooks/require";
import { IconAngleDown } from "@/icons/angle-down";
import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import { AdminLayout } from "@/layouts/admin/layout";
import { Fragment } from "react";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const countries = useLabelsCountries();
  const tags = useLabelsTags();

  const labels = useLabelsAdmin();
  const deleteLabel = useDeleteLabel();

  const name = useTextFilter("name");
  const country = useSelectFilter("country");
  const tag = useSelectFilter("tag");

  if (labels.isLoading) {
    return <CenteredLoading />;
  }

  if (labels.isError) {
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
        {!!labels.data &&
          labels.data.data.map((label) => (
            <Fragment key={label.id}>
              <GridContent>
                <a
                  href={label.url}
                  className="font-semibold text-rose-500 active:text-rose-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  {label.name}
                  <IconUpRightFromSquare className="ml-1 h-3 w-3 align-baseline text-rose-500/60" />
                </a>
              </GridContent>
              <GridContent className="truncate">{label.country}</GridContent>
              <GridContent>
                <BrandIconLinks links={label.links} />
              </GridContent>
              <GridContent className="truncate">
                {label.tags.join(", ")}
              </GridContent>
              <GridContent>{label.created_at}</GridContent>
              <GridContent>{label.updated_at}</GridContent>
              <GridActions
                resource="/labels"
                id={label.id}
                mutation={() => {
                  confirm("Are you sure?") && deleteLabel.mutate(label.id);
                }}
              />
            </Fragment>
          ))}
      </GridContainer>
      {!!labels.data && <Pagination pagination={labels.data.pagination} />}
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Admin labels">{page}</AdminLayout>
);

export default Page;
