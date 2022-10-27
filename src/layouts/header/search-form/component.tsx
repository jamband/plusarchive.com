import { SearchForm } from "~/components/search-form";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <fieldset disabled={props.disabled}>
    <SearchForm
      className={`border-none ${
        props.disabled ? "cursor-not-allowed bg-gray-600" : "bg-gray-800"
      }`}
    />
  </fieldset>
);
