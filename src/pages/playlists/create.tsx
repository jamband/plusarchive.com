import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { usePostForm } from "@/hooks/form";
import { useCreatePlaylist } from "@/hooks/playlists";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import type { Schema } from "@/rules/playlist/create";
import { label, schema } from "@/rules/playlist/create";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import type { PageComponent } from "../_app";
import styles from "./form.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const createPlaylist = useCreatePlaylist<Schema>();

  const form = usePostForm<Schema>({
    schema,
    focus: "url",
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body };

    createPlaylist.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1>Create a playlist</h1>
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
        <FormSubmit disabled={form.disabled || createPlaylist.isPending}>
          Create
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Create a playlist">{page}</AdminLayout>
);

export default Page;
