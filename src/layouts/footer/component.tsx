import Link from "next/link";
import { CloseButton } from "~/components/close-button";
import { APP_NAME } from "~/constants/app";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <footer className="fixed bottom-0 z-20 w-full bg-gray-700 text-sm shadow-[0_-1px_2px] shadow-gray-900 md:text-base">
    {props.player.id !== "" && !props.isPlayerVisible ? (
      <div className="my-2 flex items-center justify-center lg:container lg:mx-auto">
        <Link href={`/${props.player.type}s/${props.player.id}`}>
          <a className="ml-4 mr-1 overflow-hidden text-ellipsis whitespace-nowrap py-2 font-semibold text-gray-100">
            {props.player.title}
          </a>
        </Link>
        <CloseButton
          className="mr-2 rounded px-2 py-1 hover:bg-gray-600 hover:text-gray-100 focus:bg-gray-600 focus:text-rose-500"
          iconClass="h-5 w-5 align-[-0.4em] md:align-[-0.25em]"
          onClick={props.resetPlayer}
        />
      </div>
    ) : (
      <div className="container mx-auto py-4 text-center font-semibold text-gray-100">
        {APP_NAME}
      </div>
    )}
  </footer>
);
