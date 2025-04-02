import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { useForm } from "react-hook-form";
import type * as v from "valibot";

export const usePostForm = <T extends FieldValues>(form: {
  schema: v.GenericSchema<T>;
  focus: Path<T>;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
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

export const usePutForm = <T extends FieldValues>(form: {
  schema: v.GenericSchema<T>;
  focus: Path<T>;
  data: T | undefined;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
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
