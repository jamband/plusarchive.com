import type { SubmitHandler } from "react-hook-form";
import { FormInformation } from "~/components/form/information";
import { FormInput } from "~/components/form/input";
import { FormSubmit } from "~/components/form/submit";
import { usePostForm } from "~/hooks/form";
import { useRequireAdmin } from "~/hooks/require";
import { useCreateStoreTag } from "~/hooks/store-tags";
import { AdminLayout } from "~/layouts/admin/layout";
import type { Schema } from "~/rules/store-tag/create";
import { label, schema } from "~/rules/store-tag/create";
import { setErrors } from "~/utils/form";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const createTag = useCreateStoreTag<Schema>();

  const form = usePostForm<Schema>({
    schema,
    focus: "name",
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body };

    createTag.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  return (
    <>
      <h1>Create a store tag</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInformation className="mb-10" />
        <FormInput
          className="mb-8 w-full md:w-1/2"
          label={label.name}
          type="text"
          inputClass="border-gray-700 bg-gray-900"
          register={form.register("name")}
          feedback={form.errors.name?.message}
          placeholder="Name"
          required
        />
        <FormSubmit disabled={form.disabled || createTag.isLoading}>
          Create
        </FormSubmit>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Create a store tag">{page}</AdminLayout>
);

export default Page;
