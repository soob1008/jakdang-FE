export interface Work {
  id: string;
  title: string;
  author_name: string;
  author_slug: string;
  created_at: string;
  updated_at: string;
  thumbnail: string;
  type: WorkType;
  is_public: boolean;
  scheduled_at?: string;
  published_at?: string;
  description?: string;
  content?: string;
  episodes?: Episode[];
  author_id: string;
  visibility?: "PUBLIC" | "PRIVATE" | "UNLISTED";
  stats?: Stats;
}

export interface Episode {
  id: string;
  title: string;
  order: number;
  isPublished: boolean;
  publishedAt?: string | null;
  content?: string;
}

export type WorkType = "SINGLE" | "SERIES";

export type Stats = {
  views: number;
  likes: number;
  comments: number;
  cheers: number;
};
