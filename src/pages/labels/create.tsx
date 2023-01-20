import { FailedToFetch } from "@/components/failed-to-fetch";
import { FormCheck } from "@/components/form/check";
import { FormChecks } from "@/components/form/checks";
import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSelect } from "@/components/form/select";
import { FormSubmit } from "@/components/form/submit";
import { FormTextarea } from "@/components/form/textarea";
import { Loading } from "@/components/loading";
import { useAdminCountries } from "@/hooks/countries";
import { usePostForm } from "@/hooks/form";
import { useCreateLabel, useLabelsTags } from "@/hooks/labels";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import type { Schema } from "@/rules/label/create";
import { label, schema } from "@/rules/label/create";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const countries = useAdminCountries();
  const tags = useLabelsTags();
  const createLabel = useCreateLabel<Schema>();

  const form = usePostForm<Schema>({
    schema,
    focus: "name",
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body };

    createLabel.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  return (
    <>
      <h1>Create a label</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInformation className="mb-10" />
        <FormInput
          label={label.name}
          className="mb-8 w-full md:w-1/2"
          type="text"
          inputClass="border-gray-700 bg-gray-900"
          register={form.register("name")}
          feedback={form.errors.name?.message}
          placeholder="Name"
          required
        />
        <FormSelect
          label={label.country}
          className="mb-8 w-full md:w-1/2"
          inputClass="border-gray-700 bg-gray-900"
          data={countries}
          register={form.register("country")}
          feedback={form.errors.country?.message}
          required
        >
          {!!countries.data &&
            countries.data.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
        </FormSelect>
        <FormInput
          label={label.url}
          className="mb-8 w-full md:w-1/2"
          type="text"
          inputClass="border-gray-700 bg-gray-900"
          register={form.register("url")}
          feedback={form.errors.url?.message}
          placeholder="https://example.com"
          required
        />
        <FormTextarea
          label={label.links}
          className="mb-8 w-full md:w-1/2"
          inputClass="border-gray-700 bg-gray-900"
          register={form.register("links")}
          feedback={form.errors.links?.message}
          placeholder={"https://twitter.com/foo\nhttps://bandcamp.com/bar"}
        />
        <FormChecks
          label={label.tags}
          className="mb-8 w-full"
          inputClass="max-h-48 border-gray-700 bg-gray-900"
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
        <FormSubmit disabled={form.disabled || createLabel.isLoading}>
          Create
        </FormSubmit>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Create a label">{page}</AdminLayout>
);

export default Page;
