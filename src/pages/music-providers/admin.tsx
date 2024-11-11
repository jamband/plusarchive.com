import { CenteredLoading } from "@/components/centered-loading";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { GridActions } from "@/components/grid/actions";
import { GridContainer } from "@/components/grid/container";
import { GridContent } from "@/components/grid/content";
import { GridHeader } from "@/components/grid/header";
import { GridHeaderActions } from "@/components/grid/header-actions";
import { GridHeaderSort } from "@/components/grid/header-sort";
import {
  useAdminMusicProviders,
  useDeleteMusicProvider,
} from "@/hooks/music-providers";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import { Fragment } from "react";
import type { PageComponent } from "../_app";
import styles from "./admin.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const providers = useAdminMusicProviders();
  const deleteProvider = useDeleteMusicProvider();

  if (providers.isLoading) {
    return <CenteredLoading />;
  }

  if (providers.isError) {
    return <FailedToFetch />;
  }

  return (
    <>
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
        {!!providers.data &&
          providers.data.map((provider) => (
            <Fragment key={provider.id}>
              <GridContent>{provider.id}</GridContent>
              <GridContent>{provider.name}</GridContent>
              <GridActions
                resource="/music-providers"
                id={provider.id}
                mutation={() =>
                  confirm("Are you sure?") && deleteProvider.mutate(provider.id)
                }
              />
            </Fragment>
          ))}
      </GridContainer>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Admin music providers">{page}</AdminLayout>
);

export default Page;
