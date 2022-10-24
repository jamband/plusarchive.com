import { useRouter } from "next/router";
import { Component } from "./component";

export const HeaderSearchForm = () => {
  const { pathname } = useRouter();

  const disabled = [
    "/",
    "/about",
    "/contact",
    "/playlists",
    "/playlists/[id]",
    "/admin/login",
  ].includes(pathname);

  return <Component disabled={disabled} />;
};
