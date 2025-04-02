import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { usePostForm } from "@/hooks/form";
import { useCreateLabelTag } from "@/hooks/label-tags";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import type { Schema } from "@/rules/label-tag/create";
import { label, schema } from "@/rules/label-tag/create";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import type { PageComponent } from "../_app";
import styles from "./form.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const createTag = useCreateLabelTag<Schema>();

  const form = usePostForm({
    schema,
    focus: "name",
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body };

    createTag.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1>Create a label tag</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormInformation />
        <FormInput
          className={styles.fieldset}
          label={label.name}
          type="text"
          inputClass={styles.textbox}
          register={form.register("name")}
          feedback={form.errors.name?.message}
          placeholder="Name"
          required
        />
        <FormSubmit disabled={form.disabled || createTag.isPending}>
          Create
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Create a label tag">{page}</AdminLayout>
);

export default Page;
