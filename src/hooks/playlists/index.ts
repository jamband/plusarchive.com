import { mutation } from "@/contexts/server-state";
import type {
  Playlist,
  PlaylistAdmin,
  PlaylistAdminCollection,
} from "@/types/playlists";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { useNotificationAction } from "../notification";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const usePlaylistsAdmin = () => {
  const { query } = useRouter();

  return useQuery<PlaylistAdminCollection>({
    queryKey: [
      "/playlists/admin",
      {
        title: `${query.title || ""}`,
        provider: `${query.provider || ""}`,
        sort: `${query.sort || ""}`,
        page: `${query.page || "1"}`,
      },
    ],
  });
};

export const usePlaylist = () => {
  const { query } = useRouter();
  const id = `${query.id || ""}`;

  return useQuery<Playlist>({
    queryKey: ["/playlists", id],
    enabled: id !== "",
  });
};

export const useCreatePlaylist = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<PlaylistAdmin, Variables<T>>(
    async (variables) =>
      await mutation("/playlists", {
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["/playlists", data.id], data);

        await queryClient.invalidateQueries({
          queryKey: ["/playlists/admin"],
        });

        await push("/playlists/admin");
        setNotification("New playlist has been created.");
      },
    },
  );
};

export const useUpdatePlaylist = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<PlaylistAdmin, Variables<T>>(
    async (variables) =>
      await mutation(`/playlists/${variables.id}`, {
        method: "PUT",
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["/playlists", data.id],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/playlists/admin"],
        });

        await push("/playlists/admin");
        setNotification("The playlist has been updated.");
      },
    },
  );
};

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, PlaylistAdmin["id"]>(
    async (id) =>
      await mutation(`/playlists/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: async (_, id) => {
        queryClient.removeQueries({
          queryKey: ["/playlists", id],
        });

        await queryClient.invalidateQueries({
          queryKey: ["/playlists/admin"],
        });

        await push("/playlists/admin");
        setNotification("The playlist has been deleted.");
      },
    },
  );
};
