import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <ul className="flex flex-wrap gap-x-3 gap-y-1">
    {props.links.map((link, index) => (
      <li key={index}>
        <a
          href={link}
          className="hover:text-gray-100"
          target="_blank"
          rel="noreferrer"
        >
          {props.icon(link).component}
          <span className="sr-only">{props.icon(link).name}</span>
        </a>
      </li>
    ))}
  </ul>
);
