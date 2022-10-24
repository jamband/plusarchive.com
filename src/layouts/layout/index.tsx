import { useRouter } from "next/router";
import { APP_URL } from "~/constants/app";
import { Component } from "./component";
import type { Props } from "./types";

export const Layout: React.FC<Props> = (props) => {
  const { asPath } = useRouter();

  const url = `${APP_URL}${asPath}`.replace(/\/$/g, "");

  return <Component {...props} url={url} />;
};
