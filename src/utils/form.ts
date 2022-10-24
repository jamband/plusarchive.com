import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export const setErrors = async <T extends FieldValues>(
  response: Response,
  setError: UseFormSetError<T>
) => {
  const { errors }: Record<string, string> = await response.json();

  for (const [name, message] of Object.entries(errors)) {
    setError(name as Path<T>, { type: "server", message });
  }
};
