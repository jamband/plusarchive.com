import { useRouter } from "next/router";
import { Component } from "./component";
import type { Props } from "./types";

export const GridHeaderSort: React.FC<Props> = (props) => {
  const { push, query } = useRouter();

  const column = `${query.sort || ""}`;
  const isAsc = !column.startsWith("-", 0);
  const current = column.replace("-", "") === props.column;

  const sort = async () => {
    delete query.page;

    await push({
      query: {
        ...query,
        sort: column === props.column ? `-${column}` : props.column,
      },
    });
  };

  return <Component {...props} isAsc={isAsc} sort={sort} current={current} />;
};
