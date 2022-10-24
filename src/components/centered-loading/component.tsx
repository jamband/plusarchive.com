import { Loading } from "../loading";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className="absolute inset-0 grid place-items-center">
    <Loading {...props} />
  </div>
);
