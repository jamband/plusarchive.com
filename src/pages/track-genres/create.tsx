import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { usePostForm } from "@/hooks/form";
import { useRequireAdmin } from "@/hooks/require";
import { useCreateTrackGenre } from "@/hooks/track-genres";
import { AdminLayout } from "@/layouts/admin/layout";
import type { Schema } from "@/rules/track-genre/create";
import { label, schema } from "@/rules/track-genre/create";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import type { PageComponent } from "../_app";
import styles from "./form.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const createGenre = useCreateTrackGenre<Schema>();

  const form = usePostForm({
    schema,
    focus: "name",
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body };

    createGenre.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1>Create a track genre</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormInformation />
        <FormInput
          label={label.name}
          className={styles.fieldset}
          type="text"
          inputClass={styles.textbox}
          register={form.register("name")}
          feedback={form.errors.name?.message}
          placeholder="Name"
          required
        />
        <FormSubmit disabled={form.disabled || createGenre.isPending}>
          Create
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Create a track genre">{page}</AdminLayout>
);

export default Page;
