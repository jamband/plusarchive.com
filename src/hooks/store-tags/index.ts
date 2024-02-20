import { mutation } from "@/contexts/server-state";
import type { StoreTagAdmin, StoreTagCollection } from "@/types/store-tags";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { useNotificationAction } from "../notification";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const useStoreTagsAdmin = () => {
  const { query } = useRouter();

  return useQuery<StoreTagCollection>({
    queryKey: [
      "/store-tags/admin",
      {
        name: `${query.name || ""}`,
        sort: `${query.sort || ""}`,
        page: `${query.page || "1"}`,
      },
    ],
  });
};

export const useStoreTag = () => {
  const { query } = useRouter();
  const id = `${query.id || ""}`;

  return useQuery<StoreTagAdmin>({
    queryKey: ["/store-tags", id],
    enabled: id !== "",
  });
};

export const useCreateStoreTag = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<StoreTagAdmin, Variables<T>>(
    async (variables) =>
      await mutation("/store-tags", {
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["/store-tags", `${data.id}`], data);

        await queryClient.invalidateQueries({
          queryKey: ["/store-tags/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/stores/tags"],
        });

        await push(`/store-tags/${data.id}`);
        setNotification("The store tag has been created.");
      },
    },
  );
};

export const useUpdateStoreTag = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<StoreTagAdmin, Variables<T>>(
    async (variables) =>
      await mutation(`/store-tags/${variables.id}`, {
        method: "PUT",
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["/store-tags", `${data.id}`],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/store-tags/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/stores/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/stores/tags"],
        });

        await push(`/store-tags/${data.id}`);
        setNotification("The store tag has been updated.");
      },
    },
  );
};

export const useDeleteStoreTag = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, StoreTagAdmin["id"]>(
    async (id) =>
      await mutation(`/store-tags/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: async (_, id) => {
        queryClient.removeQueries({
          queryKey: ["/store-tags", `${id}`],
        });

        await queryClient.invalidateQueries({
          queryKey: ["/store-tags/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/stores/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/stores/tags"],
        });

        await push("/store-tags/admin");
        setNotification("The store tag has been deleted.");
      },
    },
  );
};
