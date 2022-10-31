import { useRouter } from "next/router";
import { useState } from "react";
import { Component } from "./component";

export const Header: React.FC = () => {
  const { pathname } = useRouter();
  const [navigation, setNavigation] = useState(false);

  const mainLinks = [
    { href: "/tracks", text: "Tracks" },
    { href: "/playlists", text: "Playlists" },
  ];

  const subLinks = [
    { href: "/labels", text: "Labels" },
    { href: "/stores", text: "Stores" },
    { href: "/bookmarks", text: "Bookmarks" },
  ];

  const moreLinks = [
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
  ];

  const allLinks = [...mainLinks, ...subLinks, ...moreLinks];

  const current = (href: string) => {
    const [first, second] = pathname.split("/", 2);
    return `/${first}${second}` === href ? "page" : undefined;
  };

  const togglegleNavigation = () => {
    setNavigation((previous) => !previous);
  };

  return (
    <Component
      mainLinks={mainLinks}
      subLinks={subLinks}
      moreLinks={moreLinks}
      allLinks={allLinks}
      current={current}
      navigation={navigation}
      toggleNavigation={togglegleNavigation}
    />
  );
};
