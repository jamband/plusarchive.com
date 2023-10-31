import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { ObjectEntries, ObjectSchema } from "valibot";

type PostForm<T> = {
  schema: ObjectSchema<ObjectEntries>;
  focus: Path<T>;
};

type PutForm<T> = {
  schema: ObjectSchema<ObjectEntries>;
  focus: Path<T>;
  data: T | undefined;
};

export const usePostForm = <T extends FieldValues>(form: PostForm<T>) => {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting, isValid },
  } = useForm<T>({
    resolver: valibotResolver(form.schema),
    mode: "onChange",
  });

  useEffect(() => {
    setFocus(form.focus);
  }, [setFocus, form.focus]);

  return {
    register,
    handleSubmit,
    setError,
    errors,
    disabled: !isValid || isSubmitting,
  } as const;
};

export const usePutForm = <T extends FieldValues>(form: PutForm<T>) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors, isSubmitting, isValid },
  } = useForm<T>({
    resolver: valibotResolver(form.schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (form.data) {
      reset(form.data);

      setTimeout(() => {
        setFocus(form.focus);
      }, 100);
    }
  }, [form.data, reset, setFocus, form.focus]);

  return {
    register,
    handleSubmit,
    setError,
    errors,
    disabled: !isValid || isSubmitting,
  } as const;
};
