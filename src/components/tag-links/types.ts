export type TagsPosition = "left" | "center" | "right";

export type Props = {
  className?: string;
  data: Array<string>;
  pathname: `/${string}`;
};

export type _Props = Props & {
  tagsRef: React.RefObject<HTMLDivElement | null>;
  tagsPosition: TagsPosition;
  tagsOnScroll: () => void;
};
