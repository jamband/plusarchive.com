import { CenteredLoading } from "@/components/centered-loading";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { TrackCard } from "@/components/track-card";
import { useRequireAdmin } from "@/hooks/require";
import { useStopUrges, useTracksFavorites } from "@/hooks/tracks";
import { IconCircleInfo } from "@/icons/circle-info";
import { IconPencil } from "@/icons/pencil";
import { AdminLayout } from "@/layouts/admin/layout";
import Link from "next/link";
import type { PageComponent } from "../_app";
import styles from "./index.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const tracks = useTracksFavorites();
  const stopUrges = useStopUrges();

  return (
    <div className={styles.container}>
      <h2>
        Recent{" "}
        <small className={styles.recentTitleSuffix}>favorite tracks</small>
      </h2>
      {tracks.isLoading && <CenteredLoading />}
      {tracks.isError && <FailedToFetch />}
      {!!tracks.data && tracks.data.length === 0 && (
        <div className={styles.information}>
          <IconCircleInfo className={styles.informationIcon} />
          Not exists.{" "}
          <Link href="/tracks/admin" className={styles.informationLink}>
            Digging?
          </Link>
        </div>
      )}
      {!!tracks.data && tracks.data.length !== 0 && (
        <>
          <div className={styles.main}>
            {tracks.data.map((track) => (
              <TrackCard key={track.id} track={track}>
                <Link
                  href={`/tracks/${track.id}/update`}
                  className={styles.mainCardLink}
                >
                  <IconPencil className={styles.mainCardLinkIcon} />
                  Update
                </Link>
              </TrackCard>
            ))}
          </div>
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.footerButton}
              onClick={() => confirm("Are you sure?") && stopUrges.mutate()}
            >
              Stop All Urges
            </button>
          </div>
        </>
      )}
    </div>
  );
};

Page.getLayout = (page) => <AdminLayout title="Admin">{page}</AdminLayout>;

export default Page;
