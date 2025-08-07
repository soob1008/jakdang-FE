import {
  FontSize,
  Align,
  Direction,
  Columns,
  Layout,
  ImageStyle,
} from "@/feature/types";

export interface Page {
  id: string;
  blocks_draft: Block[];
  blocks_published: Block[];
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

export interface WorkItem {
  id: string;
  title: string;
  image_url?: string;
  is_active: boolean;
  is_representative: boolean;
  description?: string;
  url?: string;
}

export interface BlockDataText {
  title?: string;
  content: string;
  align: Align;
  color?: string; // 글자색
  font_size: FontSize;
}

export interface BlockDataImage {
  images: { url: string; alt?: string; position: number }[]; // 이미지 URL과 대체 텍스트
  style: ImageStyle;
  columns?: Columns; // 이미지 열 수 (선택적)
  display: "full" | "fit";
  link?: string;
}

export interface BlockDataWork {
  works: WorkItem[];
  layout: Layout; // 작품 정렬 방식
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
export interface BlockDataSNS {
  sns_links: { platform: string; url: string }[]; // SNS 링크
}

export interface BlockDataCalendar {
  dates: {
    start_date: Date;
    end_date: Date;
    title: string;
    description?: string;
  }[]; // 일정 데이터
  layout: "list" | "calendar"; // 캘린더 레이아웃 방식
}

export type BlockData =
  | BlockDataText
  | BlockDataImage
  | BlockDataWork
  | BlockDataLink
  | BlockDataSNS
  | BlockDataNotice
  | BlockDataChallenge
  | BlockDataEvent
  | BlockDataCalendar;

export interface Block extends BlockDefault {
  position: number;
  page_id: string; // 이 블록이 속한 페이지의 ID
  is_active: boolean; // 블록 활성화 여부
}

export interface BlockDefault {
  id: string;
  name: string;
  type: BlockType;
  data: BlockData; // 블록의 데이터, 각 타입에 따라 다를 수 있음
}

export type BlockItemType = { block_id: string } & Block;
