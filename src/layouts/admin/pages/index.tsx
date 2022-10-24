import { useRouter } from "next/router";
import { Component } from "./component";

export const AdminPages = () => {
  const { pathname } = useRouter();

  const pages = [
    { href: "/music-providers/admin", text: "MusicProviders" },
    { href: "/tracks/admin", text: "Tracks" },
    { href: "/track-genres/admin", text: "TrackGenres" },
    { href: "/playlists/admin", text: "Playlists" },
    { href: "/countries/admin", text: "Countries" },
    { href: "/labels/admin", text: "Labels" },
    { href: "/label-tags/admin", text: "LabelTags" },
    { href: "/stores/admin", text: "Stores" },
    { href: "/store-tags/admin", text: "StoreTags" },
    { href: "/bookmarks/admin", text: "Bookmarks" },
    { href: "/bookmark-tags/admin", text: "BookmarkTags" },
  ];

  const label =
    pages.find(({ href }) => pathname.split("/")[1] === href.split("/")[1])
      ?.text || "Pages";

  return <Component pages={pages} label={label} />;
};
