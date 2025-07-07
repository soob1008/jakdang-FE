export interface Author {
  id: string;
  email: string;
  slug?: string;
  display_name?: string;
  profile_image_url?: string;
  likes_count: number;
  intro_text?: string;
}

export interface AuthorTag {
  id: string;
  tag: string;
}

export interface AuthorSNS {
  id: string;
  platform: SocialPlatform;
  url: string;
  is_active: boolean;
}

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "threads"
  | "youtube"
  | "x"
  | "branch"
  | "linkedin"
  | "blog";
