import type { SubmitHandler } from "react-hook-form";
import { CenteredLoading } from "~/components/centered-loading";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { FormInformation } from "~/components/form/information";
import { FormInput } from "~/components/form/input";
import { FormSubmit } from "~/components/form/submit";
import { usePutForm } from "~/hooks/form";
import {
  useMusicProvider,
  useUpdateMusicProvider,
} from "~/hooks/music-providers";
import { useRequireAdmin } from "~/hooks/require";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "~/pages/_app";
import type { Schema } from "~/rules/music-provider/update";
import { label, schema } from "~/rules/music-provider/update";
import { setErrors } from "~/utils/form";

const Page: PageComponent = () => {
  useRequireAdmin();

  const provider = useMusicProvider();
  const updateProvider = useUpdateMusicProvider<Schema>();

  const form = usePutForm<Schema>({
    schema,
    focus: "name",
    data: provider.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: provider.data?.id };

    updateProvider.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (provider.isLoading) {
    return <CenteredLoading />;
  }

  if (provider.isError) {
    return <FailedToFetch />;
  }

  return (
    <>
      <h1>Update music providers</h1>
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
        <FormSubmit disabled={form.disabled || updateProvider.isLoading}>
          Update
        </FormSubmit>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update music providers">{page}</AdminLayout>
);

export default Page;
