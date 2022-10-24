import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useTextFilter = (name: string) => {
  const { push, query } = useRouter();
  const initialValue = `${query[name] || ""}`;
  const [value, setValue] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      push({
        query: {
          [name]: event.currentTarget.value,
        },
      });
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [setValue, initialValue]);

  return {
    value,
    onChange,
    onKeyDown,
  } as const;
};

export const useSelectFilter = (name: string) => {
  const { push, query } = useRouter();
  const initialValue = `${query[name] || ""}`;
  const [value, setValue] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);

    push({
      query: {
        [name]: event.target.value,
      },
    });
  };

  useEffect(() => {
    setValue(initialValue);
  }, [setValue, initialValue]);

  return {
    value,
    onChange,
  } as const;
};
