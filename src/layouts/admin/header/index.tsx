import { useRouter } from "next/router";
import { useReducer, useState } from "react";
import { APP_NAME } from "~/constants/app";
import { Component } from "./component";

export const AdminHeader: React.FC = () => {
  const [navigation, setNavigation] = useState(false);
  const { pathname } = useRouter();

  const links = [
    { href: "/", text: APP_NAME },
    { href: "/admin/logout", text: "Logout" },
  ];

  const togglegleNavigation = () => {
    setNavigation((previous) => !previous);
  };

  const current = (href: string) => {
    return pathname === href ? "page" : undefined;
  };

  return (
    <Component
      links={links}
      navigation={navigation}
      toggleNavigation={togglegleNavigation}
      current={current}
    />
  );
};
