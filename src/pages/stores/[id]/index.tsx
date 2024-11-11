import { ActionButton } from "@/components/action-button";
import { BrandIconLinks } from "@/components/brand-icon-links";
import { CenteredLoading } from "@/components/centered-loading";
import { DetailColumn } from "@/components/detail/column";
import { DetailContainer } from "@/components/detail/container";
import { DetailContent } from "@/components/detail/content";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { useRequireAdmin } from "@/hooks/require";
import { useDeleteStore, useStore } from "@/hooks/stores";
import { IconTrash } from "@/icons/trash";
import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import styles from "@/pages/labels/[id]/index.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const store = useStore();
  const deleteStore = useDeleteStore();

  if (store.isLoading) {
    return <CenteredLoading />;
  }

  if (store.isError) {
    return <FailedToFetch />;
  }

  if (!store.data) {
    return null;
  }

  return (
    <div className={styles.container}>
      <DetailContainer className={styles.detail}>
        <DetailColumn>Name</DetailColumn>
        <DetailColumn>Country</DetailColumn>
        <DetailColumn>Links</DetailColumn>
        <DetailColumn>Tags</DetailColumn>
        <DetailColumn>Created at</DetailColumn>
        <DetailColumn>Updated at</DetailColumn>
        <DetailContent>
          <a
            href={store.data.url}
            className={styles.contentLink}
            target="_blank"
            rel="noreferrer"
          >
            {store.data.name}
            <IconUpRightFromSquare className={styles.contentLinkIcon} />
          </a>
        </DetailContent>
        <DetailContent>{store.data.country}</DetailContent>
        <DetailContent>
          <BrandIconLinks links={store.data.links} />
        </DetailContent>
        <DetailContent>{store.data.tags.join(", ")}</DetailContent>
        <DetailContent>{store.data.created_at}</DetailContent>
        <DetailContent>{store.data.updated_at}</DetailContent>
      </DetailContainer>
      <div className={styles.action}>
        <ActionButton
          className={styles.actionButton}
          onClick={() =>
            confirm("Are you sure?") &&
            !!store.data &&
            deleteStore.mutate(store.data.id)
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
  <AdminLayout title="View stores">{page}</AdminLayout>
);

export default Page;
