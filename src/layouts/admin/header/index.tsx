import { useState } from "react";
import { APP_NAME } from "~/constants/app";
import { Component } from "./component";

export const AdminHeader: React.FC = () => {
  const [navigation, setNavigation] = useState(false);

  const links = [
    { href: "/", text: APP_NAME },
    { href: "/admin/logout", text: "Logout" },
  ];

  const togglegleNavigation = () => {
    setNavigation((previous) => !previous);
  };

  return (
    <Component
      links={links}
      navigation={navigation}
      toggleNavigation={togglegleNavigation}
    />
  );
};
