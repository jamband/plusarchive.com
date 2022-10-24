import { APP_NAME } from "~/constants/app";
import { IconLock } from "~/icons/lock";

export const Component: React.FC = () => (
  <footer className="fixed bottom-0 z-20 w-full bg-gray-700 text-rose-500 shadow-[0_-1px_2px] shadow-gray-900">
    <div className="container mx-auto py-4 text-center font-semibold">
      <IconLock className="mr-1.5 h-4 w-4 align-[-0.125em]" />
      {APP_NAME}
    </div>
  </footer>
);
