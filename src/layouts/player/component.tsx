import { CenteredLoading } from "@/components/centered-loading";
import { IconAngleLeft } from "@/icons/angle-left";
import Link from "next/link";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <article className="aria-hidden:hidden" aria-hidden={!props.isVisible}>
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
      <h1 className="mb-0 mt-6 text-[1.2rem] leading-normal md:text-[1.4rem]">
        {props.player.title}
      </h1>
      <p className="text-sm md:text-base">via {props.player.provider}</p>
    </section>
    <div className="text-center text-sm font-bold md:text-base">
      <Link
        href={props.player.type === "track" ? "/tracks" : "/playlists"}
        className="text-rose-500 active:text-rose-500"
      >
        <IconAngleLeft className="mr-1 h-4 w-4 align-[-0.2em] text-rose-500/60 md:align-[-0.125em]" />
        Back to {props.player.type === "track" ? "Tracks" : "Playlists"}
      </Link>
      <span className="mx-2">or</span>
      <Link href="/" className="text-rose-500 active:text-rose-500">
        Recent Favorites
      </Link>
    </div>
  </article>
);
