import { useRouter } from "next/router";
import { Component } from "./component";
import type { Links } from "./types";

export const AdminLinks = () => {
  const { pathname, query } = useRouter();

  const [firstPath, secondPath, thirdPath] = pathname
    .split("/")
    .filter(Boolean) as Array<string | undefined>;

  const hasActions = ["[id]", "create", "admin"].includes(secondPath || "");
  const id = `${query.id || ""}`;

  const links: Links = [];

  if (hasActions) {
    links.push({
      href: `/${firstPath}/admin`,
      text: "Admin",
    });

    if (secondPath !== "create") {
      links.push({
        href: `/${firstPath}/create`,
        text: "Create",
      });
    }

    if (id !== "" && thirdPath === "update") {
      links.push({
        href: `/${firstPath}/${id}`,
        text: "View",
      });
    }

    if (id !== "" && !thirdPath) {
      links.push({
        href: `/${firstPath}/${id}/update`,
        text: "Update",
      });
    }
  }

  return <Component hasActions={hasActions} links={links} />;
};
