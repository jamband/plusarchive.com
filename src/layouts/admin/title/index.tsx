import { APP_NAME } from "@/constants/app";
import { Component } from "./component";
import type { Props } from "./types";

export const AdminTitle: React.FC<Props> = (props) => {
  const title = props.title === "" ? APP_NAME : `${props.title} ･ ${APP_NAME}`;

  return <Component title={title} />;
};
