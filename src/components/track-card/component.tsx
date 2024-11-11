import { IconCirclePause } from "@/icons/circle-pause";
import { IconCirclePlay } from "@/icons/circle-play";
import Link from "next/link";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={styles.container}>
    <Link href={`/tracks/${props.track.id}`} className={styles.link}>
      <picture>
        <img
          src={props.track.image}
          className={`${styles.image} ${props.isVideoAspectRatio ? styles.videoAspectRatio : styles.squareAspectRatio}`}
          alt={props.track.title}
          loading="lazy"
        />
      </picture>
      <div className={styles.status}>
        {props.isPlaying ? (
          <IconCirclePause className={styles.statusIcon} />
        ) : (
          <IconCirclePlay className={styles.statusIcon} />
        )}
      </div>
    </Link>
    <div className={styles.main}>
      <div className={styles.mainTitle}>{props.track.title}</div>
      <div className={styles.mainLinks}>
        <Link
          href={{
            pathname: "/tracks",
            query: { provider: props.track.provider },
          }}
          className={styles.mainLink}
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
            className={styles.mainLink}
          >
            {genre}
          </Link>
        ))}
      </div>
      <div className={styles.mainFooter}>{props.children}</div>
    </div>
    <div className={styles.footer}>{props.children}</div>
  </div>
);
