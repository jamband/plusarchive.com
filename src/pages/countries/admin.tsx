import { CenteredLoading } from "@/components/centered-loading";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { GridActions } from "@/components/grid/actions";
import { GridContainer } from "@/components/grid/container";
import { GridContent } from "@/components/grid/content";
import { GridHeader } from "@/components/grid/header";
import { GridHeaderActions } from "@/components/grid/header-actions";
import { GridHeaderSort } from "@/components/grid/header-sort";
import { useAdminCountries, useDeleteCountry } from "@/hooks/countries";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import { Fragment } from "react";
import type { PageComponent } from "../_app";
import styles from "./admin.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const countries = useAdminCountries();
  const deleteCountry = useDeleteCountry();

  if (countries.isLoading) {
    return <CenteredLoading />;
  }

  if (countries.isError) {
    return <FailedToFetch />;
  }

  return (
    <GridContainer className={styles.grid}>
      <GridHeader>
        <GridHeaderSort column="id" type="number">
          ID
        </GridHeaderSort>
      </GridHeader>
      <GridHeader>
        <GridHeaderSort column="name" type="string">
          Name
        </GridHeaderSort>
      </GridHeader>
      <GridHeader>
        <GridHeaderActions />
      </GridHeader>
      {!!countries.data &&
        countries.data.map((country) => (
          <Fragment key={country.id}>
            <GridContent>{country.id}</GridContent>
            <GridContent>{country.name}</GridContent>
            <GridActions
              resource="/countries"
              id={country.id}
              mutation={() =>
                confirm("Are you sure?") && deleteCountry.mutate(country.id)
              }
            />
          </Fragment>
        ))}
    </GridContainer>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Admin countries">{page}</AdminLayout>
);

export default Page;
