import { ActionButton } from "@/components/action-button";
import { BrandIconLinks } from "@/components/brand-icon-links";
import { CenteredLoading } from "@/components/centered-loading";
import { DetailColumn } from "@/components/detail/column";
import { DetailContainer } from "@/components/detail/container";
import { DetailContent } from "@/components/detail/content";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { useBookmark, useDeleteBookmark } from "@/hooks/bookmarks";
import { useRequireAdmin } from "@/hooks/require";
import { IconTrash } from "@/icons/trash";
import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import styles from "@/pages/labels/[id]/index.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const bookmark = useBookmark();
  const deleteBookmark = useDeleteBookmark();

  if (bookmark.isLoading) {
    return <CenteredLoading />;
  }

  if (bookmark.isError) {
    return <FailedToFetch />;
  }

  if (!bookmark.data) {
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
            href={bookmark.data.url}
            className={styles.contentLink}
            target="_blank"
            rel="noreferrer"
          >
            {bookmark.data.name}
            <IconUpRightFromSquare className={styles.contentLinkIcon} />
          </a>
        </DetailContent>
        <DetailContent>{bookmark.data.country}</DetailContent>
        <DetailContent>
          <BrandIconLinks links={bookmark.data.links} />
        </DetailContent>
        <DetailContent>{bookmark.data.tags.join(", ")}</DetailContent>
        <DetailContent>{bookmark.data.created_at}</DetailContent>
        <DetailContent>{bookmark.data.updated_at}</DetailContent>
      </DetailContainer>
      <div className={styles.action}>
        <ActionButton
          className={styles.actionButton}
          onClick={() =>
            confirm("Are you sure?") &&
            !!bookmark.data &&
            deleteBookmark.mutate(bookmark.data.id)
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
  <AdminLayout title="View bookmarks">{page}</AdminLayout>
);

export default Page;
