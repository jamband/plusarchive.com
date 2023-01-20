import { API_USER_KEY } from "@/constants/api";
import { mutation } from "@/contexts/server-state";
import type { Auth } from "@/types/auth";
import { useRouter } from "next/router";
import type { FieldValues } from "react-hook-form";
import type { Variables } from "../server-state";
import { useMutation, useQuery } from "../server-state";

export const useAuth = () => {
  return useQuery<Auth>([API_USER_KEY]);
};

export const useLogin = <T extends FieldValues>() => {
  const { push } = useRouter();

  return useMutation<unknown, Variables<T>>(
    async (variables) =>
      await mutation("/auth/login", {
        body: variables.body,
      }),
    {
      onSuccess: async () => {
        await push("/admin");
      },
    }
  );
};

export const useLogout = () => {
  const { push } = useRouter();

  return useMutation<unknown, void>(
    async () => await mutation("/auth/logout"),
    {
      onSuccess: async () => {
        await push("/");
      },
    }
  );
};
