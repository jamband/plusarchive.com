import { CenteredLoading } from "@/components/centered-loading";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { FormCheck } from "@/components/form/check";
import { FormChecks } from "@/components/form/checks";
import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSelect } from "@/components/form/select";
import { FormSubmit } from "@/components/form/submit";
import { FormTextarea } from "@/components/form/textarea";
import { Loading } from "@/components/loading";
import {
  useBookmark,
  useBookmarksTags,
  useUpdateBookmark,
} from "@/hooks/bookmarks";
import { useCountries } from "@/hooks/countries";
import { usePutForm } from "@/hooks/form";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import styles from "@/pages/labels/form.module.css";
import type { Schema } from "@/rules/bookmark/update";
import { label, schema } from "@/rules/bookmark/update";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";

const Page: PageComponent = () => {
  useRequireAdmin();

  const bookmark = useBookmark();
  const countries = useCountries();
  const tags = useBookmarksTags();
  const updateBookmark = useUpdateBookmark<Schema>();

  const form = usePutForm({
    schema,
    focus: "name",
    data: bookmark.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: bookmark.data?.id };

    updateBookmark.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (bookmark.isLoading) {
    return <CenteredLoading />;
  }

  if (bookmark.isError) {
    return <FailedToFetch />;
  }

  return (
    <div className={styles.container}>
      <h1>Update bookmarks</h1>
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
        <FormSelect
          label={label.country}
          data={countries}
          className={styles.fieldset}
          inputClass={styles.combobox}
          register={form.register("country")}
          feedback={form.errors.country?.message}
          required
        >
          {countries.data?.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </FormSelect>
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
        <FormTextarea
          label={label.links}
          className={styles.textareaFieldset}
          inputClass={styles.textarea}
          register={form.register("links")}
          feedback={form.errors.links?.message}
          placeholder={"https://twitter.com/foo\nhttps://bandcamp.com/bar"}
        />
        <FormChecks
          label={label.tags}
          className={styles.listboxFieldset}
          inputClass={styles.listbox}
          feedback={form.errors.tags?.message}
        >
          {tags.isError && <FailedToFetch />}
          {tags.isLoading && <Loading />}
          {!!tags.data &&
            tags.data.map((tag) => (
              <FormCheck
                key={tag}
                value={tag}
                register={form.register("tags")}
              />
            ))}
        </FormChecks>
        <FormSubmit disabled={form.disabled || updateBookmark.isPending}>
          Update
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update bookmarks">{page}</AdminLayout>
);

export default Page;
