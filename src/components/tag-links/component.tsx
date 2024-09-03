import Link from "next/link";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <section className={`${props.className || ""} flex gap-3`}>
    <div className="text-gray-100">Tags:</div>
    <div
      ref={props.tagsRef}
      className={`w-full overflow-scroll overscroll-x-contain whitespace-nowrap [scrollbar-width:none] ${
        props.tagsPosition === "right"
          ? "[mask-image:linear-gradient(to_left,#0000,#000_20%)]"
          : ""
      } ${
        props.tagsPosition === "center"
          ? "[mask-image:linear-gradient(to_left,#0000,#000_20%,#000_80%,#0000)]"
          : ""
      } ${
        props.tagsPosition === "left"
          ? "[mask-image:linear-gradient(to_right,#0000,#000_20%)]"
          : ""
      }`}
      onScroll={props.tagsOnScroll}
    >
      {props.data.map((tag) => (
        <Link
          key={tag}
          href={{
            pathname: props.pathname,
            query: { tag },
          }}
          className="ml-0.5 mr-3 hover:text-gray-100"
        >
          {tag}
        </Link>
      ))}
      <div className="mr-12 md:mr-24" />
    </div>
  </section>
);
