import { CenteredLoading } from "@/components/centered-loading";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { usePutForm } from "@/hooks/form";
import {
  useMusicProvider,
  useUpdateMusicProvider,
} from "@/hooks/music-providers";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import type { Schema } from "@/rules/music-provider/update";
import { label, schema } from "@/rules/music-provider/update";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import styles from "../form.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const provider = useMusicProvider();
  const updateProvider = useUpdateMusicProvider<Schema>();

  const form = usePutForm<Schema>({
    schema,
    focus: "name",
    data: provider.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: provider.data?.id };

    updateProvider.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (provider.isLoading) {
    return <CenteredLoading />;
  }

  if (provider.isError) {
    return <FailedToFetch />;
  }

  return (
    <div className={styles.container}>
      <h1>Update music providers</h1>
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
        <FormSubmit disabled={form.disabled || updateProvider.isPending}>
          Update
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update music providers">{page}</AdminLayout>
);

export default Page;
