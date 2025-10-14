export interface Work {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  type: WorkType;
  isPublished: boolean;
  isScheduled?: boolean;
  scheduledAt?: string;
  publishedAt?: string;
  description?: string;
  content?: string;
  tags?: string[];
  episodes?: Episode[];
  authorId: string;
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
