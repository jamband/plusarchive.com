import { mutation } from "@/contexts/server-state";
import type { MusicProvider } from "@/types/music-providers";
import type { Track, TrackAdmin, TrackAdminCollection } from "@/types/tracks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { useNotificationAction } from "../notification";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const useTracksProviders = () => {
  return useQuery<Array<MusicProvider>>({
    queryKey: ["/tracks/providers"],
  });
};

export const useTracksGenres = () => {
  return useQuery<Array<string>>({
    queryKey: ["/tracks/genres"],
  });
};

export const useTracksFavorites = () => {
  return useQuery<Array<Track>>({
    queryKey: ["/tracks/favorites"],
  });
};

export const useTracksAdmin = () => {
  const { query } = useRouter();

  return useQuery<TrackAdminCollection>({
    queryKey: [
      "/tracks/admin",
      {
        provider: `${query.provider || ""}`,
        title: `${query.title || ""}`,
        urge: `${query.urge || ""}`,
        genre: `${query.genre || ""}`,
        sort: `${query.sort || ""}`,
        page: `${query.page || "1"}`,
      },
    ],
  });
};

export const useTrack = () => {
  const { query } = useRouter();
  const id = `${query.id || ""}`;

  return useQuery<Track>({
    queryKey: ["/tracks", id],
    enabled: id !== "",
  });
};

export const useStopUrges = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, void>(
    async () =>
      await mutation("/tracks/stop-urges", {
        method: "PATCH",
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["/tracks/favorites"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/tracks/admin"],
        });

        await push("/admin");
        setNotification("All urges of tracks has been stopped.");
      },
    },
  );
};

export const useToggleUrge = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, TrackAdmin["id"] | undefined>(
    async (id) =>
      await mutation(`/tracks/${id}/toggle-urge`, {
        method: "PATCH",
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["/tracks/favorites"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/tracks/admin"],
        });

        setNotification("The urge has been toggled.");
      },
    },
  );
};

export const useCreateTrack = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<TrackAdmin, Variables<T>>(
    async (variables) =>
      await mutation("/tracks", {
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["/tracks", data.id], data);

        await queryClient.invalidateQueries({
          queryKey: ["/tracks/admin"],
        });

        await push("/tracks/admin");
        setNotification("New track has been created.");
      },
    },
  );
};

export const useUpdateTrack = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<TrackAdmin, Variables<T>>(
    async (variables) =>
      await mutation(`/tracks/${variables.id}`, {
        method: "PUT",
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["/tracks", data.id],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/tracks/admin"],
        });

        await push("/tracks/admin");
        setNotification("The track has been updated.");
      },
    },
  );
};

export const useDeleteTrack = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, TrackAdmin["id"]>(
    async (id) =>
      await mutation(`/tracks/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: async (_, id) => {
        queryClient.removeQueries({
          queryKey: ["/tracks", id],
        });

        await queryClient.invalidateQueries({
          queryKey: ["/tracks/admin"],
        });

        await push("/tracks/admin");
        setNotification("The track has been deleted.");
      },
    },
  );
};
