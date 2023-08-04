import { mutation } from "@/contexts/server-state";
import type { CountryAdmin } from "@/types/countries";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { useNotificationAction } from "../notification";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const useAdminCountries = () => {
  const { query } = useRouter();

  return useQuery<Array<CountryAdmin>>([
    "/countries/admin",
    {
      sort: `${query.sort || ""}`,
      page: `${query.page || "1"}`,
    },
  ]);
};

export const useCountry = () => {
  const { query } = useRouter();
  const id = `${query.id || ""}`;

  return useQuery<CountryAdmin>(["/countries", id], {
    enabled: id !== "",
  });
};

export const useCreateCountry = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<CountryAdmin, Variables<T>>(
    async (variables) =>
      await mutation("/countries", {
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["/countries", `${data.id}`], data);
        await queryClient.invalidateQueries(["/countries/admin"]);
        await queryClient.invalidateQueries(["/bookmarks/countries"]);
        await push(`/countries/${data.id}`);
        setNotification("New country has been created.");
      },
    },
  );
};

export const useUpdateCountry = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<CountryAdmin, Variables<T>>(
    async (variables) =>
      await mutation(`/countries/${variables.id}`, {
        method: "PUT",
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["/countries", `${data.id}`]);
        await queryClient.invalidateQueries(["/countries/admin"]);
        await queryClient.invalidateQueries(["/bookmarks/admin"]);
        await queryClient.invalidateQueries(["/bookmarks/countries"]);
        await push(`/countries/${data.id}`);
        setNotification("The country has been updated.");
      },
    },
  );
};

export const useDeleteCountry = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, CountryAdmin["id"]>(
    async (id) =>
      await mutation(`/countries/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: async (_, id) => {
        queryClient.removeQueries(["/countries", `${id}`]);
        await queryClient.invalidateQueries(["/countries/admin"]);
        await queryClient.invalidateQueries(["/bookmarks/admin"]);
        await queryClient.invalidateQueries(["/bookmarks/countries"]);
        await push("/countries/admin");
        setNotification("The country has been deleted.");
      },
    },
  );
};
