import Link from "next/link";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <section className={`${props.className || ""} flex gap-3`}>
    <div className="text-gray-100">Tags:</div>
    <div className="flex gap-3 overflow-scroll whitespace-nowrap [mask-image:linear-gradient(to_left,#0000,#000_20%)] after:mr-12 md:[mask-image:linear-gradient(to_left,#0000,#000_15%)] md:after:mr-24">
      {props.data.map((tag) => (
        <Link
          key={tag}
          href={{
            pathname: props.pathname,
            query: { tag },
          }}
          className="hover:text-gray-100"
        >
          {tag}
        </Link>
      ))}
    </div>
  </section>
);
