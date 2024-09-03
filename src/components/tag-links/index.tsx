import { useRef, useState } from "react";
import { Component } from "./component";
import type { Props, TagsPosition } from "./types";

export const TagLinks: React.FC<Props> = (props) => {
  const tagsRef = useRef<HTMLDivElement>(null);
  const [tagsPosition, setTagsPosition] = useState<TagsPosition>("right");

  const tagsOnScroll = () => {
    const tags = tagsRef.current;

    if (tags) {
      const scrollLeft = tags.scrollLeft;
      const scrollWidth = tags.scrollWidth;
      const clientWidth = tags.clientWidth;

      if (scrollLeft === 0) {
        setTagsPosition("right");
      } else if (scrollLeft + clientWidth >= scrollWidth) {
        setTagsPosition("left");
      } else {
        setTagsPosition("center");
      }
    }
  };

  return (
    <Component
      tagsRef={tagsRef}
      tagsPosition={tagsPosition}
      tagsOnScroll={tagsOnScroll}
      {...props}
    />
  );
};
