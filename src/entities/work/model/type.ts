export interface Work {
  id: string;
  title: string;
  author_name: string;
  author_slug: string;
  created_at: string;
  updated_at: string;
  thumbnail: string;
  type: WorkType;
  is_active: boolean;
  scheduled_at?: string;
  published_at?: string;
  description?: string;
  content?: string;
  writings: Writing[];
  author_id: string;
  stats?: Stats;
}

export interface Writing {
  id: string;
  title: string;
  subtitle?: string;
  order: number;
  is_public: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  work_id: string;
  status: "공개" | "비공개" | "예약";
  content?: string;
}

export type WorkType = "SINGLE" | "SERIES";

export type Stats = {
  views: number;
  likes: number;
  comments: number;
  cheers: number;
};
