import { useLogout } from "@/hooks/auth";
import { useRequireAdmin } from "@/hooks/require";
import { IconCircleInfo } from "@/icons/circle-info";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "../_app";
import styles from "./logout.module.css";

const Page: PageComponent = () => {
  useRequireAdmin();

  const logout = useLogout();

  return (
    <div className={styles.container}>
      <h1>Admin logout</h1>
      <p className={styles.information}>
        <IconCircleInfo className={styles.informationIcon} />
        Press the <strong>Logout</strong> button to log out.
      </p>
      <button
        type="button"
        onClick={() => logout.mutate()}
        className={styles.button}
        disabled={logout.isPending}
      >
        Logout
      </button>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminLayout title="Admin logout">{page}</AdminLayout>
);

export default Page;
