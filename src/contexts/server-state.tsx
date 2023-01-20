import type { Options } from "@/utils/api";
import { http } from "@/utils/api";
import type { QueryKey } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const queryFn = async ({
  queryKey: [url, params],
}: {
  queryKey: QueryKey;
}) => {
  if (typeof params === "string") {
    url += `/${params}`;
  } else if (typeof params === "object") {
    url += `?${new URLSearchParams(params as Record<string, string>)}`;
  }

  const response = await http(url as string);

  if (!response.ok) {
    throw response.json();
  }

  return response.json();
};

export const ServerStateProvider: React.FC<Props> = (props) => {
  const [client] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          staleTime: Infinity,
          queryFn,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={client}>
      {props.children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export const mutation = async (
  resource: string,
  options?: {
    method?: Options["method"];
    body?: Options["body"];
  }
) => {
  const response = await http(resource, {
    method: options?.method || "POST",
    body: options?.body || null,
  });

  if (!response.ok) {
    throw response;
  }

  if (response.status === 204) {
    return response;
  }

  return response.json();
};
