import { mutation } from "@/contexts/server-state";
import type {
  TrackGenreAdmin,
  TrackGenreCollection,
} from "@/types/track-genres";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { useNotificationAction } from "../notification";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const useAdminTrackGenres = () => {
  const { query } = useRouter();

  return useQuery<TrackGenreCollection>([
    "/track-genres/admin",
    {
      name: `${query.name || ""}`,
      sort: `${query.sort || ""}`,
      page: `${query.page || "1"}`,
    },
  ]);
};

export const useTrackGenre = () => {
  const { query } = useRouter();
  const id = `${query.id || ""}`;

  return useQuery<TrackGenreAdmin>(["/track-genres", id], {
    enabled: id !== "",
  });
};

export const useCreateTrackGenre = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<TrackGenreAdmin, Variables<T>>(
    async (variables) =>
      await mutation("/track-genres", {
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["/track-genres", `${data.id}`], data);

        await queryClient.invalidateQueries({
          queryKey: ["/track-genres/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/tracks/genres"],
        });

        await push(`/track-genres/${data.id}`);
        setNotification("New track genre has been created.");
      },
    },
  );
};

export const useUpdateTrackGenre = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<TrackGenreAdmin, Variables<T>>(
    async (variables) =>
      await mutation(`/track-genres/${variables.id}`, {
        method: "PUT",
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["/track-genres", `${data.id}`],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/track-genres/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/tracks/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/tracks/genres"],
        });

        await push(`/track-genres/${data.id}`);
        setNotification("The track genre has been updated.");
      },
    },
  );
};

export const useDeleteTrackGenre = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, TrackGenreAdmin["id"]>(
    async (id) =>
      await mutation(`/track-genres/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: async (_, id) => {
        queryClient.removeQueries({
          queryKey: ["/track-genres", `${id}`],
        });

        await queryClient.invalidateQueries({
          queryKey: ["/track-genres/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/tracks/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/tracks/genres"],
        });

        await push("/track-genres/admin");
        setNotification("The track genre has been deleted.");
      },
    },
  );
};
