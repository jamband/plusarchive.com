import type { QueryKey } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryFn } from "~/contexts/server-state";

type Props = {
  children: React.ReactNode;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      queryFn,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => undefined,
  },
});

export const wrapper: React.FC<Props> = (props) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

export const isInvalidated = (queryKey: QueryKey) =>
  queryClient.getQueryState(queryKey)?.isInvalidated;