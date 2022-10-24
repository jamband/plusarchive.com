import { useRouter } from "next/router";

export const useUrlQuery = () => {
  const { query } = useRouter();

  const appendUrlQuery = (key: string, value: string) => {
    const q = { ...query };
    delete q.page;
    return { ...q, [key]: value };
  };

  const resetUrlQuery = (key: string) => {
    const q = { ...query };
    delete q.page;
    delete q.q;
    delete q[key];
    return q;
  };

  return {
    appendUrlQuery,
    resetUrlQuery,
  } as const;
};
