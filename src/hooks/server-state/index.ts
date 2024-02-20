import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  useMutation as useBaseMutation,
  useQuery as useBaseQuery,
} from "@tanstack/react-query";
import type { FieldValues } from "react-hook-form";

export type Variables<T extends FieldValues> = {
  body: T;
  id?: number | string | undefined;
};

export const useQuery = <T>(options: UseQueryOptions<T>) => {
  const { isLoading, isError, data } = useBaseQuery<T>(options);

  return {
    isLoading,
    isError,
    data,
  } as const;
};

export const useMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseMutationOptions<TData, Response, TVariables>,
) => {
  const { isPending, error, mutate } = useBaseMutation({
    mutationFn,
    ...options,
  });

  return {
    isPending,
    error,
    mutate,
  } as const;
};
