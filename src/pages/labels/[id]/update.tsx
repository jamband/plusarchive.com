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
import { useCountries } from "@/hooks/countries";
import { usePutForm } from "@/hooks/form";
import { useLabel, useLabelsTags, useUpdateLabel } from "@/hooks/labels";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import type { Schema } from "@/rules/label/update";
import { label as formLabel, schema } from "@/rules/label/update";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import styles from "../form.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const label = useLabel();
  const countries = useCountries();
  const tags = useLabelsTags();
  const updateLabel = useUpdateLabel<Schema>();

  const form = usePutForm({
    schema,
    focus: "name",
    data: label.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: label.data?.id };

    updateLabel.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (label.isLoading) {
    return <CenteredLoading />;
  }

  if (label.isError) {
    return <FailedToFetch />;
  }

  return (
    <div className={styles.container}>
      <h1>Update labels</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormInformation />
        <FormInput
          label={formLabel.name}
          className={styles.fieldset}
          type="text"
          inputClass={styles.textbox}
          register={form.register("name")}
          feedback={form.errors.name?.message}
          placeholder="Name"
          required
        />
        <FormSelect
          label={formLabel.country}
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
          label={formLabel.url}
          className={styles.fieldset}
          type="text"
          inputClass={styles.textbox}
          register={form.register("url")}
          feedback={form.errors.url?.message}
          placeholder="https://example.com"
          required
        />
        <FormTextarea
          label={formLabel.links}
          className={styles.textareaFieldset}
          inputClass={styles.textarea}
          register={form.register("links")}
          feedback={form.errors.links?.message}
          placeholder={"https://twitter.com/foo\nhttps://bandcamp.com/bar"}
        />
        <FormChecks
          label={formLabel.tags}
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
        <FormSubmit disabled={form.disabled || updateLabel.isPending}>
          Update
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update labels">{page}</AdminLayout>
);

export default Page;
