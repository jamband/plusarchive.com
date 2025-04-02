import { CenteredLoading } from "@/components/centered-loading";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { usePutForm } from "@/hooks/form";
import { useLabelTag, useUpdateLabelTag } from "@/hooks/label-tags";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import type { Schema } from "@/rules/track-genre/update";
import { label, schema } from "@/rules/track-genre/update";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import styles from "../form.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const tag = useLabelTag();
  const updateTag = useUpdateLabelTag<Schema>();

  const form = usePutForm({
    schema,
    focus: "name",
    data: tag.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: tag.data?.id };

    updateTag.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (tag.isLoading) {
    return <CenteredLoading />;
  }

  if (tag.isError) {
    return <FailedToFetch />;
  }

  return (
    <div className={styles.container}>
      <h1>Update label tags</h1>
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
        <FormSubmit disabled={form.disabled || updateTag.isPending}>
          Update
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update label tags">{page}</AdminLayout>
);

export default Page;
