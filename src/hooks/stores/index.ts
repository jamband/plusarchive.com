import { mutation } from "@/contexts/server-state";
import type { StoreAdmin, StoreAdminCollection } from "@/types/stores";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { useNotificationAction } from "../notification";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const useStoresCountries = () => {
  return useQuery<Array<string>>(["/stores/countries"]);
};

export const useStoresTags = () => {
  return useQuery<Array<string>>(["/stores/tags"]);
};

export const useStoresAdmin = () => {
  const { query } = useRouter();

  return useQuery<StoreAdminCollection>([
    "/stores/admin",
    {
      name: `${query.name || ""}`,
      country: `${query.country || ""}`,
      tag: `${query.tag || ""}`,
      sort: `${query.sort || ""}`,
      page: `${query.page || "1"}`,
    },
  ]);
};

export const useStore = () => {
  const { query } = useRouter();
  const id = `${query.id || ""}`;

  return useQuery<StoreAdmin>(["/stores", id], {
    enabled: id !== "",
  });
};

export const useCreateStore = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<StoreAdmin, Variables<T>>(
    async (variables) =>
      await mutation("/stores", {
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["/stores", `${data.id}`], data);

        await queryClient.invalidateQueries({
          queryKey: ["/stores/admin"],
        });

        await push(`/stores/${data.id}`);
        setNotification("New store has been created.");
      },
    },
  );
};

export const useUpdateStore = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<StoreAdmin, Variables<T>>(
    async (variables) =>
      await mutation(`/stores/${variables.id}`, {
        method: "PUT",
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["/stores", `${data.id}`],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/stores/admin"],
        });

        await push(`/stores/${data.id}`);
        setNotification("The store has been updated.");
      },
    },
  );
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, StoreAdmin["id"]>(
    async (id) =>
      await mutation(`/stores/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: async (_, id) => {
        queryClient.removeQueries({
          queryKey: ["/stores", `${id}`],
        });

        await queryClient.invalidateQueries({
          queryKey: ["/stores/admin"],
        });

        await push("/stores/admin");
        setNotification("The store has been deleted.");
      },
    },
  );
};
