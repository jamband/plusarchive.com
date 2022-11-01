import Link from "next/link";
import { IconEye } from "~/icons/eye";
import { IconPencil } from "~/icons/pencil";
import { IconTrash } from "~/icons/trash";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className="flex items-start justify-center bg-gray-700 px-4 py-2">
    <Link
      href={`${props.resource}/${props.id}`}
      className="mr-2 hover:text-gray-100"
    >
      <IconEye className="h-4 w-4 align-[-0.125em]" />
    </Link>
    <Link
      href={`${props.resource}/${props.id}/update`}
      className="mr-2 hover:text-gray-100"
    >
      <IconPencil className="h-4 w-4 align-[-0.125em]" />
    </Link>
    <button
      type="button"
      className="hover:text-gray-100"
      onClick={props.mutation}
    >
      <IconTrash className="h-4 w-4 align-[-0.125em]" />
    </button>
  </div>
);
