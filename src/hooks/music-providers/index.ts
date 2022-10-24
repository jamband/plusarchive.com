import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { mutation } from "~/contexts/server-state";
import type { CountryAdmin } from "~/types/countries";
import type { MusicProviderAdmin } from "~/types/music-providers";
import { useNotificationAction } from "../notification";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const useAdminMusicProviders = () => {
  const { query } = useRouter();

  return useQuery<Array<MusicProviderAdmin>>([
    "/music-providers/admin",
    {
      sort: `${query.sort || ""}`,
    },
  ]);
};

export const useMusicProvider = () => {
  const { query } = useRouter();
  const id = `${query.id || ""}`;

  return useQuery<MusicProviderAdmin>([`/music-providers`, id], {
    enabled: id !== "",
  });
};

export const useCreateMusicProvider = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<MusicProviderAdmin, Variables<T>>(
    async (variables) =>
      await mutation("/music-providers", {
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["/music-providers", `${data.id}`], data);
        await queryClient.invalidateQueries(["/music-providers/admin"]);
        await queryClient.invalidateQueries(["/tracks/providers"]);
        await push(`/music-providers/${data.id}`);
        setNotification("New music provider has been created.");
      },
    }
  );
};

export const useUpdateMusicProvider = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<MusicProviderAdmin, Variables<T>>(
    async (variables) =>
      await mutation(`/music-providers/${variables.id}`, {
        method: "PUT",
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["/music-providers", `${data.id}`]);
        await queryClient.invalidateQueries(["/music-providers/admin"]);
        await queryClient.invalidateQueries(["/tracks/admin"]);
        await queryClient.invalidateQueries(["/tracks/providers"]);
        await push(`/music-providers/${data.id}`);
        setNotification("The music provider has been updated.");
      },
    }
  );
};

export const useDeleteMusicProvider = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, CountryAdmin["id"]>(
    async (id) =>
      await mutation(`/music-providers/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: async (_, id) => {
        queryClient.removeQueries(["/music-providers", `${id}`]);
        await queryClient.invalidateQueries(["/music-providers/admin"]);
        await queryClient.invalidateQueries(["/tracks/admin"]);
        await queryClient.invalidateQueries(["/tracks/providers"]);
        await push("/music-providers/admin");
        setNotification("The music provider has been deleted.");
      },
    }
  );
};
