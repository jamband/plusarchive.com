import { CenteredLoading } from "@/components/centered-loading";
import { FailedToFetch } from "@/components/failed-to-fetch";
import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { useCountry, useUpdateCountry } from "@/hooks/countries";
import { usePutForm } from "@/hooks/form";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "@/pages/_app";
import type { Schema } from "@/rules/country/update";
import { label, schema } from "@/rules/country/update";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";

const Page: PageComponent = () => {
  useRequireAdmin();

  const country = useCountry();
  const updateCountry = useUpdateCountry<Schema>();

  const form = usePutForm<Schema>({
    schema,
    focus: "name",
    data: country.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: country.data?.id };

    updateCountry.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (country.isLoading) {
    return <CenteredLoading />;
  }

  if (country.isError) {
    return <FailedToFetch />;
  }

  return (
    <>
      <h1>Update countries</h1>
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
        <FormSubmit disabled={form.disabled || updateCountry.isLoading}>
          Update
        </FormSubmit>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update countries">{page}</AdminLayout>
);

export default Page;
