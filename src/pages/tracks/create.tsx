import type { SubmitHandler } from "react-hook-form";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { FormCheck } from "~/components/form/check";
import { FormChecks } from "~/components/form/checks";
import { FormInformation } from "~/components/form/information";
import { FormInput } from "~/components/form/input";
import { FormSubmit } from "~/components/form/submit";
import { Loading } from "~/components/loading";
import { usePostForm } from "~/hooks/form";
import { useRequireAdmin } from "~/hooks/require";
import { useCreateTrack, useTracksGenres } from "~/hooks/tracks";
import { AdminLayout } from "~/layouts/admin/layout";
import type { Schema } from "~/rules/track/create";
import { label, schema } from "~/rules/track/create";
import { setErrors } from "~/utils/form";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const genres = useTracksGenres();
  const createTrack = useCreateTrack<Schema>();

  const form = usePostForm<Schema>({
    schema,
    focus: "url",
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body };

    createTrack.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  return (
    <>
      <h1>Create a track</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInformation className="mb-10" />
        <FormInput
          className="mb-8 w-full md:w-1/2"
          label={label.url}
          type="text"
          inputClass="border-gray-700 bg-gray-900"
          register={form.register("url")}
          feedback={form.errors.url?.message}
          placeholder="https://example.com"
          required
        />
        <FormInput
          label={label.title}
          className="mb-8 w-full md:w-1/2"
          type="text"
          inputClass="border-gray-700 bg-gray-900"
          register={form.register("title")}
          feedback={form.errors.title?.message}
          placeholder="Title"
        />
        <FormInput
          label={label.image}
          className="mb-8 w-full md:w-1/2"
          type="text"
          inputClass="border-gray-700 bg-gray-900"
          register={form.register("image")}
          feedback={form.errors.image?.message}
          placeholder="https://example.com"
        />
        <FormChecks
          label={label.genres}
          className="mb-8 w-full"
          inputClass="max-h-48 border-gray-700 bg-gray-900"
          feedback={form.errors.genres?.message}
        >
          {genres.isLoading && <Loading />}
          {genres.isError && <FailedToFetch />}
          {!!genres.data &&
            genres.data.map((genre) => (
              <FormCheck
                key={genre}
                value={genre}
                register={form.register("genres")}
              />
            ))}
        </FormChecks>
        <FormSubmit disabled={form.disabled || createTrack.isLoading}>
          Create
        </FormSubmit>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Create a track">{page}</AdminLayout>
);

export default Page;
