import { ActionButton } from "@/components/action-button";
import { CenteredLoading } from "@/components/centered-loading";
import { DetailColumn } from "@/components/detail/column";
import { DetailContainer } from "@/components/detail/container";
import { DetailContent } from "@/components/detail/content";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { useRequireAdmin } from "@/hooks/require";
import { useDeleteTrackGenre, useTrackGenre } from "@/hooks/track-genres";
import { IconTrash } from "@/icons/trash";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import styles from "./index.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const genre = useTrackGenre();
  const deleteGenre = useDeleteTrackGenre();

  if (genre.isLoading) {
    return <CenteredLoading />;
  }

  if (genre.isError) {
    return <FailedToFetch />;
  }

  if (!genre.data) {
    return null;
  }

  return (
    <div className={styles.container}>
      <DetailContainer className={styles.detail}>
        <DetailColumn>ID</DetailColumn>
        <DetailColumn>Name</DetailColumn>
        <DetailContent>{genre.data.id}</DetailContent>
        <DetailContent>{genre.data.name}</DetailContent>
      </DetailContainer>
      <div className={styles.action}>
        <ActionButton
          className={styles.actionButton}
          onClick={() =>
            confirm("Are you sure?") &&
            !!genre.data &&
            deleteGenre.mutate(genre.data.id)
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
  <AdminLayout title="View track genres">{page}</AdminLayout>
);

export default Page;
