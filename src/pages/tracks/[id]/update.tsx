import type { SubmitHandler } from "react-hook-form";
import { CenteredLoading } from "~/components/centered-loading";
import { FailedToFetch } from "~/components/failed-to-fetch";
import { FormCheck } from "~/components/form/check";
import { FormChecks } from "~/components/form/checks";
import { FormInformation } from "~/components/form/information";
import { FormInput } from "~/components/form/input";
import { FormSubmit } from "~/components/form/submit";
import { Loading } from "~/components/loading";
import { usePutForm } from "~/hooks/form";
import { useRequireAdmin } from "~/hooks/require";
import { useTrack, useTracksGenres, useUpdateTrack } from "~/hooks/tracks";
import { AdminLayout } from "~/layouts/admin/layout";
import type { PageComponent } from "~/pages/_app";
import type { Schema } from "~/rules/track/update";
import { label, schema } from "~/rules/track/update";
import { setErrors } from "~/utils/form";

const Page: PageComponent = () => {
  useRequireAdmin();

  const track = useTrack();
  const genres = useTracksGenres();
  const updateTrack = useUpdateTrack<Schema>();

  const form = usePutForm<Schema>({
    schema,
    focus: "url",
    data: track.data,
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body, id: track.data?.id };

    updateTrack.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  if (track.isLoading) {
    return <CenteredLoading />;
  }

  if (track.isError) {
    return <FailedToFetch />;
  }

  return (
    <>
      <h1>Update tracks</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInformation className="mb-10" />
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
        <FormSubmit disabled={form.disabled || updateTrack.isLoading}>
          Update
        </FormSubmit>
      </form>
    </>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Update tracks">{page}</AdminLayout>
);

export default Page;
