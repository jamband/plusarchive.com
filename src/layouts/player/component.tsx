import Link from "next/link";
import { CenteredLoading } from "~/components/centered-loading";
import { IconAngleLeft } from "~/icons/angle-left";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <article
    className={props.isVisible ? undefined : "hidden"}
    aria-hidden={!props.isVisible}
  >
    <div className="mb-3 grid grid-cols-12">
      <div
        className={`relative col-span-12 ${
          props.isAspectSquare
            ? "md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4"
            : ""
        }`}
      >
        {props.loading.state && <CenteredLoading />}
        <iframe
          key={props.player.id}
          src={props.embedSrc}
          className={`w-full rounded bg-gray-700 ${
            props.isAspectSquare ? "aspect-square" : "aspect-video"
          }`}
          title={`${props.player.provider} player`}
          onLoad={props.loading.stop}
          allowFullScreen
        />
      </div>
    </div>
    <section className="mb-5 text-center">
      <h1 className="mb-0 text-[1.2rem] leading-normal md:text-[1.4rem]">
        {props.player.title}
      </h1>
      <p className="text-sm md:text-base">via {props.player.provider}</p>
    </section>
    <div className="text-center text-sm md:text-base">
      <Link href={props.player.type === "track" ? "/tracks" : "/playlists"}>
        <a className="text-rose-500 active:text-rose-500">
          <IconAngleLeft className="mr-0.5 h-4 w-4 align-[-0.125em]" />
          Back to {props.player.type === "track" ? "Tracks" : "Playlists"}
        </a>
      </Link>
      <span className="mx-2">or</span>
      <Link href="/">
        <a className="text-rose-500 active:text-rose-500">Recent Favorites</a>
      </Link>
    </div>
  </article>
);
