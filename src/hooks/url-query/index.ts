import { useRouter } from "next/router";

export const useUrlQuery = () => {
  const { query } = useRouter();

  const appendUrlQuery = (key: string, value: string) => {
    const _query = { ...query };
    delete _query.q;
    delete _query.page;
    return { ..._query, [key]: value };
  };

  const resetUrlQuery = (key: string) => {
    const _query = { ...query };
    delete _query.q;
    delete _query.page;
    delete _query[key];
    return _query;
  };

  return {
    appendUrlQuery,
    resetUrlQuery,
  } as const;
};
