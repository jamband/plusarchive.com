import Link from "next/link";
import { CenteredLoading } from "~/components/centered-loading";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { TrackCard } from "~/components/track-card";
import { useRequireAdmin } from "~/hooks/require";
import { useTracksFavorites, useTrackStopAllUrges } from "~/hooks/tracks";
import { IconCircleInfo } from "~/icons/circle-info";
import { IconPencil } from "~/icons/pencil";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const tracks = useTracksFavorites();
  const stopAllUrges = useTrackStopAllUrges();

  return (
    <>
      <h2 className="mb-2 text-4xl">
        Recent{" "}
        <small className="text-base text-gray-400">favorite tracks</small>
      </h2>
      {tracks.isLoading && <CenteredLoading />}
      {tracks.isError && <FailedToFetch />}
      {!!tracks.data && tracks.data.length === 0 && (
        <div className="text-amber-500">
          <IconCircleInfo className="mr-1 h-4 w-4 align-[-0.125em]" />
          Not exists.{" "}
          <Link href="/tracks/admin" className="text-amber-500 underline">
            Digging?
          </Link>
        </div>
      )}
      {!!tracks.data && tracks.data.length !== 0 && (
        <>
          <div className="mb-8 md:grid md:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {tracks.data.map((track) => (
              <TrackCard key={track.id} track={track}>
                <Link
                  href={`/tracks/${track.id}/update`}
                  className="hover:text-gray-100"
                >
                  <IconPencil className="mr-1 h-4 w-4 align-[-0.175em] md:h-4 md:w-4 md:align-[-0.175em]" />
                  Update
                </Link>
              </TrackCard>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="rounded bg-rose-500 px-4 py-1 text-gray-100 shadow-sm shadow-gray-900"
              onClick={() => {
                confirm("Are you sure?") && stopAllUrges.mutate();
              }}
            >
              Stop All Urges
            </button>
          </div>
        </>
      )}
    </>
  );
};

Page.getLayout = (page) => <AdminLayout title="Admin">{page}</AdminLayout>;

export default Page;
