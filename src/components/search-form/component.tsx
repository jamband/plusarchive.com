import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <form onSubmit={props.onSubmit}>
    <input
      type="search"
      className={props.className}
      placeholder="Search..."
      value={props.value}
      onChange={props.onChange}
    />
  </form>
);
