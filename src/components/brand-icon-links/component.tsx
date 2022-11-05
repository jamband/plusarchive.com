import { ExternalLink } from "../external-link";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <ul className="flex flex-wrap gap-x-3 gap-y-1">
    {props.links.map((link, index) => (
      <li key={index}>
        <ExternalLink key={index} href={link} className="hover:text-gray-100">
          {props.icon(link).component}
        </ExternalLink>
        <span className="sr-only">{props.icon(link).name}</span>
      </li>
    ))}
  </ul>
);
