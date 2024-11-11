import { CenteredLoading } from "@/components/centered-loading";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { usePutForm } from "@/hooks/form";
import { useRequireAdmin } from "@/hooks/require";
import { useTrackGenre, useUpdateTrackGenre } from "@/hooks/track-genres";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import type { Schema } from "@/rules/track-genre/update";
import { label, schema } from "@/rules/track-genre/update";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import styles from "../form.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const genre = useTrackGenre();
  const updateGenre = useUpdateTrackGenre<Schema>();

  const form = usePutForm<Schema>({
    schema,
    focus: "name",
    data: genre.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: genre.data?.id };

    updateGenre.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (genre.isLoading) {
    return <CenteredLoading />;
  }

  if (genre.isError) {
    return <FailedToFetch />;
  }

  return (
    <div className={styles.container}>
      <h1>Update track genres</h1>
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
        <FormSubmit disabled={form.disabled || updateGenre.isPending}>
          Update
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update track genres">{page}</AdminLayout>
);

export default Page;
