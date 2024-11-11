import { ActionButton } from "@/components/action-button";
import { CenteredLoading } from "@/components/centered-loading";
import { DetailColumn } from "@/components/detail/column";
import { DetailContainer } from "@/components/detail/container";
import { DetailContent } from "@/components/detail/content";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { useDeleteLabelTag, useLabelTag } from "@/hooks/label-tags";
import { useRequireAdmin } from "@/hooks/require";
import { IconTrash } from "@/icons/trash";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import styles from "./index.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const tag = useLabelTag();
  const deleteTag = useDeleteLabelTag();

  if (tag.isLoading) {
    return <CenteredLoading />;
  }

  if (tag.isError) {
    return <FailedToFetch />;
  }

  if (!tag.data) {
    return null;
  }

  return (
    <div className={styles.container}>
      <DetailContainer className={styles.detail}>
        <DetailColumn>ID</DetailColumn>
        <DetailColumn>Name</DetailColumn>
        <DetailContent>{tag.data.id}</DetailContent>
        <DetailContent>{tag.data.name}</DetailContent>
      </DetailContainer>
      <div className={styles.action}>
        <ActionButton
          className={styles.actionButton}
          onClick={() =>
            confirm("Are you sure?") &&
            !!tag.data &&
            deleteTag.mutate(tag.data.id)
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
  <AdminLayout title="View label tags">{page}</AdminLayout>
);

export default Page;
