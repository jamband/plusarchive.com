import { CenteredLoading } from "@/components/centered-loading";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { usePutForm } from "@/hooks/form";
import { usePlaylist, useUpdatePlaylist } from "@/hooks/playlists";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import type { Schema } from "@/rules/playlist/update";
import { label, schema } from "@/rules/playlist/update";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import styles from "../form.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const playlist = usePlaylist();
  const updatePlaylist = useUpdatePlaylist<Schema>();

  const form = usePutForm<Schema>({
    schema,
    focus: "url",
    data: playlist.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: playlist.data?.id };

    updatePlaylist.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (playlist.isLoading) {
    return <CenteredLoading />;
  }

  if (playlist.isError) {
    return <FailedToFetch />;
  }

  return (
    <div className={styles.container}>
      <h1>Update playlists</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormInformation />
        <FormInput
          label={label.url}
          className={styles.fieldset}
          type="text"
          inputClass={styles.textbox}
          register={form.register("url")}
          feedback={form.errors.url?.message}
          placeholder="https://example.com"
          required
        />
        <FormInput
          label={label.title}
          className={styles.fieldset}
          type="text"
          inputClass={styles.textbox}
          register={form.register("title")}
          feedback={form.errors.title?.message}
          placeholder="Title"
        />
        <FormSubmit disabled={form.disabled || updatePlaylist.isPending}>
          Update
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update playlists">{page}</AdminLayout>
);

export default Page;
