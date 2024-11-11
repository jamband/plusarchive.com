import { ActionButton } from "@/components/action-button";
import { CenteredLoading } from "@/components/centered-loading";
import { DetailColumn } from "@/components/detail/column";
import { DetailContainer } from "@/components/detail/container";
import { DetailContent } from "@/components/detail/content";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { useCountry, useDeleteCountry } from "@/hooks/countries";
import { IconTrash } from "@/icons/trash";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import styles from "./index.module.css";

const Page: PageComponent = () => {
  const country = useCountry();
  const deleteCountry = useDeleteCountry();

  if (country.isLoading) {
    return <CenteredLoading />;
  }

  if (country.isError) {
    return <FailedToFetch />;
  }

  if (!country.data) {
    return null;
  }

  return (
    <div className={styles.container}>
      <DetailContainer className={styles.detail}>
        <DetailColumn>ID</DetailColumn>
        <DetailColumn>Name</DetailColumn>
        <DetailContent>{country.data.id}</DetailContent>
        <DetailContent>{country.data.name}</DetailContent>
      </DetailContainer>
      <div className={styles.action}>
        <ActionButton
          className={styles.actionButton}
          onClick={() =>
            confirm("Are you sure?") &&
            !!country.data &&
            deleteCountry.mutate(country.data.id)
          }
        >
          <IconTrash className={styles.actionButtonIcon} />
          Delete
        </ActionButton>
      </div>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="View countries">{page}</AdminLayout>
);

export default Page;
