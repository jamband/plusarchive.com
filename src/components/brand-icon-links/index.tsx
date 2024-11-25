import { IconBandcamp } from "@/icons/bandcamp";
import { IconFacebookSquare } from "@/icons/facebook-square";
import { IconInstagram } from "@/icons/instagram";
import { IconSoundCloud } from "@/icons/soundcloud";
import { IconSpotify } from "@/icons/spotify";
import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import { IconVimeoSquare } from "@/icons/vimeo-square";
import { IconXTwitterSquare } from "@/icons/x-twitter-square";
import { IconYouTubeSquare } from "@/icons/youtube-square";
import { Component } from "./component";
import styles from "./styles.module.css";
import type { Props } from "./types";

export const BrandIconLinks: React.FC<Props> = (props) => {
  const links = props.links === "" ? [] : props.links.split("\n");

  if (links.length === 0) {
    return null;
  }

  const icon = (link: string) => {
    const className = styles.linkIcon;

    const icons = {
      "bandcamp.com": {
        name: "Bandcamp",
        component: <IconBandcamp className={className} />,
      },
      "facebook.com": {
        name: "Facebook",
        component: <IconFacebookSquare className={className} />,
      },
      "instagram.com": {
        name: "Instagram",
        component: <IconInstagram className={className} />,
      },
      "soundcloud.com": {
        name: "SoundCloud",
        component: <IconSoundCloud className={className} />,
      },
      "spotify.com": {
        name: "Spotify",
        component: <IconSpotify className={className} />,
      },
      "twitter.com": {
        name: "X",
        component: <IconXTwitterSquare className={className} />,
      },
      "vimeo.com": {
        name: "Vimeo",
        component: <IconVimeoSquare className={className} />,
      },
      "x.com": {
        name: "X",
        component: <IconXTwitterSquare className={className} />,
      },
      "youtube.com": {
        name: "YouTube",
        component: <IconYouTubeSquare className={className} />,
      },

      // custom domains for bandcamp
      "fikarecordings.com": {
        name: "Bandcamp",
        component: <IconBandcamp className={className} />,
      },
      "mamabirdrecordingco.com": {
        name: "Bandcamp",
        component: <IconBandcamp className={className} />,
      },
      "maybemars.org": {
        name: "Bandcamp",
        component: <IconBandcamp className={className} />,
      },
      "souterraine.biz": {
        name: "Bandcamp",
        component: <IconBandcamp className={className} />,
      },
      "wrwtfww.com": {
        name: "Bandcamp",
        component: <IconBandcamp className={className} />,
      },
    };

    for (const [domain, icon] of Object.entries(icons)) {
      if (link.includes(domain)) {
        return icon;
      }
    }

    return {
      name: "External",
      component: <IconUpRightFromSquare className={className} />,
    };
  };

  return <Component {...props} links={links} icon={icon} />;
};
