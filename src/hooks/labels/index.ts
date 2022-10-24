import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { mutation } from "~/contexts/server-state";
import type { LabelAdmin, LabelAdminCollection } from "~/types/labels";
import { useNotificationAction } from "../notification";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const useLabelsCountries = () => {
  return useQuery<Array<string>>(["/labels/countries"]);
};

export const useLabelsTags = () => {
  return useQuery<Array<string>>(["/labels/tags"]);
};

export const useLabelsAdmin = () => {
  const { query } = useRouter();

  return useQuery<LabelAdminCollection>([
    "/labels/admin",
    {
      name: `${query.name || ""}`,
      country: `${query.country || ""}`,
      tag: `${query.tag || ""}`,
      sort: `${query.sort || ""}`,
      page: `${query.page || "1"}`,
    },
  ]);
};

export const useLabel = () => {
  const { query } = useRouter();
  const id = `${query.id || ""}`;

  return useQuery<LabelAdmin>(["/labels", id], {
    enabled: id !== "",
  });
};

export const useCreateLabel = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<LabelAdmin, Variables<T>>(
    async (variables) =>
      await mutation("/labels", {
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["/labels", `${data.id}`], data);
        await queryClient.invalidateQueries(["/labels/admin"]);
        await push(`/labels/${data.id}`);
        setNotification("New label has been created.");
      },
    }
  );
};

export const useUpdateLabel = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<LabelAdmin, Variables<T>>(
    async (variables) =>
      await mutation(`/labels/${variables.id}`, {
        method: "PUT",
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["/labels", `${data.id}`]);
        await queryClient.invalidateQueries(["/labels/admin"]);
        await push(`/labels/${data.id}`);
        setNotification("The label has been updated.");
      },
    }
  );
};

export const useDeleteLabel = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, LabelAdmin["id"]>(
    async (id) =>
      await mutation(`/labels/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: async (_, id) => {
        queryClient.removeQueries(["/labels", `${id}`]);
        await queryClient.invalidateQueries(["/labels/admin"]);
        await push("/labels/admin");
        setNotification("The label has been deleted.");
      },
    }
  );
};
