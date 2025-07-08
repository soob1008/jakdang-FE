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
  | "brunch"
  | "medium"
  | "linkedin"
  | "blog";

export interface AuthorLink {
  id: string;
  title: string;
  url: string;
  is_active: boolean;
}

export interface AuthorWork {
  id: string;
  title: string;
  description: string;
  url?: string;
  image_url?: string;
  is_active: boolean;
  is_representative: boolean;
}
