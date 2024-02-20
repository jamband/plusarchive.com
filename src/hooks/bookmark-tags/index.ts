import { mutation } from "@/contexts/server-state";
import type {
  BookmarkTagAdmin,
  BookmarkTagCollection,
} from "@/types/bookmark-tags";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import { useNotificationAction } from "../notification";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const useBookmarkTagsAdmin = () => {
  const { query } = useRouter();

  return useQuery<BookmarkTagCollection>({
    queryKey: [
      "/bookmark-tags/admin",
      {
        name: `${query.name || ""}`,
        sort: `${query.sort || ""}`,
        page: `${query.page || "1"}`,
      },
    ],
  });
};

export const useBookmarkTag = () => {
  const { query } = useRouter();
  const id = `${query.id || ""}`;

  return useQuery<BookmarkTagAdmin>({
    queryKey: ["/bookmark-tags", id],
    enabled: id !== "",
  });
};

export const useCreateBookmarkTag = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<BookmarkTagAdmin, Variables<T>>(
    async (variables) =>
      await mutation("/bookmark-tags", {
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["/bookmark-tags", `${data.id}`], data);

        await queryClient.invalidateQueries({
          queryKey: ["/bookmark-tags/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/bookmarks/tags"],
        });

        await push(`/bookmark-tags/${data.id}`);
        setNotification("The bookmark tag has been created.");
      },
    },
  );
};

export const useUpdateBookmarkTag = <T extends FieldValues>() => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<BookmarkTagAdmin, Variables<T>>(
    async (variables) =>
      await mutation(`/bookmark-tags/${variables.id}`, {
        method: "PUT",
        body: variables.body,
      }),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["/bookmark-tags", `${data.id}`],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/bookmark-tags/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/bookmarks/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/bookmarks/tags"],
        });

        await push(`/bookmark-tags/${data.id}`);
        setNotification("The bookmark tag has been updated.");
      },
    },
  );
};

export const useDeleteBookmarkTag = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setNotification } = useNotificationAction();

  return useMutation<unknown, BookmarkTagAdmin["id"]>(
    async (id) =>
      await mutation(`/bookmark-tags/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: async (_, id) => {
        queryClient.removeQueries({
          queryKey: ["/bookmark-tags", `${id}`],
        });

        await queryClient.invalidateQueries({
          queryKey: ["/bookmark-tags/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/bookmarks/admin"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["/bookmarks/tags"],
        });

        await push("/bookmark-tags/admin");
        setNotification("The bookmark tag has been deleted.");
      },
    },
  );
};
