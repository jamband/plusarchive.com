import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { usePostForm } from "@/hooks/form";
import { useCreateMusicProvider } from "@/hooks/music-providers";
import { useRequireAdmin } from "@/hooks/require";
import { AdminLayout } from "@/layouts/admin/layout";
import type { Schema } from "@/rules/music-provider/create";
import { label, schema } from "@/rules/music-provider/create";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const createProvider = useCreateMusicProvider<Schema>();

  const form = usePostForm<Schema>({
    schema,
    focus: "name",
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body };

    createProvider.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  return (
    <>
      <h1>Create a music provider</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInformation className="mb-10" />
        <FormInput
          className="mb-8 w-full md:w-1/2"
          label={label.name}
          inputClass="border-gray-700 bg-gray-900"
          type="text"
          register={form.register("name")}
          feedback={form.errors.name?.message}
          placeholder="Name"
          required
        />
        <FormSubmit disabled={form.disabled || createProvider.isPending}>
          Create
        </FormSubmit>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Create a music provider">{page}</AdminLayout>
);

export default Page;
