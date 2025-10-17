export interface Page {
  id: string;
  blocks_draft: Block[];
  blocks_published: Block[];
  style_draft: PageStyle; // 페이지 스타일 설정
  style_published: PageStyle; // 페이지 스타일 설정
}

export interface PageStyle {
  theme_color: string; // 테마 색상
  background_mode: "color" | "image" | "gradient"; // 배경 모드
  background_color?: string; // 배경색
  background_image_url?: string; // 배경 이미지 URL
  gradient_start?: string; // 그라디언트 시작 색상
  gradient_end?: string; // 그라디언트 끝 색상
  button_style: "rounded" | "sharp"; // 버튼 스타일
}

export type Align = "left" | "center" | "right";

export type FontSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type Direction = "vertical" | "horizontal";

export type Columns = "1" | "2";

export type Layout = "grid" | "list";

export type ImageStyle = "single" | "grid" | "carousel";

export type BlockType =
  | "text" // 글 - 문장/인용
  | "image" // 이미지
  | "work" // 작품 (추후 구현 예정)
  | "link" // 링크모음
  | "notice" // 공지/일정
  | "challenge" // 글쓰기챌린지
  | "event" // 이벤트
  | "sns" // SNS
  | "calendar"
  | "blank"
  | "book"
  | "list"; // 리스트

export interface WorkItem {
  id: string;
  title: string;
  image_url?: string;
  is_active: boolean;
  is_representative: boolean;
  short_description?: string;
  description?: string;
  url?: string;
}

export interface BlockDataText {
  content: string;
}

export interface BlockDataImage {
  images: { url: string; alt?: string; position: number; link?: string }[]; // 이미지 URL과 대체 텍스트
  style: ImageStyle;
  columns?: Columns; // 이미지 열 수 (선택적)
  display: "fill" | "fit";
}

export interface BlockDataList {
  title?: string;
  lists: ListItem[];
  layout: Layout; // 리스트 레이아웃 방식
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
  sns_links: { platform: string; url: string; label: string }[]; // SNS 링크
}

export type Book = {
  title: string;
  category?: string; // TODO: 카테고리 정의 필요.
  author: string;
  description?: string;
  isbn?: string;
  publish_date?: string;
  page_size?: number;
  size?: string;
  publisher: string;
};

export interface BlockDataBook {
  mode: "search" | "manual";
  search: Book;
  manual: Book;
  thumbnail: string;
}

export type SNSPlatform =
  | "instagram"
  | "facebook"
  | "x"
  | "youtube"
  | "brunch"
  | "medium"
  | "linkedin"
  | "threads"
  | "blog"
  | "email";

export interface BlockDataCalendar {
  dates: {
    start_date: Date;
    end_date: Date;
    title: string;
    description?: string;
  }[]; // 일정 데이터
  layout: "list" | "calendar"; // 캘린더 레이아웃 방식
}

export interface BlockDataBlank {
  height: number; // 빈 블록의 높이
}

export type BlockData =
  | BlockDataText
  | BlockDataImage
  | BlockDataList
  | BlockDataLink
  | BlockDataSNS
  | BlockDataNotice
  | BlockDataChallenge
  | BlockDataEvent
  | BlockDataCalendar
  | BlockDataBlank
  | BlockDataBook;

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

export type TemplateType =
  | "profile"
  | "magazine" /* | "portfolio" | "magazine" | "visual" */;

export type BlockItemType = { block_id: string } & Block;

export interface Page {
  id: string;
  blocks_draft: Block[];
  blocks_published: Block[];
  style_draft: PageStyle; // 페이지 스타일 설정
  style_published: PageStyle; // 페이지 스타일 설정
}

export interface PageStyle {
  theme_color: string; // 테마 색상
  background_mode: "color" | "image" | "gradient"; // 배경 모드
  background_color?: string; // 배경색
  background_image_url?: string; // 배경 이미지 URL
  gradient_start?: string; // 그라디언트 시작 색상
  gradient_end?: string; // 그라디언트 끝 색상
  button_style: "rounded" | "sharp"; // 버튼 스타일
}

export interface ListItem {
  id: string;
  title: string;
  image_url?: string;
  is_active: boolean;
  is_representative: boolean;
  short_description?: string;
  description?: string;
  url?: string;
}

export interface BlockDataText {
  content: string;
}

export interface BlockDataImage {
  images: { url: string; alt?: string; position: number; link?: string }[]; // 이미지 URL과 대체 텍스트
  style: ImageStyle;
  columns?: Columns; // 이미지 열 수 (선택적)
  display: "fill" | "fit";
}

export interface BlockDataList {
  title?: string;
  works: WorkItem[];
  layout: Layout; // 리스트 레이아웃 방식
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
  sns_links: { platform: string; url: string; label: string }[]; // SNS 링크
}

export type SearchBookList = {
  title: string;
  category?: string; // TODO: 카테고리 정의 필요.
  author: string;
  isbn?: string;
  publish_date?: string;
  page_size?: number;
  size?: string;
  publisher: string;
  thumbnail: string;
};

export interface BlockDataBook {
  mode: "search" | "manual";
  search: Book;
  manual: Book;
  thumbnail: string;
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

export interface BlockDataBlank {
  height: number; // 빈 블록의 높이
}

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
