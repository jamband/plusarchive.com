import { CenteredLoading } from "@/components/centered-loading";
import { IconAngleLeft } from "@/icons/angle-left";
import Link from "next/link";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <article className={styles.container} aria-hidden={!props.isVisible}>
    <div className={styles.main}>
      <div
        className={`${styles.mainEmbedContainer} ${
          props.isAspectSquare ? styles.mainEmbedContainerAspectSquare : ""
        }`}
      >
        {props.loading.state && <CenteredLoading />}
        <iframe
          key={props.player.id}
          src={props.embedSrc}
          className={`${styles.mainEmbed} ${
            props.isAspectSquare
              ? styles.mainEmbedAspectSquare
              : styles.mainEmbedAspectVideo
          }`}
          title={`${props.player.provider} player`}
          onLoad={props.loading.stop}
          allow="fullscreen"
        />
      </div>
    </div>
    <section className={styles.titleContainer}>
      <h1 className={styles.title}>{props.player.title}</h1>
      <p className={styles.provider}>via {props.player.provider}</p>
    </section>
    <div className={styles.footer}>
      <Link
        href={props.player.type === "track" ? "/tracks" : "/playlists"}
        className={styles.footerLink}
      >
        <IconAngleLeft className={styles.footerLinkIcon} />
        Back to {props.player.type === "track" ? "Tracks" : "Playlists"}
      </Link>
      <span className={styles.footerLinkDivider}>or</span>
      <Link href="/" className={styles.footerLink}>
        Recent Favorites
      </Link>
    </div>
  </article>
);
