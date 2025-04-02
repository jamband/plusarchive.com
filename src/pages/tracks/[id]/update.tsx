import { CenteredLoading } from "@/components/centered-loading";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { FormCheck } from "@/components/form/check";
import { FormChecks } from "@/components/form/checks";
import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { Loading } from "@/components/loading";
import { usePutForm } from "@/hooks/form";
import { useRequireAdmin } from "@/hooks/require";
import { useTrack, useTracksGenres, useUpdateTrack } from "@/hooks/tracks";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import type { Schema } from "@/rules/track/update";
import { label, schema } from "@/rules/track/update";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import styles from "../form.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const track = useTrack();
  const genres = useTracksGenres();
  const updateTrack = useUpdateTrack<Schema>();

  const form = usePutForm({
    schema,
    focus: "url",
    data: track.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: track.data?.id };

    updateTrack.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (track.isLoading) {
    return <CenteredLoading />;
  }

  if (track.isError) {
    return <FailedToFetch />;
  }

  return (
    <div className={styles.container}>
      <h1>Update tracks</h1>
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
        <FormSubmit disabled={form.disabled || updateTrack.isPending}>
          Update
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update tracks">{page}</AdminLayout>
);

export default Page;
