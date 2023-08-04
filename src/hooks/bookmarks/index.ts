import { mutation } from "@/contexts/server-state";
import type { BookmarkAdmin, BookmarkAdminCollection } from "@/types/bookmarks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { useNotificationAction } from "../notification";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const useBookmarksCountries = () => {
  return useQuery<Array<string>>(["/bookmarks/countries"]);
};

export const useBookmarksTags = () => {
  return useQuery<Array<string>>(["/bookmarks/tags"]);
};

export const useBookmarksAdmin = () => {
  const { query } = useRouter();

  return useQuery<BookmarkAdminCollection>([
    "/bookmarks/admin",
    {
      name: `${query.name || ""}`,
      country: `${query.country || ""}`,
      tag: `${query.tag || ""}`,
      sort: `${query.sort || ""}`,
      page: `${query.page || "1"}`,
    },
  ]);
};

export const useBookmark = () => {
  const { query } = useRouter();
  const id = `${query.id || ""}`;

  return useQuery<BookmarkAdmin>(["/bookmarks", id], {
    enabled: id !== "",
  });
};

export const useCreateBookmark = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<BookmarkAdmin, Variables<T>>(
    async (variables) =>
      await mutation("/bookmarks", {
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["/bookmarks", `${data.id}`], data);
        await queryClient.invalidateQueries(["/bookmarks/admin"]);
        await push(`/bookmarks/${data.id}`);
        setNotification("New bookmark has been created.");
      },
    },
  );
};

export const useUpdateBookmark = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<BookmarkAdmin, Variables<T>>(
    async (variables) =>
      await mutation(`/bookmarks/${variables.id}`, {
        method: "PUT",
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["/bookmarks", `${data.id}`]);
        await queryClient.invalidateQueries(["/bookmarks/admin"]);
        await push(`/bookmarks/${data.id}`);
        setNotification("The bookmark has been updated.");
      },
    },
  );
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, BookmarkAdmin["id"]>(
    async (id) =>
      await mutation(`/bookmarks/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: async (_, id) => {
        queryClient.removeQueries(["/bookmarks", `${id}`]);
        await queryClient.invalidateQueries(["/bookmarks/admin"]);
        await push("/bookmarks/admin");
        setNotification("The bookmark has been deleted.");
      },
    },
  );
};
