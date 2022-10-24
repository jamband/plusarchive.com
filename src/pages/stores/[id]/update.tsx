import type { SubmitHandler } from "react-hook-form";
import { CenteredLoading } from "~/components/centered-loading";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { FormCheck } from "~/components/form/check";
import { FormChecks } from "~/components/form/checks";
import { FormInformation } from "~/components/form/information";
import { FormInput } from "~/components/form/input";
import { FormSelect } from "~/components/form/select";
import { FormSubmit } from "~/components/form/submit";
import { FormTextarea } from "~/components/form/textarea";
import { Loading } from "~/components/loading";
import { useAdminCountries } from "~/hooks/countries";
import { usePutForm } from "~/hooks/form";
import { useRequireAdmin } from "~/hooks/require";
import { useStore, useStoresTags, useUpdateStore } from "~/hooks/stores";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "~/pages/_app";
import type { Schema } from "~/rules/store/update";
import { label, schema } from "~/rules/store/update";
import { setErrors } from "~/utils/form";

const Page: PageComponent = () => {
  useRequireAdmin();

  const store = useStore();
  const countries = useAdminCountries();
  const tags = useStoresTags();
  const updateStore = useUpdateStore<Schema>();

  const form = usePutForm<Schema>({
    schema,
    focus: "name",
    data: store.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: store.data?.id };

    updateStore.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (store.isLoading) {
    return <CenteredLoading />;
  }

  if (store.isError) {
    return <FailedToFetch />;
  }

  return (
    <>
      <h1>Update stores</h1>
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
          data={countries}
          className="mb-8 w-full md:w-1/2"
          inputClass="border-gray-700 bg-gray-900"
          register={form.register("country")}
          feedback={form.errors.country?.message}
          required
        >
          {countries.data?.map((country) => (
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
        <FormSubmit disabled={form.disabled || updateStore.isLoading}>
          Update
        </FormSubmit>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update stores">{page}</AdminLayout>
);

export default Page;
