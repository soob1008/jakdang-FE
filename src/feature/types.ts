export type BlockType =
  | "text" // 글 - 문장/인용
  | "image" // 이미지
  | "work" // 작품
  | "link" // 링크모음
  | "notice" // 공지/일정
  | "challenge" // 글쓰기챌린지
  | "event" // 이벤트
  | "sns" // SNS
  | "calendar" // 캘린더
  | "blank"; // 여백

export type Align = "left" | "center" | "right";

export type FontSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";

export type Direction = "vertical" | "horizontal";

export type Columns = "1" | "2";

export type Layout = "grid" | "list";

export type ImageStyle = "single" | "grid" | "carousel";
