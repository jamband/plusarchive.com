import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { useCreateCountry } from "@/hooks/countries";
import { usePostForm } from "@/hooks/form";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import type { Schema } from "@/rules/country/create";
import { label, schema } from "@/rules/country/create";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const createCountry = useCreateCountry<Schema>();

  const form = usePostForm<Schema>({
    schema,
    focus: "name",
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body };

    createCountry.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  return (
    <>
      <h1>Create a country</h1>
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
        <FormSubmit disabled={form.disabled || createCountry.isLoading}>
          Create
        </FormSubmit>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Create a country">{page}</AdminLayout>
);

export default Page;
