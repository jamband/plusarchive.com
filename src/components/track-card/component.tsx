import { IconCirclePause } from "@/icons/circle-pause";
import { IconCirclePlay } from "@/icons/circle-play";
import Link from "next/link";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className="mb-3 flex rounded-none border-b border-gray-600 md:mb-0 md:flex-col md:rounded md:border-none md:bg-gray-700 md:shadow md:shadow-gray-900">
    <Link
      href={`/tracks/${props.track.id}`}
      className="relative mb-3 h-max w-1/3 rounded bg-gray-700 active:text-gray-400 md:mb-4 md:w-full"
    >
      <picture>
        <img
          src={props.track.image}
          className={`w-full rounded-b rounded-t object-cover opacity-60 md:rounded-b-none ${props.aspectRatio}`}
          alt={props.track.title}
          loading="lazy"
        />
      </picture>
      <div className="absolute inset-0 flex items-center justify-center opacity-80">
        {props.isPlaying ? (
          <IconCirclePause className="h-6 w-6 md:h-10 md:w-10 lg:h-12 lg:w-12" />
        ) : (
          <IconCirclePlay className="h-6 w-6 md:h-10 md:w-10 lg:h-12 lg:w-12" />
        )}
      </div>
    </Link>
    <div className="flex w-2/3 flex-col md:w-full">
      <div className="mb-1 truncate px-2 text-center font-bold leading-normal text-gray-100 md:mb-2 md:mt-1 md:px-3 md:text-[1.125rem]">
        {props.track.title}
      </div>
      <div className="mx-2 mb-1 flex flex-wrap justify-center gap-x-4 text-sm leading-7 md:mb-2 md:gap-y-1 md:text-base">
        <Link
          href={{
            pathname: "/tracks",
            query: { provider: props.track.provider },
          }}
          className="hover:text-gray-100"
        >
          {props.track.provider}
        </Link>
        {props.track.genres.map((genre) => (
          <Link
            key={genre}
            href={{
              pathname: "/tracks",
              query: { genre },
            }}
            className="hover:text-gray-100"
          >
            {genre}
          </Link>
        ))}
      </div>
      <div className="mb-0 mr-2 mt-auto flex items-center justify-end gap-x-1 text-sm text-gray-500 md:hidden">
        {props.children}
      </div>
    </div>
    <div className="mr-2 mt-auto hidden p-1 text-sm text-gray-500 md:flex md:items-center md:justify-end md:gap-x-1">
      {props.children}
    </div>
  </div>
);
