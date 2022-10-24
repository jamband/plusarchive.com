import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Component } from "./component";
import type { _Props } from "./types";

export const Loading: React.FC = () => {
  const [state, setState] = useState<_Props["state"]>("initial");
  const { events } = useRouter();

  useEffect(() => {
    const start = () => {
      setState("start");
    };

    const complete = () => {
      setTimeout(() => {
        setState("complete");
      }, 100);

      setTimeout(() => {
        setState("initial");
      }, 500);
    };

    events.on("routeChangeStart", start);
    events.on("routeChangeComplete", complete);
    events.on("routeChangeError", complete);

    return () => {
      events.off("routeChangeStart", start);
      events.off("routeChangeComplete", complete);
      events.off("routeChangeError", complete);
    };
  }, [events]);

  return <Component state={state} />;
};
