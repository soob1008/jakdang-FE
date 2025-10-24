export interface Work {
  id: string;
  slug: string;
  author_name: string;
  title: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  thumbnail: string;
  type: WorkType;
  is_public: boolean;
  scheduled_at?: Date;
  published_at?: Date;
  content?: string;
  writings: Writing[];
  stats?: Stats;
}

export interface Writing {
  id: string;
  slug: string;
  author_name: string;
  title: string;
  subtitle?: string;
  order: number;
  is_public: boolean;
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
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

export type Comment = {
  id: string;
  user_id?: string | null;
  user_name?: string | null;
  content: string;
  created_at: string | Date;
  replies?: Comment[];
  is_author: boolean;
};
