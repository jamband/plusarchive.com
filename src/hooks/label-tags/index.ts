import { mutation } from "@/contexts/server-state";
import type { LabelTagAdmin, LabelTagCollection } from "@/types/label-tags";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { useNotificationAction } from "../notification";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const useLabelTagsAdmin = () => {
  const { query } = useRouter();

  return useQuery<LabelTagCollection>([
    "/label-tags/admin",
    {
      name: `${query.name || ""}`,
      sort: `${query.sort || ""}`,
      page: `${query.page || "1"}`,
    },
  ]);
};

export const useLabelTag = () => {
  const { query } = useRouter();
  const id = `${query.id || ""}`;

  return useQuery<LabelTagAdmin>(["/label-tags", id], {
    enabled: id !== "",
  });
};

export const useCreateLabelTag = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<LabelTagAdmin, Variables<T>>(
    async (variables) =>
      await mutation("/label-tags", {
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["/label-tags", `${data.id}`], data);

        await queryClient.invalidateQueries({
          queryKey: ["/label-tags/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/labels/tags"],
        });

        await push(`/label-tags/${data.id}`);
        setNotification("The label tag has been created.");
      },
    },
  );
};

export const useUpdateLabelTag = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<LabelTagAdmin, Variables<T>>(
    async (variables) =>
      await mutation(`/label-tags/${variables.id}`, {
        method: "PUT",
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["/label-tags", `${data.id}`],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/label-tags/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/labels/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/labels/tags"],
        });

        await push(`/label-tags/${data.id}`);
        setNotification("The label tag has been updated.");
      },
    },
  );
};

export const useDeleteLabelTag = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, LabelTagAdmin["id"]>(
    async (id) =>
      await mutation(`/label-tags/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: async (_, id) => {
        queryClient.removeQueries({
          queryKey: ["/label-tags", `${id}`],
        });

        await queryClient.invalidateQueries({
          queryKey: ["/label-tags/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/labels/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/labels/tags"],
        });

        await push("/label-tags/admin");
        setNotification("The label tag has been deleted.");
      },
    },
  );
};
