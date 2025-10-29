import { IconBandcamp } from "@/icons/bandcamp";
import { IconFacebook } from "@/icons/facebook";
import { IconInstagram } from "@/icons/instagram";
import { IconSoundCloud } from "@/icons/soundcloud";
import { IconSpotify } from "@/icons/spotify";
import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import { IconVimeo } from "@/icons/vimeo";
import { IconXTwitter } from "@/icons/x-twitter";
import { IconYouTube } from "@/icons/youtube";
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
        component: <IconFacebook className={className} />,
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
        component: <IconXTwitter className={className} />,
      },
      "vimeo.com": {
        name: "Vimeo",
        component: <IconVimeo className={className} />,
      },
      "x.com": {
        name: "X",
        component: <IconXTwitter className={className} />,
      },
      "youtube.com": {
        name: "YouTube",
        component: <IconYouTube className={className} />,
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
