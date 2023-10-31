import { useLogout } from "@/hooks/auth";
import { useRequireAdmin } from "@/hooks/require";
import { IconCircleInfo } from "@/icons/circle-info";
import { AdminLayout } from "@/layouts/admin/layout";
import type { PageComponent } from "../_app";

const Page: PageComponent = () => {
  useRequireAdmin();

  const logout = useLogout();

  return (
    <div className="flex h-[65vh] flex-col items-center justify-center">
      <h1>Admin logout</h1>
      <p className="mb-4">
        <IconCircleInfo className="mr-1.5 h-4 w-4 align-[-0.125em]" />
        Press the <strong>Logout</strong> button to log out.
      </p>
      <button
        type="button"
        onClick={() => logout.mutate()}
        className="rounded bg-rose-500 px-4 py-1 font-bold text-gray-100 shadow-sm shadow-gray-900 disabled:bg-gray-700 disabled:text-gray-400"
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
