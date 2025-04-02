import { FailedToFetch } from "@/components/failed-to-fetch";
import { FormCheck } from "@/components/form/check";
import { FormChecks } from "@/components/form/checks";
import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { Loading } from "@/components/loading";
import { usePostForm } from "@/hooks/form";
import { useRequireAdmin } from "@/hooks/require";
import { useCreateTrack, useTracksGenres } from "@/hooks/tracks";
import { AdminLayout } from "@/layouts/admin/layout";
import type { Schema } from "@/rules/track/create";
import { label, schema } from "@/rules/track/create";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import type { PageComponent } from "../_app";
import styles from "./form.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const genres = useTracksGenres();
  const createTrack = useCreateTrack<Schema>();

  const form = usePostForm({
    schema,
    focus: "url",
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body };

    createTrack.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1>Create a track</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormInformation />
        <FormInput
          className={styles.fieldset}
          label={label.url}
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
        <FormInput
          label={label.image}
          className={styles.fieldset}
          type="text"
          inputClass={styles.textbox}
          register={form.register("image")}
          feedback={form.errors.image?.message}
          placeholder="https://example.com"
        />
        <FormChecks
          label={label.genres}
          className={styles.listboxFieldset}
          inputClass={styles.listbox}
          feedback={form.errors.genres?.message}
        >
          {genres.isLoading && <Loading />}
          {genres.isError && <FailedToFetch />}
          {!!genres.data &&
            genres.data.map((genre) => (
              <FormCheck
                key={genre}
                value={genre}
                register={form.register("genres")}
              />
            ))}
        </FormChecks>
        <FormSubmit disabled={form.disabled || createTrack.isPending}>
          Create
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Create a track">{page}</AdminLayout>
);

export default Page;
