import type { SubmitHandler } from "react-hook-form";
import { CenteredLoading } from "~/components/centered-loading";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { FormInformation } from "~/components/form/information";
import { FormInput } from "~/components/form/input";
import { FormSubmit } from "~/components/form/submit";
import { useBookmarkTag, useUpdateBookmarkTag } from "~/hooks/bookmark-tags";
import { usePutForm } from "~/hooks/form";
import { useRequireAdmin } from "~/hooks/require";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "~/pages/_app";
import type { Schema } from "~/rules/track-genre/update";
import { label, schema } from "~/rules/track-genre/update";
import { setErrors } from "~/utils/form";

const Page: PageComponent = () => {
  useRequireAdmin();

  const tag = useBookmarkTag();
  const updateTag = useUpdateBookmarkTag<Schema>();

  const form = usePutForm<Schema>({
    schema,
    focus: "name",
    data: tag.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: tag.data?.id };

    updateTag.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (tag.isLoading) {
    return <CenteredLoading />;
  }

  if (tag.isError) {
    return <FailedToFetch />;
  }

  return (
    <>
      <h1>Update bookmark tags</h1>
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
        <FormSubmit disabled={form.disabled || updateTag.isLoading}>
          Update
        </FormSubmit>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update bookmark tags">{page}</AdminLayout>
);

export default Page;
