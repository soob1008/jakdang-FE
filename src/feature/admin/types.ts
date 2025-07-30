export interface Page {
  id: string;
  blocks_draft: Block[];
}

export type BlockType =
  | "text" // 글 - 문장/인용
  | "image" // 이미지
  | "work" // 작품
  | "link" // 링크모음
  | "notice" // 공지/일정
  | "challenge" // 글쓰기챌린지
  | "event" // 이벤트
  | "sns" // SNS
  | "calendar"; // 캘린더

type Align = "left" | "center" | "right";

export interface BlockDataText {
  title?: string;
  content: string;
  align: Align;
  color?: string; // 글자색
  font_size: "sm" | "base" | "lg" | "xl";
}

export interface BlockDataImage {
  url: string;
  alt?: string;
}

export interface BlockDataWork {
  title: string;
  author: string;
}

export interface BlockDataLink {
  links: { url: string; label: string }[];
}

export interface BlockDataNotice {
  message: string;
  date?: string;
}

export interface BlockDataChallenge {
  challengeName: string;
  description?: string;
}

export interface BlockDataEvent {
  eventName: string;
  date: string;
}

export type BlockData =
  | BlockDataText
  | BlockDataImage
  | BlockDataWork
  | BlockDataLink
  | BlockDataNotice
  | BlockDataChallenge
  | BlockDataEvent;

export interface Block extends BlockDefault {
  id: string;
  position: number;
  page_id: string; // 이 블록이 속한 페이지의 ID
  is_active: boolean; // 블록 활성화 여부
}

export interface BlockDefault {
  name: string;
  type: BlockType;
  data: BlockData; // 블록의 데이터, 각 타입에 따라 다를 수 있음
}
