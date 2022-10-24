import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Component } from "./component";
import type { Props } from "./types";

export const SearchForm: React.FC<Props> = (props) => {
  const { pathname, push, query } = useRouter();
  const search = `${query.q || ""}`;
  const [value, setValue] = useState(search);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    push({
      pathname: `/${pathname.split("/")[1]}/search`,
      query: { q: value },
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(search);
  }, [search]);

  return (
    <Component
      {...props}
      value={value}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
};
