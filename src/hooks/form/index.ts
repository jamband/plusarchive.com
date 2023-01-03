import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { AnyObjectSchema } from "yup";

type PostForm<T> = {
  schema: AnyObjectSchema;
  focus: Path<T>;
};

type PutForm<T> = {
  schema: AnyObjectSchema;
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
    resolver: yupResolver(form.schema),
    mode: "onChange",
    defaultValues: form.schema.cast({}),
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
    resolver: yupResolver(form.schema),
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
