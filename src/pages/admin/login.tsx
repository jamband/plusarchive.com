import { FormInformation } from "@/components/form/information";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { useLogin } from "@/hooks/auth";
import { usePostForm } from "@/hooks/form";
import { useRequireGuest } from "@/hooks/require";
import { Layout } from "@/layouts/layout";
import type { Schema } from "@/rules/auth/login";
import { label, schema } from "@/rules/auth/login";
import { setErrors } from "@/utils/form";
import type { SubmitHandler } from "react-hook-form";
import type { PageComponent } from "../_app";
import styles from "./login.module.css";

const Page: PageComponent = () => {
  useRequireGuest();

  const login = useLogin<Schema>();

  const form = usePostForm({
    schema,
    focus: "email",
  });

  const onSubmit: SubmitHandler<Schema> = (body) => {
    const variables = { body };

    login.mutate(variables, {
      onError: async (response) => {
        await setErrors(response, form.setError);
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1>Admin login</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormInformation />
        <FormInput
          className={styles.fieldset}
          label={label.email}
          type="text"
          inputClass={styles.textbox}
          register={form.register("email")}
          feedback={form.errors.email?.message}
          autoComplete="email"
          placeholder="Email"
          required
        />
        <FormInput
          className={styles.fieldset}
          label={label.password}
          type="password"
          inputClass={styles.textbox}
          register={form.register("password")}
          feedback={form.errors.password?.message}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <FormSubmit disabled={form.disabled || login.isPending}>
          Login
        </FormSubmit>
      </form>
    </div>
  );
};

Page.getLayout = (page) => <Layout title="Admin login">{page}</Layout>;

export default Page;
