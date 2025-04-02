import { FailedToFetch } from "@/components/failed-to-fetch";
import { FormCheck } from "@/components/form/check";
import { FormChecks } from "@/components/form/checks";
import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSelect } from "@/components/form/select";
import { FormSubmit } from "@/components/form/submit";
import { FormTextarea } from "@/components/form/textarea";
import { Loading } from "@/components/loading";
import { useCountries } from "@/hooks/countries";
import { usePostForm } from "@/hooks/form";
import { useRequireAdmin } from "@/hooks/require";
import { useCreateStore, useStoresTags } from "@/hooks/stores";
import { AdminLayout } from "@/layouts/admin/layout";
import type { Schema } from "@/rules/store/create";
import { label, schema } from "@/rules/store/create";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import type { PageComponent } from "../_app";
import styles from "../labels/form.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const countries = useCountries();
  const tags = useStoresTags();
  const createStore = useCreateStore<Schema>();

  const form = usePostForm({
    schema,
    focus: "name",
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body };

    createStore.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1>Create a store</h1>
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
          className={styles.fieldset}
          inputClass={styles.combobox}
          data={countries}
          register={form.register("country")}
          feedback={form.errors.country?.message}
          required
        >
          {!!countries.data &&
            countries.data.map((country) => (
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
          {tags.isLoading && <Loading />}
          {tags.isError && <FailedToFetch />}
          {!!tags.data &&
            tags.data.map((tag) => (
              <FormCheck
                key={tag}
                value={tag}
                register={form.register("tags")}
              />
            ))}
        </FormChecks>
        <FormSubmit disabled={form.disabled || createStore.isPending}>
          Create
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Create a store">{page}</AdminLayout>
);

export default Page;
