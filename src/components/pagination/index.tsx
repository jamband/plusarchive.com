import { useRouter } from "next/router";
import { IconAngleLeft } from "~/icons/angle-left";
import { IconAngleRight } from "~/icons/angle-right";
import { IconAnglesLeft } from "~/icons/angles-left";
import { IconAnglesRight } from "~/icons/angles-right";
import { Component } from "./component";
import type { Part, Props } from "./types";

export const Pagination: React.FC<Props> = (props) => {
  const { pathname, query } = useRouter();

  const parts: Array<Part> = ["First", "Previous", "Next", "Last"];

  const href = (part: Part) => {
    let page = 1;

    if (part === "Previous" && props.pagination.currentPage > 1) {
      page = props.pagination.currentPage - 1;
    } else if (
      part === "Next" &&
      props.pagination.currentPage === props.pagination.lastPage
    ) {
      page = props.pagination.lastPage;
    } else if (
      part === "Next" &&
      props.pagination.currentPage !== props.pagination.lastPage
    ) {
      page = props.pagination.currentPage + 1;
    } else if (part === "Last") {
      page = props.pagination.lastPage;
    }

    return {
      pathname,
      query: { ...query, page },
    };
  };

  const disabled = (part: Part) => {
    return ["First", "Previous"].includes(part)
      ? props.pagination.currentPage < 2
      : props.pagination.currentPage >= props.pagination.lastPage;
  };

  const icon = (part: Part) => {
    const className = "h-3 w-3 align-baseline";

    if (part === "First") {
      return <IconAnglesLeft className={className} />;
    } else if (part === "Previous") {
      return <IconAngleLeft className={className} />;
    } else if (part === "Next") {
      return <IconAngleRight className={className} />;
    } else {
      return <IconAnglesRight className={className} />;
    }
  };

  return (
    <Component
      {...props}
      parts={parts}
      href={href}
      disabled={disabled}
      icon={icon}
    />
  );
};
